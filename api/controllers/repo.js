const axios = require("axios");
const fs = require("fs");
const fse = require("fs-extra");

const getRepos = (req, res) => {
  axios
    .get("https://api.github.com/users/jaybenaim", {
      headers: {
        Authorization: `token 7e6bbb35e1883354cb894de17cc2867dd7e335a3`,
      },
    })
    .then((response) => {
      let results = response.data;
      writeToJson(results);
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const writeToJson = (data) => {
  let jsonString = JSON.stringify(data);
  if (fs.existsSync("../userInfo.json")) {
    fse.removeSync("../userInfo.json");
  }
  fs.writeFile("../userInfo.json", jsonString, "utf8", (err) =>
    err ? console.log(err) : console.log("File Written")
  );
  // fs.writeFileSync("../repos.json", JSON.stringify(data));
};
module.exports = { getRepos };
