import React from 'react';
import 'antd/dist/antd.css';
import './App.scss';

import { Layout } from 'antd';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Login from './pages/Login/login';
import SignUp from './pages/SignUp/signup';
import Homepage from './pages/HomePage/homepage';
import BlogHeader from './components/BlogHeader/BlogHeader';
import Article from './pages/Article/article';
import CreateArticle from './pages/CreateArticle/createArticle';
import EditArticle from './pages/EditArticle/editArticle';
import EditProfile from './pages/EditProfile/editProfile';

import {
  hrefHomePage,
  hrefSignup,
  hrefLogin,
  hrefArcticles,
  hrefCreateArcticle,
  hrefEditArticle,
  hrefEditProfile,
} from './Api/linksToPages';

const { Content } = Layout;

const mapStateToProps = ({ fetchStatus: { errorsFetching } }) => {
  return { errorsFetching };
};

const App = ({ errorsFetching }) => {
  return (
    <Layout className="wrapper">
      {errorsFetching === 'No connection' ? (
        <span>No connection. Try to reload page.</span>
      ) : (
        <>
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
        </>
      )}
    </Layout>
  );
};

export default withRouter(connect(mapStateToProps)(App));

App.propTypes = {
  errorsFetching: PropTypes.string,
};

App.defaultProps = {
  errorsFetching: null,
};
