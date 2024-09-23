const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("ashkim", "root", "", {
  host: "localhost",
  dialect: 'mysql',
  logging: false,
});


const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
