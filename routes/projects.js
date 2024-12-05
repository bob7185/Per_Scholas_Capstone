import { db } from '../config/dbConnect.js';
import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Show all projects
router.get('/', async (req, res) => {
    const collection = await db.collection('projects');
    const result = await collection.find({}).toArray();
    res.status(200).json(result);
});

// Add a new project
router.post('/', async (req, res) => {
    const { projectName, description, startDate, endDate, userId } = req.body;
    const collection = await db.collection('projects');
    const newProject = {
        projectName,
        description,
        startDate,
        endDate,
        createdAt: new Date(),
        userId: new ObjectId(userId),
    };
    const result = await collection.insertOne(newProject);
    res.status(201).json({ message: 'Project added', projectId: result.insertedId });
});

// Update project information
router.put('/:projectID', async (req, res) => {
    const { projectName, description, startDate, endDate, status } = req.body;
    const collection = await db.collection('projects');
    const query = { _id: new ObjectId(req.params.projectID) };
    const updates = {
        $set: { projectName, description, startDate, endDate, status },
    };
    const result = await collection.updateOne(query, updates);
    if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project updated' });
});

// Delete a project
router.delete('/:projectID', async (req, res) => {
    const collection = await db.collection('projects');
    const query = { _id: new ObjectId(req.params.projectID) };
    const result = await collection.deleteOne(query);
    if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted' });
});

export default router;
