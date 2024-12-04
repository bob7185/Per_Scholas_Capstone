import express from 'express'
import 'dotenv/config.js'
import { db } from './config/dbconnect.js';

const app = express();

const PORT = 8000

app.use('/', (req, res)=>{
    res.status(200).json({message: 'Hello World'});
})
app.use('*', (req, res)=>{
    res.status(404).json({message: 'not found'});
})

app.listen(PORT, (req, res)=>{
    console.log(`Server listening at port: ${PORT}`)
})