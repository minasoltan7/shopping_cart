import express ,{Request,Response} from "express" ;
import cors from "cors";
import bodyParser from "body-parser"
import orders_routes from "./handlers/orders";
import users_routes from "./handlers/users";
import products_routes from "./handlers/products";
import dashboardRoutes from "./handlers/services";

const app =express()
app.use(bodyParser.json())


app.get("/",(req:express.Request,res:express.Response)=>{
    res.send("Our main route is working")
})


orders_routes(app)
users_routes(app)
products_routes(app)
dashboardRoutes(app)

app.listen(process.env.HOST,()=>{
console.log(`App is running on port ${process.env.HOST}`)
    })


