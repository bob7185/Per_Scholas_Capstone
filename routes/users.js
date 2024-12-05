import { db } from '../config/dbConnect.js'
import express from 'express'

 const router =  express.Router()

//show the users in database 
 router.get('/', async (req, res)=>{
    let collection = await db.collection('users');
    let result = await collection.find({}).toArray();
    res.send(result)
 });

// //create  anew user
// router.post('/', sync(req, res)=>{

// })



export  default router;