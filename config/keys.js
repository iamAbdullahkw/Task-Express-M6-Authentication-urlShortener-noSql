const dotenv = require("dotenv");
dotenv.config();

const config = {
  JWT_SECRET: JWT_SECRET,
  JWT_EXPIRATION_MS: JWT_EXPIRATION_MS,
};

module.exports = config;
