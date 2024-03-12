const Sequielize = require('sequelize');

const connection = new Sequielize("mysql://root:A-6D1D4FCD-6F4e2b3CD5abcce2C61hB@roundhouse.proxy.rlwy.net:14646/railway", {
  host: "roundhouse.proxy.rlwy.net",
  dialect: "mysql"
})

module.exports = connection;

