import UTubeApi from '../api';

const setToken = async (token) => {
  await UTubeApi.setToken(token);
}

const getUser_ = async (user) => {
  return await UTubeApi.getUser(user);
}

export { setToken, getUser_ };