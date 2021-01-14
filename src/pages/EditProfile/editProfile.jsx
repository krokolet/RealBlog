import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions';

import '../formStyle.scss';
import { hrefHomePage } from '../../Api/linksToPages';
import ProfileForm from '../../components/ProfileForm/ProfileForm';

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

const EditProfile = ({ userInfo }) => {
  if (!localStorage.getItem('userInfo')) {
    return <Redirect to={hrefHomePage} />;
  }

  const { password } = JSON.parse(localStorage.getItem('userInfo'));

  return userInfo.username ? <ProfileForm defaultValues={{ password, ...userInfo }} /> : <span>Loading...</span>;
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

EditProfile.propTypes = {
  userInfo: PropTypes.shape({
    username: PropTypes.string,
    image: PropTypes.string,
    email: PropTypes.string,
  }),
};

EditProfile.defaultProps = {
  userInfo: undefined,
};
