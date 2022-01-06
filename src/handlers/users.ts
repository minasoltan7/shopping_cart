import { User,UserModel } from "../models/users";
import express from "express";
import jwt from "jsonwebtoken";

const app:Express.Application =express()

const newUser= new UserModel()

 const createUser=async (req:express.Request,res:express.Response)=>{

    try{
        const user:User={
            username:req.body.username,
            password:req.body.password
        }
        const userCreated =await newUser.create(user)
        const token = jwt.sign({user:userCreated},process.env.TOKEN_SECRET as string)
        res.json(token)
        
    }catch(err){
        throw new Error(`Couldnt create user ${err}`)
    }
}

const autheticateUser=async (req:express.Request,res:express.Response)=>{
    
    try{
        const username:string=req.body.username;
        const password:string=req.body.password;

        const passAuthenticate =await newUser.authenticate(username,password)
        const token = jwt.sign({user:passAuthenticate},process.env.TOKEN_SECRET as string)
        res.json(token)
        
    }catch(err){
        throw new Error(`Couldnt cauthenticate ${err}`)
    }
}


const users_routes=(app:express.Application)=>{
    app.post("/createUser",createUser)
    app.post("/authenticate",autheticateUser)
}

export default users_routes;
