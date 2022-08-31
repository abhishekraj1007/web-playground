const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("userapi", "abhishek_raj", "iamawesome", {
  host: "localhost",
  dialect: "postgres",
  port: 5433,
});

(async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    sequelize.close();
    console.log("Connection closed to the database");
  }
})();

module.exports = sequelize;
