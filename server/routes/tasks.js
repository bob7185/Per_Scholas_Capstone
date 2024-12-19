import { db } from '../config/dbConnect.js';
import express, { Router } from 'express';
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
        console.log('error')
      }
})

// get a single task
router.get('/user/:taskId', async (req, res)=>{
    const collection = await db.collection('tasks');
    console.log(req.params.taskId)
    try {
        const query = { _id: new ObjectId(req.params.taskId) };
        const task = await collection.findOne(query);
    
        if (!task) {
          res.status(200).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
      } catch (error) {
        console.log('error getting task')
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
         console.log('error doing creating taks ops')
      }
})

router.delete('/delete/:taskId', async (req, res)=>{
    const collection = await db.collection('tasks');
    try {
        const query = { _id: new ObjectId(req.params.taskId) };
        await collection.deleteOne(query);
        res.status(200).json({ message: 'Task has been deleted' });
      } catch (error) {
        console.log('error deleting task')
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
        console.log('error updating task')
      }
})

// router.get('/:projectID', async (req, res) => {
//     const collection = await db.collection('tasks');
//     const query = { projectId: new ObjectId(req.params.projectID) };
//     const result = await collection.find(query).toArray();
//     res.status(200).json(result);
// });

// // Add a new task to a project
// router.post('/:projectID/tasks', async (req, res) => {
//     const { name, description, priority, status, dueDate, userId } = req.body;
//     const collection = await db.collection('tasks');
//     const newTask = {
//         name,
//         description,
//         priority,
//         status,
//         dueDate,
//         createdAt: new Date().toISOString(),
//         projectId: new ObjectId(req.params.projectID), // Link task to project
//         userId: new ObjectId(userId), // Link task to user
//     };
//     const result = await collection.insertOne(newTask);
//     res.status(201).json({ message: 'Task added', taskId: result.insertedId });
// });

// // Update task information (e.g., status, priority)
// router.put('/:taskID', async (req, res) => {
//     const { name, description, priority, status, dueDate } = req.body;
//     const collection = await db.collection('tasks');
//     const query = { _id: new ObjectId(req.params.taskID) };
//     const updates = {
//         $set: { name, description, priority, status, dueDate },
//     };
//     const result = await collection.updateOne(query, updates);
//     if (result.matchedCount === 0) {
//         return res.status(404).json({ message: 'Task not found' });
//     }
//     res.status(200).json({ message: 'Task updated' });
// });

// // Assign a task to a user
// router.put('/:taskID/assign/:userID', async (req, res) => {
//     const collection = await db.collection('tasks');
//     const query = { _id: new ObjectId(req.params.taskID) };
//     const updates = { $set: { userId: new ObjectId(req.params.userID) } };  // Assign user to task
//     const result = await collection.updateOne(query, updates);
//     if (result.matchedCount === 0) {
//         return res.status(404).json({ message: 'Task not found' });
//     }
//     res.status(200).json({ message: 'Task assigned to user' });
// });

// // Unassign a task from a user
// router.put('/:taskID/unassign', async (req, res) => {
//     const collection = await db.collection('tasks');
//     const query = { _id: new ObjectId(req.params.taskID) };
//     const updates = { $unset: { userId: '' } };  // Unassign user from task
//     const result = await collection.updateOne(query, updates);
//     if (result.matchedCount === 0) {
//         return res.status(404).json({ message: 'Task not found' });
//     }
//     res.status(200).json({ message: 'Task unassigned from user' });
// });

// // get all tasks by a user 
// router.get('', async (req,res)=>{

// })

// // Delete a task
// router.delete('/:taskID', async (req, res) => {
//     const collection = await db.collection('tasks');
//     const query = { _id: new ObjectId(req.params.taskID) };
//     const result = await collection.deleteOne(query);
//     if (result.deletedCount === 0) {
//         return res.status(404).json({ message: 'Task not found' });
//     }
//     res.status(200).json({ message: 'Task deleted' });
// });
export default router;


