
import express from 'express';
import { db } from '../config/dbConnect.js';
import bcrypt from 'bcrypt'


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

// DELETE  /users/delete/:email - Delete a user 
router.delete('/delete/:email', async (req, res) => {
    const userEmail = req.params.email;
    try {
        const result = await db.collection('users').deleteOne({ email: userEmail});
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

// Put  /update/:email - Update a user
router.put('/update/:email', async (req, res)=>{
    const userEmail = req.params.email;
    const collection = await db.collection('users');
    try{
        //If user asked to update the password. hash the new password 
        if(req.body.password)
        {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const query = { email: userEmail };
        const updates = {
            $set: {
                ...req.body,
                updatedAt: new Date().toISOString(),
            },
        }
         await collection.updateOne(query, updates);
        res.status(200).json({ message: 'User updated' });
    }
    catch(error){
        res.status(500).json({ message: 'Error updateing user', error });
    }

})

export default router;
