import express from 'express';
import 'dotenv/config.js';
import usersRouter from './routes/users.js';
import tasksRouter from './routes/tasks.js';
import authRouter from './routes/auth.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(express.static(path.join(__dirname, '../client/build')));

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
// app.use('*', (req, res) => {
//     res.status(404).json({ message: 'Endpoint not found' });
// });


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });

app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`);
});
