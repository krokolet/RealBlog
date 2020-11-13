import axios from 'axios';
import { serverUrl } from '../serverInfo/apiPaths';
import reqHeaders from '../serverInfo/reqHeaders';

const server = serverUrl;

const sendArticle = async (pathApi, method, values) => {
  const path = new URL(pathApi, server);
  const normValues = JSON.stringify(values);
  try {
    const response = await axios({
      method,
      url: path.toString(),
      data: normValues,
      headers: reqHeaders(),
    });
    return response.data;
  } catch ({ response }) {
    throw response;
  }
};

export default sendArticle;
