import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Row, Col, Input } from 'antd';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions';

import ErrorText from '../ErrorText/errorText';
import '../../pages/formStyle.scss';
import EditProfileSchema from '../../pages/EditProfile/editProfileSchema';
import { hrefHomePage } from '../../Api/linksToPages';

const mapDispatchToProps = (dispatch) => {
  return {
    editUserProfile: (user) => dispatch(actions.editUserProfile(user)),
    setUser: (user) => dispatch(actions.userActions.setUser(user)),
  };
};

const mapStateToProps = ({ userInfo, fetchStatus: { isFetching, errorsFetching, isFetchSuccess } }) => {
  return {
    userInfo,
    isFetching,
    errorsFetching,
    isFetchSuccess,
  };
};

const EditProfile = ({ editUserProfile, isFetching, errorsFetching, isFetchSuccess, defaultValues }) => {
  const { handleSubmit, control, setError, formState } = useForm({
    reValidateMode: 'onChange',
    resolver: yupResolver(EditProfileSchema),
  });

  const { errors, isValid, isSubmitSuccessful } = formState;

  useEffect(() => {
    if (formState.errors && !Object.keys(formState.errors).length) {
      Object.entries(formState.errors).map((error) => setError(error[0], { message: error[1] }));
    }
  }, [formState, setError]);

  const onSubmit = (values) => {
    const normalizeValues = _.omitBy(values, (value) => value.trim() === '');
    editUserProfile(normalizeValues);
  };

  return (
    <Row className="formWrapper" justify="center">
      {isFetchSuccess && isValid && isSubmitSuccessful && !errorsFetching ? (
        <Redirect to={hrefHomePage} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className="form_title" justify="center">
            Edit profile
          </Row>
          {errors.errorUnknown && ErrorText(errors.errorUnknown)}
          <Row gutter={[0, 18]}>
            <Col span={24}>
              <label htmlFor="username" className="form_label">
                Username:{' '}
              </label>
              <Controller as={Input} name="username" defaultValue={defaultValues.username} control={control} />
              {errors.username && ErrorText(errors.username.message)}
            </Col>
          </Row>
          <Row gutter={[0, 18]}>
            <Col span={24}>
              <label htmlFor="email" className="form_label">
                Email address:{' '}
              </label>
              <Controller as={Input} name="email" defaultValue={defaultValues.email} control={control} type="email" />
              {errors.email && ErrorText(errors.email.message)}
            </Col>
          </Row>
          <Row gutter={[0, 18]}>
            <Col span={24}>
              <label htmlFor="password" className="form_label">
                New password:{' '}
              </label>
              <Controller
                as={Input}
                name="password"
                defaultValue={defaultValues.password}
                control={control}
                type="password"
                placeholder="New password"
              />
              {errors.password && ErrorText(errors.password.message)}
            </Col>
          </Row>
          <Row gutter={[0, 18]}>
            <Col span={24}>
              <label htmlFor="image" className="form_label">
                Image:{' '}
              </label>
              {errors.image && ErrorText(errors.image.message)}
              <Controller
                as={Input}
                name="image"
                control={control}
                defaultValue={defaultValues.image}
                type="url"
                placeholder="Avatar image"
              />
            </Col>
          </Row>

          <Row gutter={[0, 18]}>
            <Col span={24}>
              {isFetching ? (
                <span>Please wait...</span>
              ) : (
                <Button htmlType="submit" type="primary" block className="submitButton">
                  Save
                </Button>
              )}
            </Col>
          </Row>
        </form>
      )}
    </Row>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

EditProfile.propTypes = {
  defaultValues: PropTypes.shape({
    username: PropTypes.string,
    image: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  editUserProfile: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFetchSuccess: PropTypes.bool.isRequired,
  errorsFetching: PropTypes.shape({}),
};

EditProfile.defaultProps = {
  errorsFetching: null,
};
