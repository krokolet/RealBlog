import axios from 'axios';
import { serverUrl } from '../serverInfo/apiPaths';
import reqHeaders from '../serverInfo/reqHeaders';

const server = serverUrl;

const loadSingleArticle = async (pathApi, slug) => {
  const path = new URL(`${pathApi}/${slug}`, server);
  try {
    const response = await axios.get(path.toString(), {
      headers: reqHeaders(),
    });
    return response.data;
  } catch ({ response }) {
    throw response;
  }
};

export default loadSingleArticle;
