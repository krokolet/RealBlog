import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  SET_USER,
  LOAD_ARTICLES,
  SET_ARTICLE_COUNT,
  SET_CURRENT_ARTICLE,
  DEL_CURRENT_ARTICLE,
  SET_CURRENT_PAGE,
} from './actions';

const defaultUser = {
  email: '',
  username: '',
  bio: '',
  image: '',
};

const userInfo = (state = defaultUser, { type, user }) => {
  switch (type) {
    case SET_USER:
      return {
        email: user.email,
        token: user.token,
        username: user.username,
        bio: user.bio,
        image: user.image,
      };
    default:
      return state;
  }
};

const articlesList = (articles = [], action) => {
  switch (action.type) {
    case LOAD_ARTICLES:
      return action.articles;
    default:
      return articles;
  }
};

const articlesCount = (count = 0, action) => {
  switch (action.type) {
    case SET_ARTICLE_COUNT:
      return action.count;
    default:
      return count;
  }
};

const currentPage = (page = 1, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return action.page;
    default:
      return page;
  }
};

const defaultArticle = {
  slug: '',
  title: '',
  description: '',
  body: '',
  tagList: [],
  createdAt: '',
  updatedAt: '',
  favoritesCount: '',
  author: { username: '', image: '', bio: '', following: false },
  isEdit: false,
};

const currentArticle = (article = defaultArticle, action) => {
  switch (action.type) {
    case SET_CURRENT_ARTICLE:
      return action.article;
    case DEL_CURRENT_ARTICLE:
      return defaultArticle;
    default:
      return article;
  }
};
// eslint-disable-next-line no-underscore-dangle
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

/* eslint-disable no-underscore-dangle */ const reducer = combineReducers({
  userInfo,
  articlesList,
  articlesCount,
  currentArticle,
  currentPage,
});
const store = createStore(reducer, compose(applyMiddleware(thunk), devtoolMiddleware));

export default store;
