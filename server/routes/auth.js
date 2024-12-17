import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../config/dbConnect.js';

const router = express.Router();

router.post('/signup', async (req, res)=>{
    const collection  = await db.collection('users');
    try{
        const {name, username, email, password} = req.body;
        const query = {
            $or: [ {email}, {username}]
        }

        const userExists = await collection.findOne(query);
        if(userExists){
            return res.status(406).json({ message: 'username or Email already exists',})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            name,
            username, 
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        }
        const { insertedId } = await collection.insertOne(user);
        const token = jwt.sign({ id: insertedId }, process.env.AUTH_SECRET);
        user._id = insertedId;
        const { password: pass, createdAt, ...rest } = user;
        res
          .cookie('token', token, { httpOnly: true })
          .status(200)
          .json(rest);
          console.log('cookie has been sent')
    }catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
})

export default router