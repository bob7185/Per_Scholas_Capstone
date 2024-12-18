import { ObjectId } from 'mongodb';
import express from 'express';
import { db } from '../config/dbConnect.js';

const router = express.Router();

// Show all users
router.get('/', async (req, res) => {
   const collection = await db.collection('users');
   const result = await collection.find({}).toArray();
   res.status(200).json(result);
});

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
            createdAt: new Date().toISOString(),
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// middleware that will check the token parsed by cookie-parser, 
const validateToken = (req, res, next)=>{
    const token = req.cookies.token;
    // if req body doesn't have a token it means user is not authenticated
    if(!token){
        return next({status: 400, message: 'Unauthorized' });
    } 
    //decrypt token in the request body 
    jwt.verify(token, process.env.AUTH_SECRET, (err, user) =>{
        if (err)
        {
            return  next({status: 402, message: 'Forbidden'});
        }
        req.user = user;
        next();
    });
}


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
