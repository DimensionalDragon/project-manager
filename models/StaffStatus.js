const { DataTypes } = require('sequelize');
const db = require('../db');

const StaffStatus = db.define('StaffStatus', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
});

module.exports = StaffStatus;
