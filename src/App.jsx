import React from 'react';
import 'antd/dist/antd.css';
import './App.scss';

import { Layout } from 'antd';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './userForms/login/login';
import SignUp from './userForms/signup/signup';
import Homepage from './homepage/homepage';
import BlogHeader from './header/BlogHeader';
import Article from './article/article';
import CreateArticle from './article/create/createArticle';
import EditArticle from './article/edit/editArticle';
import EditProfile from './userForms/editProfile/editProfile';

import {
  hrefHomePage,
  hrefSignup,
  hrefLogin,
  hrefArcticles,
  hrefCreateArcticle,
  hrefEditArticle,
  hrefEditProfile,
} from './serverData/linksToPages';

const { Content } = Layout;

const App = () => {
  return (
    <Layout className="wrapper">
      <BlogHeader />
      <Content>
        <Switch>
          <Route exact path={hrefHomePage} component={Homepage} />
          <Route path={hrefLogin} component={Login} />
          <Route path={hrefSignup} component={SignUp} />
          <Route exact path={`${hrefArcticles}/:slug`} component={Article} />
          <Route path={hrefCreateArcticle} render={() => <CreateArticle />} />
          <Route path={`${hrefEditArticle}/:slug/edit`} render={({ match }) => <EditArticle match={match} />} />
          <Route path={hrefEditProfile} render={() => <EditProfile />} />
        </Switch>
      </Content>
    </Layout>
  );
};

export default withRouter(connect()(App));
