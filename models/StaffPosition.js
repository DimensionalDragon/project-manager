const { DataTypes } = require('sequelize');
const db = require('../db');

const StaffPosition = db.define('StaffPosition', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
});

module.exports = StaffPosition;
