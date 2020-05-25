const repos = require("../repos");

const getRepos = (req, res) => {
  return res.status(200).send(...repos);
};

module.exports = { getRepos };
