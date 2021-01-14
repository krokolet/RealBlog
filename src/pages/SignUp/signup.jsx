import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Button, Row, Col, Input, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as actions from '../../store/actions';

import ErrorText from '../../components/ErrorText/errorText';
import '../formStyle.scss';
import { hrefHomePage, hrefLogin } from '../../Api/linksToPages';
import SignupSchema from './signupSchema';

const mapDispatchToProps = (dispatch) => {
  return {
    signUpUser: (values) => dispatch(actions.signUpUser(values)),
    fetchResetFailure: () => dispatch(actions.fetchActions.fetchResetFailure()),
  };
};

const mapStateToProps = ({ fetchStatus: { isFetching, errorsFetching, isFetchSuccess } }) => {
  return { isFetching, errorsFetching, isFetchSuccess };
};

const SignUp = ({ isFetching, errorsFetching, isFetchSuccess, signUpUser, fetchResetFailure }) => {
  const { handleSubmit, control, setError, formState } = useForm({
    reValidateMode: 'onChange',
    resolver: yupResolver(SignupSchema),
  });

  const { errors, isSubmitted } = formState;

  useEffect(() => {
    if (errorsFetching && !Object.keys(formState.errors).length) {
      Object.entries(errorsFetching).map((error) => setError(error[0], { message: error[1] }));
    }

    return errorsFetching && !errorsFetching.global ? fetchResetFailure : undefined;
  }, [formState, errorsFetching, setError, fetchResetFailure]);

  const onSubmit = (values) => {
    signUpUser({
      username: values.username,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Row className="formWrapper">
      {!isFetching && isFetchSuccess && isSubmitted ? (
        <Redirect to={hrefHomePage} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className="form__title" justify="center">
            Create new account
          </Row>
          {errors.errorUnknown && ErrorText(errors.errorUnknown)}
          <Row gutter={[0, 18]}>
            <Col span={24}>
              <label htmlFor="username" className="form__label">
                Username:{' '}
              </label>
              <Controller as={Input} name="username" placeholder="Username" control={control} defaultValue="" />
              {errors.username && ErrorText(errors.username.message)}
            </Col>
          </Row>
          <Row gutter={[0, 18]}>
            <Col span={24}>
              <label htmlFor="email" className="form__label">
                Email address:{' '}
              </label>
              <Controller
                as={Input}
                type="email"
                name="email"
                placeholder="Email address"
                control={control}
                defaultValue=""
              />
              {errors.email && ErrorText(errors.email.message)}
            </Col>
          </Row>
          <Row gutter={[0, 18]}>
            <Col span={24}>
              <label htmlFor="password" className="form__label">
                Password:{' '}
              </label>
              <Controller
                control={control}
                as={Input.Password}
                name="password"
                placeholder="Password"
                defaultValue=""
              />
              {errors.password && ErrorText(errors.password.message)}
            </Col>
          </Row>
          <Row gutter={[0, 18]}>
            <Col span={24}>
              <label htmlFor="repeatPassword" className="form__label">
                Repeat Password:{' '}
              </label>
              <Controller
                control={control}
                as={Input.Password}
                name="repeatPassword"
                placeholder="Repeat Password"
                defaultValue=""
              />
              {errors.repeatPassword && ErrorText(errors.repeatPassword.message)}
            </Col>
          </Row>
          <Row gutter={[0, 18]}>
            <Col span={24}>
              <Controller
                defaultValue={false}
                name="acceptTerms"
                control={control}
                render={({ onChange, value, ref }) => (
                  <Checkbox onChange={(event) => onChange(event.target.checked)} checked={value} inputRef={ref}>
                    <span className="form__label--theme_grey8">
                      I agree to the processing of my personal information
                    </span>
                  </Checkbox>
                )}
              />
              {errors.acceptTerms && ErrorText(errors.acceptTerms.message)}
            </Col>
          </Row>
          <Row gutter={[0, 18]}>
            <Col span={24}>
              {isFetching ? (
                <span>Please waiting...</span>
              ) : (
                <Button htmlType="submit" type="primary" block className="submitButton">
                  Create
                </Button>
              )}
            </Col>
          </Row>
          <Row justify="center">
            <span className="form__question">Already have an account?&nbsp;</span>
            <Link to={hrefLogin}>Sign In.</Link>
          </Row>
        </form>
      )}
    </Row>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

SignUp.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isFetchSuccess: PropTypes.bool.isRequired,
  errorsFetching: PropTypes.shape({ global: PropTypes.string }),
  signUpUser: PropTypes.func.isRequired,
  fetchResetFailure: PropTypes.func.isRequired,
};

SignUp.defaultProps = {
  errorsFetching: { global: undefined },
};
