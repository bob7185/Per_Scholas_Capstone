import express from 'express';
import 'dotenv/config.js';
import usersRouter from './routes/users.js';
import tasksRouter from './routes/tasks.js';
import authRouter from './routes/auth.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

// Middleware for routes
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/auth', authRouter)

// Catch-all route for undefined endpoints
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`);
});
