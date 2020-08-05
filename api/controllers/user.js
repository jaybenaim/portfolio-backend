const userInfo = require("../userInfo");
const axios = require("axios");

const getUser = (req, res) => {
  return axios
    .get(`https://api.github.com/users/jaybenaim`, {
      auth: {
        username: process.env.GH_USERNAME,
        token: process.env.GH_TOKEN,
      },
    })
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));

  // return res.status(200).send(userInfo);
};

module.exports = { getUser };
