const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello, Express!' });
});

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const customersRouter = require('./routes/customers');
app.use('/customers', customersRouter);

const staffsRouter = require('./routes/staffs');
app.use('/staffs', staffsRouter);

const projectsRouter = require('./routes/projects');
app.use('/projects', projectsRouter);

const projectGroupsRouter = require('./routes/projectGroups');
app.use('/project-groups', projectGroupsRouter);

const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

async function testDatabase() {
    try {
        await db.authenticate();
        console.log('Connected to database.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

async function syncDatabase() {
    try {
        await db.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to sync database: ', error);
    }
}

app.listen(5000, () => {
    testDatabase();
    syncDatabase();
    console.log('Server listening on port 5000');
});
