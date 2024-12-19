import { db } from '../config/dbConnect.js';
import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

// show all task endpoint
router.get('/', async (req, res) => {
   const collection = await db.collection('tasks');
   const result = await collection.find({}).toArray();
   res.status(200).json(result);
});

// Show all tasks by a user 
router.get("/:email", async (req, res)=>{
    const collection = await db.collection('tasks');
    const query = { userEmail: req.params.email};

    try {
        const tasks = await collection.find(query).toArray();
        res.status(200).json({ tasks });
      } catch (error) {
        res.status(500).json({ message: 'Error getting tasks', error });
      }
})

// get a single task
router.get('/user/:taskId', async (req, res)=>{
    const collection = await db.collection('tasks');
    try {
        const query = { _id: new ObjectId(req.params.taskId) };
        const task = await collection.findOne(query);
    
        if (!task) {
          res.status(200).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
      } catch (error) {
        res.status(500).json({ message: 'Error getting the task', error });
      }
})

// create a single task 
router.post('/create/:email', async (req, res)=>{
    const collection = await db.collection('tasks');
    try {
        const newTask = req.body;
        newTask.createdAt = new Date().toISOString();
        newTask.userEmail = req.params.email;
        const task = await collection.insertOne(newTask);
        return res.status(200).json(task);
      } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
      }
})

router.delete('/delete/:taskId', async (req, res)=>{
    const collection = await db.collection('tasks');
    try {
        const query = { _id: new ObjectId(req.params.taskId) };
        await collection.deleteOne(query);
        res.status(200).json({ message: 'Task has been deleted' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
      }
})

// update a task 
router.put('/update/:taskID', async (req, res)=>{
    const collection = await db.collection('tasks');
    try {
        const query = { _id: new ObjectId(req.params.taskID) };
        const data = {
          $set: {
            ...req.body,
            updatedAt: new Date().toISOString(),
          },
        };
        const options = {
          returnDocument: 'after',
        };
        const updatedTask = await collection.findOneAndUpdate(query, data, options);
        res.status(200).json(updatedTask);
      } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
      }
})
export default router;


