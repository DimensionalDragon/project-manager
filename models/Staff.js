const { DataTypes } = require('sequelize');
const db = require('../db');
const StaffPosition = require('./StaffPosition');
const StaffStatus = require('./StaffStatus');

const Staff = db.define('Staff', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get() {
            const id = this.getDataValue('id');
            if (!id) return null;
            const paddedId = id.toString().padStart(5, '0');
            return `S-${paddedId}`;
        },
    },
    name: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
    },
    whatsappNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

Staff.belongsTo(StaffPosition);
StaffPosition.hasMany(Staff);

Staff.belongsTo(StaffStatus);
StaffStatus.hasMany(Staff);

module.exports = Staff;
