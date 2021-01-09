import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Layout } from 'antd';
import PropTypes from 'prop-types';

import HeaderLoginedUsers from './HeaderLoginedUser/HeaderLoginedUsers';
import HeaderNotLoginedUsers from './HeaderNotLoginedUser/HeaderNotLoginedUsers';
import './BlogHeader.scss';
import * as actions from '../../store/actions';

const { Header } = Layout;

const mapStateToProps = ({ userInfo, fetchStatus }) => ({
  username: userInfo.username,
  fetchStatus,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (values) => dispatch(actions.loginUser(values)),
  };
};

const BlogHeader = ({ username, loginUser }) => {
  useEffect(() => {
    if (localStorage.getItem('userInfo') && !username) {
      loginUser(JSON.parse(localStorage.getItem('userInfo')));
    }
  }, [loginUser, username]);

  return (
    <Header className="header">
      <Row className="header__container">
        <Col span={12}>
          <Row className="header__leftContainer">
            <Link to="/" className="header__linkHome">
              Realworld Blog
            </Link>
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={[19]} justify="end" className="header__rightContainer">
            {username ? <HeaderLoginedUsers /> : <HeaderNotLoginedUsers />}
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogHeader);

BlogHeader.propTypes = {
  username: PropTypes.string,
  loginUser: PropTypes.func.isRequired,
};

BlogHeader.defaultProps = {
  username: undefined,
};
