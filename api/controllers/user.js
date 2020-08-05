const userInfo = require("../userInfo");

const getUser = (req, res) => {
    return await axios.get(
    `https://api.github.com/repos/jaybenaim/`,
    {
      auth: {
        username: process.env.GH_USERNAME,
        token: process.env.GH_TOKEN,
      },
    }
  );
  // return res.status(200).send(userInfo);
};

module.exports = { getUser };
