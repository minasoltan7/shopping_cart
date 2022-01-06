import dotenv from "dotenv";
import {Pool} from "pg";

dotenv.config();
let Client!:Pool;

const {
    POSTGRES_HOST,
    POSTGRES_DATABASE,
    POSTGRES_DATABASE_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    
}=process.env


if(process.env.ENV==='dev'){
Client =new Pool({
    host:POSTGRES_HOST,
    database:POSTGRES_DATABASE,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD,
})
}

if(process.env.ENV==='test'){
    Client =new Pool({
        host:POSTGRES_HOST,
        database:POSTGRES_DATABASE_TEST,
        user:POSTGRES_USER,
        password:POSTGRES_PASSWORD,
    })
    }
    

export default Client

console.log(POSTGRES_DATABASE,POSTGRES_DATABASE_TEST,POSTGRES_HOST,POSTGRES_USER)