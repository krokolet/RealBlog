import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Layout } from 'antd';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

import HeaderLoginedUsers from './HeaderLoginedUsers';
import HeaderNotLoginedUsers from './HeaderNotLoginedUsers';
import './BlogHeader.scss';
import sendUserInfo from '../sendUserInfo/sendUserInfo';
import { loginPath, profilePath } from '../serverInfo/apiPaths';
import * as actions from '../store/actions';

const { Header } = Layout;

const mapStateToProps = ({ userInfo }) => ({
  username: userInfo.username,
});

const mapDispatchToProps = (dispatch) => {
  return { setUser: (user) => dispatch(actions.setUser(user)) };
};

const BlogHeader = ({ username, setUser }) => {
  if (localStorage.getItem('userInfo') && !username) {
    sendUserInfo(loginPath, 'post', JSON.parse(localStorage.getItem('userInfo'))).then(({ user }) =>
      sendUserInfo(`${profilePath}/${user.username}`, 'get').then(({ image }) => {
        setUser(_.omit(user, ['token']), image);
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
