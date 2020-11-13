const reqHeaders = () => {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
  };
  if (localStorage.getItem('userInfo')) {
    headers.Authorization = `Token ${JSON.parse(localStorage.getItem('userInfo')).token}`;
  }
  return headers;
};

export default reqHeaders;
