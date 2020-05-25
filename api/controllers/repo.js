const repos = require("../repos");

const getRepos = (req, res) => {
  let currentRepos = repos[0];
  let { start_at: startAt } = req.query;
  if (!startAt) {
    startAt = 0;
  }
  let endAt = Number(startAt) + 20;
  let next20Repos = currentRepos.slice(startAt, endAt);

  return res.status(200).send(next20Repos);
};

module.exports = { getRepos };
