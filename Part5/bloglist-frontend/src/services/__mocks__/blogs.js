import testHelper from "../../helpers/testHelper";

const blogs = testHelper.blogs;
let token = null;

const setToken = (newToken) => {
  if (newToken) {
    token = `Bearer ${newToken}`;
  } else {
    token = null;
  }
};

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { setToken, getAll };
