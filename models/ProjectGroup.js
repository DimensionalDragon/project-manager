const { DataTypes } = require('sequelize');
const db = require('../db');
const Project = require('./Project');

const ProjectGroup = db.define('ProjectGroup', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get() {
            const id = this.getDataValue('id');
            if (!id) return null;
            const paddedId = id.toString().padStart(5, '0');
            return `PG-${paddedId}`;
        },
    },
    name: {
        type: DataTypes.STRING,
    },
});

ProjectGroup.belongsTo(Project);
Project.hasMany(ProjectGroup);

module.exports = ProjectGroup;
