'use strict';
const packageJson = require('./../package.json');

module.exports = {
  NODE_ENV: '"production"',
  SERVER_API_URL: '""',
  VERSION: `'${packageJson.version}'`,
};
