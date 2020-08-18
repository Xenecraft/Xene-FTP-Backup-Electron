const moment = require('moment');

const getCurrentTimestamp = () => {
  return moment();
};

module.exports = {
  getCurrentTimestamp,
};
