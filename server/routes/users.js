import { ObjectId } from 'mongodb';
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

// DELETE  /users/delete/:userID - Delete a user
router.delete('/delete/:userID', validateToken, async (req, res) => {
    const userID = req.params.userID;
    if (req.user.id !== userID)
    {
        return (
            res.status(403).json({message: 'You can only delete your own account'})
        )
    }
    try {
        const result = await db.collection('users').deleteOne({ _id: new ObjectId(userID) });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

// Put  /users/:userID - Update a user
router.put('/:userID', validateToken, async (req, res)=>{
    const userID = req.params.userID;
    if (req.user.id !== userID)
    {
        return (
            res.status(403).json({message: 'You can only update your own account'})
        )
    }

    const collection = await db.collection('users');
    try{
        //If user asked to update the password. hash the new password 
        if(req.body.password)
        {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const query = { _id: new ObjectId(userID) };
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
