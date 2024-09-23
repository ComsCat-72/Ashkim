const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Group = sequelize.define('Group', {
  // No need to define members here, we'll use associations
});

module.exports = Group;
