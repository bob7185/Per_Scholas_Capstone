import { db } from '../config/dbConnect.js';
import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Show all tasks in a project
router.get('/:projectID', async (req, res) => {
    const collection = await db.collection('tasks');
    const query = { projectId: new ObjectId(req.params.projectID) };
    const result = await collection.find(query).toArray();
    res.status(200).json(result);
});

// Add a new task to a project
router.post('/:projectID/tasks', async (req, res) => {
    const { name, description, priority, status, dueDate, userId } = req.body;
    const collection = await db.collection('tasks');
    const newTask = {
        name,
        description,
        priority,
        status,
        dueDate,
        createdAt: new Date().toISOString(),
        projectId: new ObjectId(req.params.projectID), // Link task to project
        userId: new ObjectId(userId), // Link task to user
    };
    const result = await collection.insertOne(newTask);
    res.status(201).json({ message: 'Task added', taskId: result.insertedId });
});

// Update task information (e.g., status, priority)
router.put('/:taskID', async (req, res) => {
    const { name, description, priority, status, dueDate } = req.body;
    const collection = await db.collection('tasks');
    const query = { _id: new ObjectId(req.params.taskID) };
    const updates = {
        $set: { name, description, priority, status, dueDate },
    };
    const result = await collection.updateOne(query, updates);
    if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task updated' });
});

// Assign a task to a user
router.put('/:taskID/assign/:userID', async (req, res) => {
    const collection = await db.collection('tasks');
    const query = { _id: new ObjectId(req.params.taskID) };
    const updates = { $set: { userId: new ObjectId(req.params.userID) } };  // Assign user to task
    const result = await collection.updateOne(query, updates);
    if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task assigned to user' });
});

// Unassign a task from a user
router.put('/:taskID/unassign', async (req, res) => {
    const collection = await db.collection('tasks');
    const query = { _id: new ObjectId(req.params.taskID) };
    const updates = { $unset: { userId: '' } };  // Unassign user from task
    const result = await collection.updateOne(query, updates);
    if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task unassigned from user' });
});

// Delete a task
router.delete('/:taskID', async (req, res) => {
    const collection = await db.collection('tasks');
    const query = { _id: new ObjectId(req.params.taskID) };
    const result = await collection.deleteOne(query);
    if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted' });
});

export default router;
