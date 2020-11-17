import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Layout } from 'antd';
import PropTypes from 'prop-types';

import HeaderLoginedUsers from './HeaderLoginedUser/HeaderLoginedUsers';
import HeaderNotLoginedUsers from './HeaderNotLoginedUser/HeaderNotLoginedUsers';
import './BlogHeader.scss';
import API from '../../Api/api';
import * as actions from '../../store/actions';

const { Header } = Layout;
const { login, getProfile } = new API();

const mapStateToProps = ({ userInfo }) => ({
  username: userInfo.username,
});

const mapDispatchToProps = (dispatch) => {
  return { setUser: (user) => dispatch(actions.setUser(user)) };
};

const BlogHeader = ({ username, setUser }) => {
  if (localStorage.getItem('userInfo') && !username) {
    login(JSON.parse(localStorage.getItem('userInfo'))).then(({ user }) =>
      getProfile(user).then(({ image }) => {
        setUser({ ...user, image });
      })
    );
  }
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
  username: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
};
