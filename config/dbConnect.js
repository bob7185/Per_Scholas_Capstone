import { MongoClient } from "mongodb";
const {MONGODB_URI, MONGODB_DATABASE} = process.env;

//create a new MongoDb client 
const client =  new MongoClient(MONGODB_URI); 

//attemtting to connect to the cluster 
try{
    await client.connect();
    console.log(`Connected to MongoDB Atlas`)
}catch(e){
    console.error(`Error connecting to Mongo ${e}`);
}
const db = client.db(MONGODB_DATABASE);

//exporting the database to use 
export {db}