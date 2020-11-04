export const SET_USER = 'SET_USER';
export const LOAD_ARTICLES = 'LOAD_ARTICLES';
export const SET_ARTICLE_COUNT = 'SET_ARTICLE_COUNT';
export const SET_CURRENT_ARTICLE = 'SET_CURRENT_ARTICLE';
export const DEL_CURRENT_ARTICLE = 'DEL_CURRENT_ARTICLE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

export const setUser = (user) => ({ type: SET_USER, user });
export const logoutUser = () => ({ type: SET_USER, user: {} });
export const setArticles = (articles) => ({ type: LOAD_ARTICLES, articles });
export const setArticlesCount = (count) => ({ type: SET_ARTICLE_COUNT, count });
export const setCurrentArticle = (article) => ({ type: SET_CURRENT_ARTICLE, article });
export const delCurrentArticle = () => ({ type: DEL_CURRENT_ARTICLE });
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, page });
