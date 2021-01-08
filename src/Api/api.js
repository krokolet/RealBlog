import axios from 'axios';
import {
  loginPath,
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

  sendArticle = (article) => {
    return this.sendInfo(addArticlePath, 'post', article);
  };

  sendEditedArticle = (slug, article) => {
    return this.sendInfo(`${addArticlePath}/${slug}`, 'put', article);
  };

  sendDeleteArticle = async (slug) => {
    return this.sendInfo(`${deleteArticlePath}/${slug}`, 'delete');
  };

  sendSetLike = (slug) => {
    return this.sendInfo(`${toggleArticleFavoritePath}/${slug}/favorite`, 'post');
  };

  sendDeleteLike = (slug) => {
    return this.sendInfo(`${toggleArticleFavoritePath}/${slug}/favorite`, 'delete');
  };

  sendNewProfile = (user) => {
    return this.sendInfo(userPath, 'put', user);
  };

  sendLogin = (values) => {
    return this.sendInfo(loginPath, 'post', { user: values });
  };

  sendSignUp = (values) => {
    return this.sendInfo(signupPath, 'post', { user: values });
  };

  getSingleArticle = (slug) => {
    return this.sendInfo(`${addArticlePath}/${slug}`, 'get');
  };
}

export default API;
