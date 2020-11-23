import API from '../Api/api';
import errorFromApiToForm from '../Api/errorFromApiToForm';

const { sendLogin, getProfile } = new API();

export const SET_USER = 'SET_USER';
export const LOAD_ARTICLES = 'LOAD_ARTICLES';
export const SET_ARTICLE_COUNT = 'SET_ARTICLE_COUNT';
export const SET_CURRENT_ARTICLE = 'SET_CURRENT_ARTICLE';
export const DEL_CURRENT_ARTICLE = 'DEL_CURRENT_ARTICLE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const FETCH_STARTED = 'FETCH_STARTED';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const setUser = (user) => ({ type: SET_USER, user });
export const logoutUser = () => ({ type: SET_USER, user: {} });
export const setArticles = (articles) => ({ type: LOAD_ARTICLES, articles });
export const setArticlesCount = (count) => ({ type: SET_ARTICLE_COUNT, count });
export const setCurrentArticle = (article) => ({ type: SET_CURRENT_ARTICLE, article });
export const delCurrentArticle = () => ({ type: DEL_CURRENT_ARTICLE });
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, page });

const fetchStarted = () => ({
  type: FETCH_STARTED,
});

const fetchSuccess = () => ({
  type: FETCH_SUCCESS,
});

const fetchFailure = (errors) => {
  return {
    type: FETCH_FAILURE,
    errors,
  };
};

export const loginUser = (values) => {
  return (dispatch) => {
    dispatch(fetchStarted());
    return sendLogin(values)
      .then(({ user }) => {
        localStorage.setItem(
          'userInfo',
          JSON.stringify({ email: user.email, password: values.password, token: user.token }).toString()
        );
        getProfile(user).then(({ image }) => {
          dispatch(fetchSuccess());
          dispatch(setUser({ ...user, image }));
        });
      })
      .catch(({ status, data: { errors } }) => {
        dispatch(fetchFailure(errorFromApiToForm(status, errors)));
      });
  };
};
