import express from 'express'
import 'dotenv/config.js'

import usersRouter from './routes/users.js'
import tasksRouter from './routes/tasks.js'
import projectsRouter from './routes/projects.js'

const app = express();
const PORT = 8000

app.use(express.json())


// set middleware for specific routes 
app.use('/users', usersRouter);
app.use('/tasks',tasksRouter);
app.use('/projects', projectsRouter)


app.use('/', (req, res)=>{
    res.status(200).json({message: 'Hello World'});
})

app.listen(PORT, (req, res)=>{
    console.log(`Server listening at port: ${PORT}`)
})