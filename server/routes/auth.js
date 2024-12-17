import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../config/dbConnect.js';
const router = express.Router();

//sign up middleware

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
          //console.log('cookie has been sent')
    }catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
})

// sign in middleware
router.post('/signin', async (req, res)=>{
    // get the email and password from request body 
    const {email, password} = req.body;
    const collection  = await db.collection('users');
    try{
        const userExists = await collection.findOne({email});
        if(!userExists){
            return res.status(404).json({ message: 'user not found!'})
        }
        //compare the password with  hashed password in the database
        const validPassword = await bcrypt.compare(password, userExists.password);

        if(!validPassword){
            return res.status(404).json({ message: 'Wrong Password'});
        }
        const token  = jwt.sign({id: userExists._id}, process.env.AUTH_SECRET);
        const { password: pass, createdAt, ...rest } = userExists;
        res
          .cookie('token', token, { httpOnly: true })
          .status(200)
          .json(rest);
    }catch(error){
        res.status(500).json({ message: 'Error logging in', error });
    }
})

//sign out middleware. 
router.get('/signout', async (req, res)=>{
    //clear te cookie and sign out
    try{
        res.clearCookie('token');
        res.status(200).json({message: 'Signed out succesfully!'});
    }catch(error){
        res.status(500).json({ message: 'something went wrong while logging out!', error });
    }
})

export default router