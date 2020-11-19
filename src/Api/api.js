import axios from 'axios';
import {
  loginPath,
  profilePath,
  articlesPath,
  toggleArticleFavoritePath,
  deleteArticlePath,
  addArticlePath,
  userPath,
  signupPath,
} from './apiPaths';

class API {
  serverUrl = 'https://conduit.productionready.io';

  reqHeaders = () => {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
    };
    if (localStorage.getItem('userInfo')) {
      headers.Authorization = `Token ${JSON.parse(localStorage.getItem('userInfo')).token}`;
    }
    return headers;
  };

  getResourse = async (url, config) => {
    const path = new URL(url, this.serverUrl);
    try {
      const response = await axios.get(path.toString(), config);
      return response.data;
    } catch ({ response }) {
      throw response;
    }
  };

  loadArticles = (articlesPerPage, currentPage, pathApi) => {
    const config = {
      headers: this.reqHeaders(),
      params: {
        limit: articlesPerPage,
        offset: (currentPage - 1) * articlesPerPage,
      },
    };
    return this.getResourse(pathApi, config);
  };

  sendInfo = async (pathApi, method, values) => {
    const path = new URL(pathApi, this.serverUrl);
    const normValues = JSON.stringify(values);
    try {
      const response = await axios({
        method,
        url: path.toString(),
        data: normValues,
        headers: this.reqHeaders(),
      });
      return response.data;
    } catch ({ response }) {
      throw response;
    }
  };

  postArticle = (article) => {
    return this.sendInfo(addArticlePath, 'post', article);
  };

  editArticle = (slug, article) => {
    return this.sendInfo(`${addArticlePath}/${slug}`, 'put', article);
  };

  loadSingleArticle = (slug) => {
    return this.getResourse(`${articlesPath}/${slug}`, {
      headers: this.reqHeaders(),
    });
  };

  deleteArticle = async (slug) => {
    return this.sendInfo(`${deleteArticlePath}/${slug}`, 'delete');
  };

  getProfile = (user) => {
    return this.sendInfo(`${profilePath}/${user.username}`, 'get');
  };

  setLike = (slug) => {
    return this.sendInfo(`${toggleArticleFavoritePath}/${slug}/favorite`, 'post');
  };

  deleteLike = (slug) => {
    return this.sendInfo(`${toggleArticleFavoritePath}/${slug}/favorite`, 'delete');
  };

  editProfile = (user) => {
    return this.sendInfo(userPath, 'put', user);
  };

  login = (values) => {
    return this.sendInfo(loginPath, 'post', { user: values });
  };

  signUp = (values) => {
    return this.sendInfo(signupPath, 'post', { user: values });
  };
}

export default API;
