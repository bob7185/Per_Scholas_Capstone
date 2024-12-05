import { ObjectId } from 'mongodb';
import express from 'express';
import { db } from '../config/dbConnect.js';

const router = express.Router();

// POST /users - Create a new user with basic validation
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    // Basic validation for required fields
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    try {
        const collection = await db.collection('users');
        const result = await collection.insertOne({
            name,
            email,
            password,  
            createdAt: new Date(),
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// DELETE /users/:userID - Delete a user
router.delete('/:userID', async (req, res) => {
    const userID = req.params.userID;

    // Validate ObjectId
    if (!ObjectId.isValid(userID)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const result = await db.collection('users').deleteOne({ _id: new ObjectId(userID) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

export default router;
