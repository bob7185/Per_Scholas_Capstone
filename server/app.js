import express from 'express';
import 'dotenv/config.js';
import usersRouter from './routes/users.js';
import tasksRouter from './routes/tasks.js';
import projectsRouter from './routes/projects.js';

const app = express();
const PORT = 8000;

app.use(express.json());

// Middleware for routes
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);

// Catch-all route for undefined endpoints
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`);
});
