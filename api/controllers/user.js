const userInfo = require("../userInfo");

const getUser = (req, res) => {
  return res.status(200).send(userInfo);
};

module.exports = { getUser };
