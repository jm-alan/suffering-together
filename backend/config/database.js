const {
  db: {
    username,
    password,
    database,
    host
  },
  environment
} = require('./server');

const dialect = 'postgres';
const seederStorage = 'sequelize';

module.exports = {
  development: {
    logging: false,
    username,
    password,
    database,
    host,
    dialect,
    seederStorage
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    logging: false,
    dialect,
    seederStorage
  }
}[environment];
