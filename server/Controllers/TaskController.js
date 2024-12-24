import {User} from "../Models/UserSchema.js";
import bcrypt from "bcryptjs"


export const AddUser= async(req,res)=>{

    try 
    {

    const {username, password}= req.body;
    if(!username||!password) 
    return res.status(400).send({message: "Invalid username or password"});

    const ExistingUser= await User.findOne({username});
    if(ExistingUser) 
    return  res.status(400).send({message: "User Already Exist"});
    
    const hashed_Pw= await bcrypt.hash(password,12);

    const NewUser = new User({
        username,
        password: hashed_Pw
    })
    NewUser.save();
    return res.status(200).send({message:"New User Created Successfully"});
}
     catch (error)     
    {
        
        res.status(500).send({message:error.message});
    }
}



export const Login= async(req,res)=>{

    try 
    {
        console.log(req.body);
    const {username, password}= req.body;
    if(!username||!password) 
    return res.status(400).send({message: "Invalid username or password"});

    const ExistingUser= await User.findOne({username});
    if(!ExistingUser) 
    return  res.status(400).send({message: "User Don't Exist"});
    
    const IsCorrectPassWord= await bcrypt.compare(password,ExistingUser.password);
    if(!IsCorrectPassWord)
        return  res.status(400).send({message: "Incorrect Password"});
    
    return res.status(200).send({message:"Logged In Successfully"});
}
     catch (error)     
    {
        
        res.status(500).send({message:error.message});
    }
}


export const AddNewTask= async(req,res)=>{
try {
    
const {name,description,due_date}=req.body;

if(!name||!description||!due_date)
    return  res.status(400).send({message: "Invalid Credentials"});

const {username}= req.params;
let _User= await User.findOne({username});

const task= {
name,
description,
due_date    
};

 _User.Tasks.push(task);
 _User.save();
 return res.status(200).send({message:"Done"});


//  _User.updateOne(
//          {
//              $set: {
//                  Tasks:task,
//              }
//          },
//          {}, { new: true }
//      )

//     return res.status(201).json({
//         success: true,
//         message: "product updated sucessfully"
//     })
} 
catch (error) {

    return res.status(400).json({
        success: false,
        message: error.message,
    })

    
}
}




export const GetAllTasks= async(req,res)=>{
    try {
        
    
    const {username}= req.params;
    let _User= await User.findOne({username});
    
        const tasks=_User.Tasks;

     return res.status(200).send({message:"Done",data:tasks});
    
        } 
    catch (error) {
    
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    
        
    }
    }