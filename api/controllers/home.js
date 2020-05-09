const getHome = (req, res) => {
  return res.status(200).send("Api Home");
};

module.exports = { getHome };
