const express = require("express"),
  CONSTANTS = require("../../constants"),
  ctrlHome = require("../controllers/home"),
  ctrlEmail = require("../controllers/email"),
  ctrlRepo = require("../controllers/repo");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello");
});

const { HOME, EMAIL, REPO } = CONSTANTS.ENDPOINT;

// API home
router.get(HOME, ctrlHome.getHome);

//  Email
router.post(EMAIL, ctrlEmail.sendEmail);

// Repos
router.get(REPO, ctrlRepo.getRepos);

module.exports = router;
