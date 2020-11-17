import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Row, Col, Input, Checkbox } from 'antd';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions';
import errorFromApiToForm from '../../Api/errorFromApiToForm';
import ErrorText from '../../components/ErrorText/errorText';
import '../formStyle.scss';
import { hrefHomePage, hrefLogin } from '../../Api/linksToPages';
import SignupSchema from './signupSchema';
import API from '../../Api/api';

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(actions.setUser(user)),
  };
};

const { signUp } = new API();

const SignUp = ({ setUser, history }) => {
  return (
    <Row className="formWrapper">
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          repeatPassword: '',
          acceptTerms: false,
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          signUp({
            ...values,
            image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
          })
            .then(({ user }) => {
              localStorage.setItem(
                'userInfo',
                JSON.stringify({ email: values.email, password: values.password, token: user.token }).toString()
              );
              setUser(_.omit({ ...user }, ['token']));
              history.replace(hrefHomePage);
            })
            .catch((error) => setErrors(errorFromApiToForm(error)));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <Row className="form__title" justify="center">
              Create new account
            </Row>
            {errors.errorUnknown && ErrorText(errors.errorUnknown)}
            <Row gutter={[0, 18]}>
              <Col span={24}>
                <label htmlFor="username" className="form__label">
                  Username:{' '}
                </label>
                <Field as={Input} name="username" placeholder="Username" />
                <ErrorMessage name="username" render={(msg) => ErrorText(msg)} />
              </Col>
            </Row>
            <Row gutter={[0, 18]}>
              <Col span={24}>
                <label htmlFor="email" className="form__label">
                  Email address:{' '}
                </label>
                <Field as={Input} type="email" name="email" placeholder="Email address" />
                <ErrorMessage name="email" render={(msg) => ErrorText(msg)} />
              </Col>
            </Row>
            <Row gutter={[0, 18]}>
              <Col span={24}>
                <label htmlFor="password" className="form__label">
                  Password:{' '}
                </label>
                <Field as={Input.Password} name="password" placeholder="Password" />
                <ErrorMessage name="password" render={(msg) => ErrorText(msg)} />
              </Col>
            </Row>
            <Row gutter={[0, 18]}>
              <Col span={24}>
                <label htmlFor="repeatPassword" className="form__label">
                  Repeat Password:{' '}
                </label>
                <Field as={Input.Password} name="repeatPassword" placeholder="Repeat Password" />
                <ErrorMessage name="repeatPassword" render={(msg) => ErrorText(msg)} />
              </Col>
            </Row>
            <Row gutter={[0, 18]}>
              <Col span={24}>
                <Field as={Checkbox} name="acceptTerms">
                  <span className="form__label--theme_grey8">I agree to the processing of my personal information</span>
                </Field>
                <ErrorMessage name="acceptTerms" render={(msg) => ErrorText(msg)} />
              </Col>
            </Row>
            <Row gutter={[0, 18]}>
              <Col span={24}>
                <Button htmlType="submit" type="primary" disabled={isSubmitting} block className="submitButton">
                  Create
                </Button>
              </Col>
            </Row>
            <Row justify="center">
              <span className="form__question">Already have an account?&nbsp;</span>
              <Link to={hrefLogin}>Sign In.</Link>
            </Row>
          </Form>
        )}
      </Formik>
    </Row>
  );
};

export default connect(null, mapDispatchToProps)(SignUp);

SignUp.propTypes = {
  setUser: PropTypes.func.isRequired,
  history: { ...PropTypes.object, length: PropTypes.number }.isRequired,
};
