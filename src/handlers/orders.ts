import express,{Request,Response} from "express";
import { Order, OrderModel } from "../models/orders";
import jwt from "jsonwebtoken"
import Client from "../database";

const orders_library = new OrderModel()

// handlers functions

// index function to show al items in our database
const index= async(req:express.Request,res:express.Response)=>{
    const all_orders=await orders_library.index();
    try{
        res.json(all_orders)
    }catch(err){

        res.status(400).send(`cant get oders .Error :${err}`)
}
}
// Show function to show a specified book in our database

const show= async(req:express.Request,res:express.Response)=>{
    const id:unknown=req.params.id
    const specified_order=await orders_library.show(id as number);
    try{
        res.json(specified_order)
    }catch(err){

        res.status(400).send(`Cant get order with id: ${id} .Error :${err}`)
}
}

const create =async(req:express.Request,res:express.Response)=>{
// Validating User token 
    try{
        const authorizationHeader:unknown=req.headers.authorization;
        const token=(authorizationHeader as string).split(" ")[1]
        jwt.verify(token,process.env.TOKEN_SECRET as string)
    }catch(err){
        res.status(401)
        res.json("Access denied ,invalid Token ")
        // we must use "return " to exit the function when the token is not valid
        return
    }

    try{

        const order_spec:Order={
            status:req.body.status,
            user_id:req.body.user_id,
        }
        const new_order =await orders_library.create(order_spec)
        res.json();
    }catch(err){
        res.status(400).json(err)
    }
}

const destroy =async(req:express.Request,res:express.Response)=>{
    // Validatin user token
    try{
        const authorizationHeader:unknown=req.headers.authorization;
        const token=(authorizationHeader as string).split(" ")[1];
        jwt.verify(token,process.env.TOKEN_SECRET as string)
        
    }catch(err){
        res.status(401)
        res.json("Access denied . Token is invalid")
        // we must use "return " to exit the function when the token is not valid
        return
    }

    try{
        const id=parseInt(req.params.id);
        const deleted_order =await orders_library.destroy(id)
        res.json(deleted_order);
    }catch(err){
        res.status(400).json(err)
    }
}

const addProduct=async (req:express.Request,res:express.Response)=>{
    try{
        const quantity=req.body.quantity;
        const order_id=parseInt(req.params.id)
        const product_id=req.body.product_id
        const newOrderProducts=await orders_library.addProduct(quantity,order_id,product_id)
        res.json(newOrderProducts)
    }catch(err){
        res.status(400).json(`Cant add new order_product .Err ${err}`)
    }
}

const orders_routes=(app:express.Application)=>{
    app.get("/orders",index)
    app.get("/order/:id",show)
    app.post("/newOrder",create)
    app.delete("/delete/:id",destroy)
    app.post('/order/:id/products',addProduct)
    }


export default orders_routes;
