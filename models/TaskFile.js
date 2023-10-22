const { DataTypes } = require('sequelize');
const db = require('../db');

const TaskFile = db.define('TaskFile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    path: {
        type: DataTypes.STRING,
    },
});

module.exports = TaskFile;
