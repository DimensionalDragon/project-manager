const { DataTypes } = require('sequelize');
const db = require('../db');

const TaskStatus = db.define('TaskStatus', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
});

module.exports = TaskStatus;
