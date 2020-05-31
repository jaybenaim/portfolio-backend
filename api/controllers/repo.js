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
const filterRepos = (req, res) => {
  let currentRepos = repos[0];
  let { filter } = req.query;
  let results = currentRepos.filter((repo) =>
    repo.name.toLowerCase().includes(filter.toLowerCase())
  );
  res.status(200).send(results);
};
module.exports = { getRepos, filterRepos };
