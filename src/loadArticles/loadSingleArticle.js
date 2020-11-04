import axios from 'axios';
import { serverUrl } from '../serverData/apiPaths';
import reqHeaders from '../serverData/reqHeaders';

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
