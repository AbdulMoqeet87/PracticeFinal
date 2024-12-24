import mongoose from "mongoose";
import { Schema } from "mongoose";


const TasksSchema= new Schema({
name:{
    type:String,
    require:true
},
description:{
type:String,
require:true
},
due_date:{
type:String,
require:true

}

})

const UserSchema= new Schema(
{
username:{
    type:String,
    require:true
},
password:{
    type :String,
    require:true
},
Tasks:[TasksSchema]

}) ;
export const User = new mongoose.model("users", UserSchema)
