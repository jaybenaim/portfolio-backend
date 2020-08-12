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
  switch (filter) {
    case "favourites":
      currentRepos = currentRepos.filter((repo) => repo.favourite);
      res.status(200).send(currentRepos);
      break;
    case "deployed":
      currentRepos = currentRepos.filter((repo) => {
        let name = repo.name.toLowerCase();
        let deployed = repo.has_pages;
        return deployed
          ? deployed
          : name.includes("cookies") ||
              name.includes("highly") ||
              name.includes("estate") ||
              name.includes("job") ||
              name.includes("dev") ||
              name.includes("html5");
      });
      res.status(200).send(currentRepos);
      break;
    case "wdi":
      currentRepos = currentRepos.filter((repo) => {
        let name = repo.name.toLowerCase();

        return (
          name.includes("bit") ||
          name.includes("wdi") ||
          name.includes("day") ||
          name.includes("rein")
        );
      });
      res.status(200).send(currentRepos);
      break;
    case "angular":
      currentRepos = currentRepos.filter((repo) => {
        let name = repo.name.toLowerCase();
        let language = repo.language ? repo.language.toLowerCase() : "unknown";

        return (
          name.includes("angular") ||
          name.includes("tour") ||
          language.includes("typescript")
        );
      });
      res.status(200).send(currentRepos);
      break;
    case "games":
      currentRepos = currentRepos.filter((repo) => {
        let name = repo.name.toLowerCase();

        return name.includes("html5game") || name.includes("game");
      });
      res.status(200).send(currentRepos);
      break;

    default:
      let defaultRepos = currentRepos.filter(
        ({ name, language = "unknown" }) => {
          let filter = filter.toLowerCase();
          language = repo.language.toLowerCase();
          filter = filter.toLowerCase();

          return name.includes(filter) || language.includes(filter);
        }
      );
      res.status(200).send(defaultRepos);
  }
};
module.exports = { getRepos, filterRepos, getLanguages };
