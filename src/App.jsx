import React from 'react';
import 'antd/dist/antd.css';
import './App.scss';

import { Layout, Button, Row, Col } from 'antd';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './store/actions';

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
import ErrorText from './components/ErrorText/errorText';

const { Content } = Layout;

const mapStateToProps = ({ fetchStatus: { errorsFetching } }) => {
  return { errorsFetching };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchResetFailure: () => dispatch(actions.fetchActions.fetchResetFailure()),
  };
};

const App = ({ errorsFetching, history, fetchResetFailure }) => {
  const globalError = errorsFetching?.global && errorsFetching.global;
  return (
    <Layout className="wrapper">
      {globalError ? (
        <Row>
          <Col>
            {ErrorText(globalError)}
            <Button
              type="primary"
              block
              onClick={() => {
                fetchResetFailure();
                history.push(hrefHomePage);
              }}
            >
              Try again.
            </Button>
          </Col>
        </Row>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

App.propTypes = {
  errorsFetching: PropTypes.objectOf(PropTypes.string),
  fetchResetFailure: PropTypes.func.isRequired,
  history: { ...PropTypes.object }.isRequired,
};

App.defaultProps = {
  errorsFetching: null,
};
