import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Col } from 'antd';
import { Link } from 'react-router-dom';

import { hrefCreateArcticle, hrefEditProfile } from '../../../serverInfo/linksToPages';
import avatar from '../img/Avatar.svg';
import * as actions from '../../../store/actions';
import './headerLoginedUser.scss';

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(actions.logoutUser()),
  };
};

const mapStateToProps = ({ userInfo }) => ({
  username: userInfo.username,
  userImage: userInfo.image,
});

const HeaderLoginedUsers = ({ username, userImage, logoutUser }) => {
  return (
    <>
      <Col>
        <Link to={hrefCreateArcticle} className="header__createArcticleBtn">
          Create arcticle
        </Link>
      </Col>
      <Col>
        <div>
          <Link to={hrefEditProfile} className="header__username">
            {username}
          </Link>
          <img src={userImage || avatar} alt="Avatar" className="header__avatar" />
        </div>
      </Col>
      <Col>
        <Button
          className="header__logoutBtn"
          onClick={() => {
            logoutUser();
            delete localStorage.userInfo;
          }}
        >
          Log out
        </Button>
      </Col>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLoginedUsers);

HeaderLoginedUsers.propTypes = {
  username: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired,
  userImage: PropTypes.string.isRequired,
};
