import { db } from '../config/dbConnect.js'
import express from 'express'

 const router =  express.Router()



//show the users in database 
 router.get('/', async (req, res)=>{
    let collection = await db.collection('tasks');
    let result = await collection.find({}).toArray();
    res.send(result)
 });

 //format of the task when we are creating it 
 /*
    "name": "Update Documentation",
        "description": "Update the project documentation with the latest changes.",
        "priority": "Low",
        "status": "Pending",
        "dueDate": "2024-12-11T19:02:42.256Z",*/

// //create  a new task
router.post('/', async(req, res)=>{
    let collection = await db.collection("tasks");
    let newTask = {
        name : req.body.name,
        description : req.body.description,
        priority: req.body.priority,
        status: req.body.status,
        createdAt: new Date().toISOString()
    }

    let result = await collection.insertOne(newTask);
    res.send(result).status(204);
 })



export  default router;