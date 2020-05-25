const CONSTANTS = {};
CONSTANTS.ENDPOINT = {};

CONSTANTS.PORT = process.env.PORT || "5000";
CONSTANTS.ENDPOINT.HOME = "/";
CONSTANTS.ENDPOINT.EMAIL = "/email";
CONSTANTS.ENDPOINT.REPO = "/repos";
CONSTANTS.ENDPOINT.GITHUB_USER = "/users";

module.exports = CONSTANTS;
