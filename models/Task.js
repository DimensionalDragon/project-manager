const { DataTypes } = require('sequelize');
const db = require('../db');
const ProjectGroup = require('./ProjectGroup');
const Staff = require('./Staff');
const TaskStatus = require('./TaskStatus');
const TaskFile = require('./TaskFile');

const Task = db.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get() {
            const id = this.getDataValue('id');
            if (!id) return null;
            const paddedId = id.toString().padStart(5, '0');
            return `T-${paddedId}`;
        },
    },
    name: {
        type: DataTypes.STRING,
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    startPlan: {
        type: DataTypes.DATE,
    },
    endPlan: {
        type: DataTypes.DATE,
    },
    startActual: {
        type: DataTypes.DATE,
    },
    endActual: {
        type: DataTypes.DATE,
    },
});

Task.belongsTo(ProjectGroup);
ProjectGroup.hasMany(Task);

Task.belongsTo(TaskStatus);
TaskStatus.hasMany(Task);

Task.belongsTo(Staff);
Staff.hasMany(Task);

TaskFile.belongsTo(Task);
Task.hasMany(TaskFile);

module.exports = Task;
