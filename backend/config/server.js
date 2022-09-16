const { resolve } = require('path');
const { config } = require('dotenv');
config(resolve('../.env'));

const {
  PORT: port,
  DB_USER: username,
  DB_PASS: password,
  DB_NAME: database,
  DB_HOST: host,
  SECRET: secret,
  EXPIRES: expiresIn,
  NODE_ENV: environment = 'development'
} = process.env;

module.exports = {
  port,
  db: { username, password, database, host },
  jwtConfig: { secret, expiresIn: parseInt(expiresIn) },
  environment,
  isProduction: environment === 'production'
};
