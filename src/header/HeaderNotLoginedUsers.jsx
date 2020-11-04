import React from 'react';
import { Col } from 'antd';

import { Link } from 'react-router-dom';
import { hrefLogin, hrefSignup } from '../serverData/linksToPages';

const HeaderNotLoginedUsers = () => {
  return (
    <>
      <Col>
        <Link to={hrefLogin} className="header__signLink">
          Sign in
        </Link>
      </Col>
      <Col>
        <Link to={hrefSignup} className="header__signupBtn">
          Sign up
        </Link>
      </Col>
    </>
  );
};
export default HeaderNotLoginedUsers;
