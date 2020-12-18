import API from '../Api/api';
import errorFromApiToForm from '../Api/errorFromApiToForm';

const {
  sendLogin,
  sendNewProfile,
  sendSetLike,
  sendDeleteLike,
  sendDeleteArticle,
  sendArticle,
  sendEditedArticle,
  sendSignUp,
} = new API();

export const SET_USER = 'SET_USER';
export const SET_ARTICLES = 'SET_ARTICLES';
export const SET_ARTICLE_COUNT = 'SET_ARTICLE_COUNT';
export const SET_CURRENT_ARTICLE = 'SET_CURRENT_ARTICLE';
export const DEL_CURRENT_ARTICLE = 'DEL_CURRENT_ARTICLE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const FETCH_STARTED = 'FETCH_STARTED';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const setUser = (user) => ({ type: SET_USER, user });
export const logoutUser = () => ({ type: SET_USER, user: {} });
export const setArticles = (payload) => ({ type: SET_ARTICLES, payload });
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
        dispatch(fetchSuccess());
        dispatch(setUser({ email: user.email, username: user.username, image: user.image }));
      })
      .catch(({ status, data: { errors } }) => {
        dispatch(fetchFailure(errorFromApiToForm(status, errors)));
      });
  };
};

export const editUserProfile = (values) => {
  return (dispatch) => {
    dispatch(fetchStarted());
    return sendNewProfile(values)
      .then(({ user }) => {
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            email: user.email,
            password: values.password,
            token: user.token,
          }).toString()
        );
        dispatch(fetchSuccess());
        dispatch(setUser({ email: user.email, username: user.username, image: user.image }));
      })
      .catch(({ status, data: { errors } }) => {
        dispatch(fetchFailure(errorFromApiToForm(status, errors)));
      });
  };
};

export const setLike = (slug) => {
  return (dispatch, getState) => {
    const { articlesList } = getState();
    dispatch(fetchStarted());
    return sendSetLike(slug)
      .then(() => {
        dispatch(fetchSuccess());
        dispatch(
          setArticles(
            articlesList.map((article) =>
              article.slug === slug
                ? { ...article, favorited: true, favoritesCount: article.favoritesCount + 1 }
                : article
            )
          )
        );
      })
      .catch(({ status, data: { errors } }) => {
        dispatch(fetchFailure(errorFromApiToForm(status, errors)));
      });
  };
};

export const deleteLike = (slug) => {
  return (dispatch, getState) => {
    const { articlesList } = getState();
    dispatch(fetchStarted());
    return sendDeleteLike(slug)
      .then(() => {
        dispatch(fetchSuccess());
        dispatch(
          setArticles(
            articlesList.map((article) =>
              article.slug === slug
                ? { ...article, favorited: false, favoritesCount: article.favoritesCount - 1 }
                : article
            )
          )
        );
      })
      .catch(({ status, data: { errors } }) => {
        dispatch(fetchFailure(errorFromApiToForm(status, errors)));
      });
  };
};

export const deleteArticle = (slug) => {
  return (dispatch, getState) => {
    const { articlesList } = getState();
    dispatch(fetchStarted());
    return sendDeleteArticle(slug)
      .then(() => {
        dispatch(fetchSuccess());
        dispatch(setArticles(articlesList.filter((article) => article.slug !== slug)));
      })
      .catch(({ status, data: { errors } }) => {
        dispatch(fetchFailure(errorFromApiToForm(status, errors)));
      });
  };
};

export const postArticle = (article) => {
  return (dispatch) => {
    dispatch(fetchStarted());
    return sendArticle(article)
      .then(() => {
        dispatch(fetchSuccess());
      })
      .catch(({ status, data: { errors } }) => {
        dispatch(fetchFailure(errorFromApiToForm(status, errors)));
      });
  };
};

export const postEditedArticle = (slug, article) => {
  return (dispatch) => {
    dispatch(fetchStarted());
    return sendEditedArticle(slug, article)
      .then(() => {
        dispatch(fetchSuccess());
      })
      .catch(({ status, data: { errors } }) => {
        dispatch(fetchFailure(errorFromApiToForm(status, errors)));
      });
  };
};

export const signUpUser = (values) => {
  return (dispatch) => {
    dispatch(fetchStarted());
    return sendSignUp(values)
      .then(({ user }) => {
        localStorage.setItem(
          'userInfo',
          JSON.stringify({ email: values.email, password: values.password, token: user.token }).toString()
        );
        dispatch(fetchSuccess());
        dispatch(setUser({ email: user.email, username: user.username, image: user.image }));
      })
      .catch(({ status, data: { errors } }) => {
        dispatch(fetchFailure(errorFromApiToForm(status, errors)));
      });
  };
};
