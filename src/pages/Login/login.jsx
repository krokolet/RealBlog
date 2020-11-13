import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import { Button, Row, Col, Input } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

import sendUserInfo from '../../sendUserInfo/sendUserInfo';
import errorFromApiToForm from '../../errorFromApiToForm/errorFromApiToForm';
import * as actions from '../../store/actions';
import ErrorText from '../../components/ErrorText/errorText';
import { hrefSignup, hrefHomePage } from '../../serverInfo/linksToPages';
import { loginPath, profilePath } from '../../serverInfo/apiPaths';
import './login.scss';

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(actions.setUser(user)),
  };
};

const Login = ({ setUser, history }) => {
  return (
    <Row className="formWrapper" justify="center">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          sendUserInfo(loginPath, 'post', values)
            .then(({ user }) => {
              localStorage.setItem(
                'userInfo',
                JSON.stringify({ email: values.email, password: values.password, token: user.token }).toString()
              );
              sendUserInfo(`${profilePath}/${user.username}`, 'get').then(({ image }) => {
                setUser(_.omit(user, ['token']), image);
                history.replace(hrefHomePage);
              });
            })
            .catch((error) => setErrors(errorFromApiToForm(error)));

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <Row className="form__title" justify="center">
              Sign in
            </Row>
            {errors.errorUnknown && ErrorText(errors.errorUnknown)}
            <ErrorMessage name="email" render={(msg) => ErrorText(msg)} />
            <Row gutter={[0, 18]}>
              <Col span={24}>
                <label htmlFor="email" className="form__label">
                  Email address:{' '}
                </label>
                <Field as={Input} type="email" name="email" placeholder="Email address" />
              </Col>
            </Row>
            <Row gutter={[0, 18]}>
              <Col span={24}>
                <label htmlFor="password" className="form__label">
                  Password:{' '}
                </label>
                <Field as={Input.Password} name="password" placeholder="Password" />
              </Col>
            </Row>
            <Row gutter={[0, 18]}>
              <Col span={24}>
                <Button htmlType="submit" type="primary" disabled={isSubmitting} block className="submitButton">
                  Login
                </Button>
              </Col>
            </Row>
            <Row gutter={[0, 18]} justify="center">
              <span className="form__question">Don`t have an account?&nbsp;</span>
              <Link to={hrefSignup}>Sign Up.</Link>
            </Row>
          </Form>
        )}
      </Formik>
    </Row>
  );
};

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({ replace: PropTypes.func }),
  setUser: PropTypes.func.isRequired,
};

Login.defaultProps = {
  history: undefined,
};
