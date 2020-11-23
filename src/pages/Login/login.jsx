import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { connect } from 'react-redux';
import { Button, Row, Col, Input } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as actions from '../../store/actions';
import ErrorText from '../../components/ErrorText/errorText';
import { hrefSignup, hrefHomePage } from '../../Api/linksToPages';
import './login.scss';

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(actions.loginUser(user)),
  };
};

const mapStateToProps = ({ fetchStatus: { isFetching, errorsFetching, isFetchSuccess } }) => {
  return { isFetching, errorsFetching, isFetchSuccess };
};

const Login = ({ loginUser, history, isFetching, errorsFetching, isFetchSuccess }) => {
  const { handleSubmit, control, setError, formState } = useForm();

  const { errors } = formState;

  if (errorsFetching && !Object.keys(errors).length) {
    Object.entries(errorsFetching).map((error) => setError(error[0], { message: error[1] }));
  }

  const onSubmit = (values) => {
    loginUser(values).then(() => (isFetchSuccess ? history.replace(hrefHomePage) : null));
  };

  return (
    <Row className="formWrapper" justify="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="form__title" justify="center">
          Sign in
        </Row>
        <Row gutter={[0, 18]}>
          <Col span={24}>
            {errors.email && ErrorText(errors.email.message)}
            <label htmlFor="email" className="form__label">
              Email address:{' '}
            </label>
            <Controller
              as={Input}
              name="email"
              control={control}
              defaultValue=""
              placeholder="Email address"
              type="email"
            />
          </Col>
        </Row>
        <Row gutter={[0, 18]}>
          <Col span={24}>
            <label htmlFor="password" className="form__label">
              Password:{' '}
            </label>
            <Controller
              as={Input}
              name="password"
              control={control}
              defaultValue=""
              placeholder="Password"
              type="password"
            />
          </Col>
        </Row>
        <Row gutter={[0, 18]}>
          <Col span={24}>
            {isFetching ? (
              <span>Please waiting...</span>
            ) : (
              <Button htmlType="submit" type="primary" block className="submitButton">
                Login
              </Button>
            )}
          </Col>
        </Row>
        <Row gutter={[0, 18]} justify="center">
          <span className="form__question">Don`t have an account?&nbsp;</span>
          <Link to={hrefSignup}>Sign Up.</Link>
        </Row>
      </form>
    </Row>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({ replace: PropTypes.func }),
  isFetching: PropTypes.bool.isRequired,
  isFetchSuccess: PropTypes.bool.isRequired,
  errorsFetching: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
};

Login.defaultProps = {
  history: undefined,
};
