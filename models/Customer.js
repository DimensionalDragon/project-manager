const { DataTypes } = require('sequelize');
const db = require('../db');

const Customer = db.define('Customer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get() {
            const id = this.getDataValue('id');
            if (!id) return null;
            const paddedId = id.toString().padStart(5, '0');
            return `C-${paddedId}`;
        },
    },
    name: {
        type: DataTypes.STRING,
    },
    identityNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
    },
    province: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Customer;
