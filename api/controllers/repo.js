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

  if (filter === "favourites") {
    let repos = currentRepos.filter((repo) => {
      let name = repo.name.toLowerCase();

      return (
        name.includes("dolce") ||
        name.includes("isell") ||
        name.includes("estate") ||
        name.includes("job") ||
        name.includes("dev") ||
        name === "card_games" ||
        name.includes("shop_it_django") ||
        name.includes("html5")
      );
    });
    res.status(200).send(repos);
  }
  if (filter === "wdi") {
    let repos = currentRepos.filter((repo) => {
      let name = repo.name.toLowerCase();

      return (
        name.includes("bit") || name.includes("wdi") || name.includes("day")
      );
    });
    res.status(200).send(repos);
  } else {
    let repos = currentRepos.filter((repo) =>
      repo.name.toLowerCase().includes(filter.toLowerCase())
    );
    res.status(200).send(repos);
  }
};
module.exports = { getRepos, filterRepos };
