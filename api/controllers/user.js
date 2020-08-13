const userInfo = require("../userInfo");
const repos = require("../repos");
const axios = require("axios");

const getUser = async (req, res) => {
  // return await axios
  //   .get(`https://api.github.com/users/jaybenaim`, {
  //     auth: {
  //       username: process.env.GH_USERNAME,
  //       token: process.env.GH_TOKEN,
  //     },
  //   })
  //   .then((response) => res.send(response.data))
  //   .catch((err) => res.send(err));
  const reposLength = repos[0].length;

  let updatedUser = userInfo;
  updatedUser.public_repos = reposLength;

  return await res.status(200).send(updatedUser);
};

module.exports = { getUser };
