const repoData = require("../repos");
const axios = require("axios");

const fetchLanguages = async (repoName) => {
  return await axios.get(
    `https://api.github.com/repos/jaybenaim/${repoName}/languages`,
    {
      auth: {
        username: process.env.GH_USERNAME,
        token: process.env.GH_TOKEN,
      },
    }
  );
};
const getLanguages = (req, res) => {
  let { name: repoName } = req.query;

  fetchLanguages(repoName)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => res.status(500).send(err));
};

const repos = () => {
  let newRepos = repoData[0];
  return newRepos;
};

const getRepos = (req, res) => {
  let currentRepos = repos();
  let { start_at: startAt } = req.query;
  if (!startAt) {
    startAt = 0;
  }
  let endAt = Number(startAt) + 20;

  // assign languages to repos
  currentRepos = currentRepos.map((repo) => {
    return repo;
  });
  let next20Repos = currentRepos.slice(startAt, endAt);

  return res.status(200).send(next20Repos);
};

const filterRepos = (req, res) => {
  let currentRepos = repos();
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
  } else if (filter === "wdi") {
    let repos = currentRepos.filter((repo) => {
      let name = repo.name.toLowerCase();

      return (
        name.includes("bit") ||
        name.includes("wdi") ||
        name.includes("day") ||
        name.includes("rein")
      );
    });
    res.status(200).send(repos);
  } else if (filter === "angular") {
    let repos = currentRepos.filter((repo) => {
      let name = repo.name.toLowerCase();
      let language = repo.language ? repo.language.toLowerCase() : "unknown";

      return (
        name.includes("angular") ||
        name.includes("tour") ||
        language.includes("typescript")
      );
    });
    if (repos.length >= 1) {
      res.status(200).send(repos);
    } else {
      res.status(500).send(err);
    }
  } else {
    let repos = currentRepos.filter((repo) => {
      let name = repo.name.toLowerCase();
      let language = repo.language ? repo.language.toLowerCase() : "unknown";
      filter = filter.toLowerCase();

      return name.includes(filter) || language.includes(filter);
    });
    res.status(200).send(repos);
  }
};
module.exports = { getRepos, filterRepos, getLanguages };
