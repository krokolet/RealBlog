import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Row, Col, Input, Result } from 'antd';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions';

import sendUserInfo from '../../sendUserInfo/sendUserInfo';
import errorFromApiToForm from '../../errorFromApiToForm/errorFromApiToForm';
import ErrorText from '../../components/ErrorText/errorText';
import '../formStyle.scss';
import { userPath } from '../../serverInfo/apiPaths';
import EditProfileSchema from './editProfileSchema';
import { hrefHomePage } from '../../serverInfo/linksToPages';

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(actions.setUser(user)),
  };
};

const mapStateToProps = ({ userInfo }) => {
  return {
    userInfo,
  };
};

const EditProfile = ({ userInfo, setUser }) => {
  const [sendResult, setSendResult] = useState('');
  if (!userInfo.username) {
    return <Redirect to={hrefHomePage} />;
  }
  return (
    <Row className="formWrapper" justify="center">
      <Formik
        initialValues={{
          username: userInfo.username,
          email: userInfo.email,
          password: '',
          image: userInfo.image || '',
        }}
        validationSchema={EditProfileSchema}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          const normalizeValues = _.omitBy(values, (value) => value === '');
          if (!_.values(normalizeValues).length) {
            setErrors({ errorUnknown: 'At least one field required.' });
            setSubmitting(false);
            return;
          }
          sendUserInfo(userPath, 'put', normalizeValues)
            .then(({ user }) => {
              const { password } = localStorage.getItem('userInfo');
              localStorage.setItem(
                'userInfo',
                JSON.stringify({
                  email: user.email,
                  password: values.password || password,
                  token: user.token,
                }).toString()
              );
              setUser(_.omit(user), ['token']);
              setSendResult(user);
            })
            .catch((error) => {
              setErrors(errorFromApiToForm(error));
            });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors }) =>
          sendResult ? (
            <Result status="success" extra={[<span> Profile edited !</span>]} />
          ) : (
            <Form>
              <Row className="form_title" justify="center">
                Edit profile
              </Row>
              {errors.errorUnknown && ErrorText(errors.errorUnknown)}
              <Row gutter={[0, 18]}>
                <Col span={24}>
                  <label htmlFor="username" className="form_label">
                    Username:{' '}
                  </label>
                  <Field as={Input} name="username" />
                  <ErrorMessage name="username" render={(msg) => ErrorText(msg)} />
                </Col>
              </Row>
              <Row gutter={[0, 18]}>
                <Col span={24}>
                  <label htmlFor="email" className="form_label">
                    Email address:{' '}
                  </label>
                  <Field as={Input} type="email" name="email" />
                  <ErrorMessage name="email" render={(msg) => ErrorText(msg)} />
                </Col>
              </Row>
              <Row gutter={[0, 18]}>
                <Col span={24}>
                  <label htmlFor="password" className="form_label">
                    New password:{' '}
                  </label>
                  <Field as={Input.Password} name="password" placeholder="New password" />
                  <ErrorMessage name="password" render={(msg) => ErrorText(msg)} />
                </Col>
              </Row>
              <Row gutter={[0, 18]}>
                <Col span={24}>
                  <label htmlFor="image" className="form_label">
                    Image:{' '}
                  </label>
                  <Field as={Input} name="image" placeholder="Avatar image" />
                  <ErrorMessage name="image" render={(msg) => ErrorText(msg)} />
                </Col>
              </Row>
              <Row gutter={[0, 18]}>
                <Col span={24}>
                  <Button htmlType="submit" type="primary" disabled={isSubmitting} block className="submitButton">
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
          )
        }
      </Formik>
    </Row>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

EditProfile.propTypes = {
  userInfo: {
    username: PropTypes.string,
    image: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
  }.isRequired,
  setUser: PropTypes.func.isRequired,
};
