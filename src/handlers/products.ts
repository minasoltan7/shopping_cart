import express,{Request,Response} from "express";
import { Product, ProductModel } from "../models/products";
import jwt from "jsonwebtoken"

const products_library = new ProductModel()

// handlers functions

// index function to show al items in our database
const index= async(req:express.Request,res:express.Response)=>{
    const all_products=await products_library.index();
    try{
        res.json(all_products)
    }catch(err){

        res.status(400).send(`cant get products .Error :${err}`)
}
}
// Show function to show a specified book in our database

const show= async(req:express.Request,res:express.Response)=>{
    const id:unknown=req.params.id
    const specified_product=await products_library.show(id as number);
    try{
        res.json(specified_product)
    }catch(err){

        res.status(400).send(`Cant get products with id: ${id} .Error :${err}`)
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

        const product_spec:Product={
            name:req.body.name,
            price: req.body.price,
        }
        const new_product =await products_library.create(product_spec)
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
        const deleted_product =await products_library.destroy(id)
        res.json(deleted_product);
    }catch(err){
        res.status(400).json(err)
    }
}

const products_routes=(app:express.Application)=>{
    app.get("/products",index)
    app.get("/product/:id",show)
    app.post("/newProduct",create)
    app.delete("/delete/:id",destroy)
    }


export default products_routes;
