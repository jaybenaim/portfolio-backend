const express = require("express"),
  CONSTANTS = require("../../constants"),
  ctrlHome = require("../controllers/home"),
  ctrlEmail = require("../controllers/email"),
  ctrlRepo = require("../controllers/repo"),
  ctrlUser = require("../controllers/user");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello");
});

const {
  HOME,
  EMAIL,
  REPO,
  GITHUB_USER,
  REPO_FILTER,
  LANGUAGES,
} = CONSTANTS.ENDPOINT;

// API home
router.get(HOME, ctrlHome.getHome);

//  Email
router.post(EMAIL, ctrlEmail.sendEmail);

// Repos
router.get(REPO, ctrlRepo.getRepos);
router.get(REPO_FILTER, ctrlRepo.filterRepos);
router.get(LANGUAGES, ctrlRepo.getLanguages);

// Github User
router.get(GITHUB_USER, ctrlUser.getUser);

module.exports = router;
