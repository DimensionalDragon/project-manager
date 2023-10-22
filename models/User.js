const { DataTypes } = require('sequelize');
const db = require('../db');

const User = db.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = User;
