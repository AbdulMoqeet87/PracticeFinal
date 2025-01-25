import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
const app = express(); 
import mongoose from "mongoose";
import  {router } from "./Router/tasksRoute.js";
dotenv.config()

app.use(express.json());

app.use(
    cors()
);
app.use("/User",router);

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected to MongoDB"))
.catch(err=>console.log("Failed connection"))
;

app.listen(process.env.PORT,()=>{
    console.log(`server running on ${process.env.PORT}`)
});