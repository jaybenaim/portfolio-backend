const express = require("express"),
  CONSTANTS = require("../../constants"),
  ctrlHome = require("../controllers/home"),
  ctrlEmail = require("../controllers/email");

const router = express.Router();
router.get("/", (req, res) => {
  res.send("hello");
});

const { HOME, EMAIL } = CONSTANTS.ENDPOINT;

// API home
router.get(HOME, ctrlHome.getHome);

//  Email
router.post(EMAIL, ctrlEmail.sendEmail);

module.exports = router;
