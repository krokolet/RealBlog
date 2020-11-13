import axios from 'axios';
import { serverUrl } from '../serverInfo/apiPaths';
import reqHeaders from '../serverInfo/reqHeaders';

const server = serverUrl;

const loadArticles = async (articlesPerPage, currentPage, pathApi) => {
  const path = new URL(pathApi, server);
  try {
    const response = await axios.get(path.toString(), {
      headers: reqHeaders(),
      params: {
        limit: articlesPerPage,
        offset: (currentPage - 1) * articlesPerPage,
      },
    });
    return response.data;
  } catch ({ response }) {
    throw response;
  }
};

export default loadArticles;
