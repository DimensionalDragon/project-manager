const { DataTypes } = require('sequelize');
const db = require('../db');
const Customer = require('./Customer');

const Project = db.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get() {
            const id = this.getDataValue('id');
            if (!id) return null;
            const paddedId = id.toString().padStart(5, '0');
            return `P-${paddedId}`;
        },
    },
    name: {
        type: DataTypes.STRING,
    },
});

Project.belongsTo(Customer);
Customer.hasMany(Project);

module.exports = Project;
