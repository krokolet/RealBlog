const authorizationMethod = () => {
  return `Token ${JSON.parse(localStorage.getItem('userInfo')).token}`;
};

export default authorizationMethod;
