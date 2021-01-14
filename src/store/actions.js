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
  getSingleArticle,
  loadArticles,
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
export const FETCH_RESET_FAILURE = 'FETCH_RESET_FAILURE';

export const userActions = {
  setUser: (user) => ({ type: SET_USER, user }),
  logoutUser: () => ({ type: SET_USER, user: {} }),
};

export const articlesActions = {
  setArticles: (payload) => ({ type: SET_ARTICLES, payload }),
  setArticlesCount: (count) => ({ type: SET_ARTICLE_COUNT, count }),
  setCurrentArticle: (article) => ({ type: SET_CURRENT_ARTICLE, article }),
  delCurrentArticle: () => ({ type: DEL_CURRENT_ARTICLE }),
  setCurrentPage: (page) => ({ type: SET_CURRENT_PAGE, page }),
};

export const fetchActions = {
  fetchStarted: () => ({
    type: FETCH_STARTED,
  }),
  fetchSuccess: () => ({
    type: FETCH_SUCCESS,
  }),
  fetchFailure: (errors) => ({
    type: FETCH_FAILURE,
    errors,
  }),
  fetchResetFailure: () => ({ type: FETCH_RESET_FAILURE }),
};

export const loginUser = (values) => {
  return (dispatch) => {
    dispatch(fetchActions.fetchStarted());
    return sendLogin(values)
      .then(({ user }) => {
        localStorage.setItem(
          'userInfo',
          JSON.stringify({ email: user.email, password: values.password, token: user.token }).toString()
        );
        dispatch(fetchActions.fetchSuccess());
        dispatch(userActions.setUser({ email: user.email, username: user.username, image: user.image }));
      })
      .catch(({ status, data: { errors } }) => {
        dispatch(fetchActions.fetchFailure(errorFromApiToForm(status, errors)));
      });
  };
};

export const editUserProfile = (values) => {
  return (dispatch) => {
    dispatch(fetchActions.fetchStarted());
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
        dispatch(fetchActions.fetchSuccess());
        dispatch(userActions.setUser({ email: user.email, username: user.username, image: user.image }));
      })
      .catch(({ status, data: { errors } }) => {
        dispatch(fetchActions.fetchFailure(errorFromApiToForm(status, errors)));
      });
  };
};

export const setLike = (slug) => {
  return (dispatch, getState) => {
    const { articlesList, currentArticle } = getState();
    dispatch(fetchActions.fetchStarted());
    return sendSetLike(slug)
      .then(() => {
        dispatch(fetchActions.fetchSuccess());
        dispatch(
          articlesList.length
            ? articlesActions.setArticles(
                articlesList.map((article) =>
                  article.slug === slug
                    ? { ...article, favorited: true, favoritesCount: article.favoritesCount + 1 }
                    : article
                )
              )
            : articlesActions.setCurrentArticle({
                ...currentArticle,
                favorited: true,
                favoritesCount: currentArticle.favoritesCount + 1,
              })
        );
      })
      .catch(({ status, data: { errors } }) => {
        dispatch(fetchActions.fetchFailure(errorFromApiToForm(status, errors)));
      });
  };
};

export const deleteLike = (slug) => {
  return (dispatch, getState) => {
    const { articlesList, currentArticle } = getState();
    dispatch(fetchActions.fetchStarted());
    return sendDeleteLike(slug)
      .then(() => {
        dispatch(fetchActions.fetchSuccess());
        dispatch(
          articlesList.length
            ? articlesActions.setArticles(
                articlesList.map((article) =>
                  article.slug === slug
                    ? { ...article, favorited: false, favoritesCount: article.favoritesCount - 1 }
                    : article
                )
              )
            : articlesActions.setCurrentArticle({
                ...currentArticle,
                favorited: false,
                favoritesCount: currentArticle.favoritesCount - 1,
              })
        );
      })
      .catch(({ status, data: { errors } }) => {
        dispatch(fetchActions.fetchFailure(errorFromApiToForm(status, errors)));
      });
  };
};

export const deleteArticle = (slug) => {
  return (dispatch, getState) => {
    const { articlesList } = getState();
    dispatch(fetchActions.fetchStarted());
    return sendDeleteArticle(slug)
      .then(() => {
        dispatch(fetchActions.fetchSuccess());
        dispatch(articlesActions.setArticles(articlesList.filter((article) => article.slug !== slug)));
      })
      .catch(({ status, data: { errors } }) => {
        dispatch(fetchActions.fetchFailure(errorFromApiToForm(status, errors)));
      });
  };
};

export const postArticle = (article) => {
  return (dispatch) => {
    dispatch(fetchActions.fetchStarted());
    return sendArticle(article)
      .then(() => {
        dispatch(fetchActions.fetchSuccess());
      })
      .catch(({ status, data: { errors } }) => {
        dispatch(fetchActions.fetchFailure(errorFromApiToForm(status, errors)));
      });
  };
};

export const postEditedArticle = (slug, article) => {
  return (dispatch) => {
    dispatch(fetchActions.fetchStarted());
    return sendEditedArticle(slug, article)
      .then(() => {
        dispatch(fetchActions.fetchSuccess());
      })
      .catch(({ status, data: { errors } }) => {
        dispatch(fetchActions.fetchFailure(errorFromApiToForm(status, errors)));
      });
  };
};

export const signUpUser = (values) => {
  return (dispatch) => {
    dispatch(fetchActions.fetchStarted());
    return sendSignUp(values)
      .then(({ user }) => {
        localStorage.setItem(
          'userInfo',
          JSON.stringify({ email: user.email, password: values.password, token: user.token }).toString()
        );
        dispatch(fetchActions.fetchSuccess());
        dispatch(userActions.setUser({ email: user.email, username: user.username, image: user.image }));
      })
      .catch(({ status, data: { errors } }) => {
        dispatch(fetchActions.fetchFailure(errorFromApiToForm(status, errors)));
      });
  };
};

export const loadArticle = (slug) => {
  return (dispatch) => {
    dispatch(fetchActions.fetchStarted());
    return getSingleArticle(slug)
      .then(({ article }) => {
        dispatch(fetchActions.fetchSuccess());
        dispatch(articlesActions.setCurrentArticle(article));
      })
      .catch(({ status, data: { errors } }) => {
        dispatch(fetchActions.fetchFailure(errorFromApiToForm(status, errors)));
      });
  };
};

export const getArticles = (articlesPerPage) => {
  return (dispatch, getState) => {
    const { currentPage } = getState();
    dispatch(fetchActions.fetchStarted());
    return loadArticles(articlesPerPage, currentPage)
      .then((response) => {
        dispatch(fetchActions.fetchSuccess());
        dispatch(articlesActions.setArticlesCount(response.articlesCount));
        dispatch(articlesActions.setArticles(response.articles));
      })
      .catch(({ status, data: { errors } }) => {
        dispatch(fetchActions.fetchFailure(errorFromApiToForm(status, errors)));
      });
  };
};
