import bcrypt from "bcrypt";
import Client from "../database";
import users_routes from "../handlers/users";

const{SALT_ROUNDS,BCRYPT_PASSWORD}=process.env

export type User ={
    username:string,
    password:string
}

export class UserModel{

    async create(u:User):Promise<User[]>{
        const conn= await Client.connect();
        const sql= "INSERT INTO users (username,password_digest) VALUES ($1,$2)" 
        const hash =bcrypt.hashSync(u.password+BCRYPT_PASSWORD ,parseInt(SALT_ROUNDS as string) )
        const result = await conn.query(sql,[u.username,hash]);
        conn.release()
        return result.rows[0]
    }

    async authenticate (username:string,password:string):Promise<User[]|null>{
        try{
            
            const conn= await Client.connect();
            const sql="SELECT password_digest From users WHERE name=($1)"
            const result=await conn.query(sql,[username])
            // checking if user exists
            if (result.rows.length){
                const user=result.rows[0]
                if(bcrypt.compareSync(password+BCRYPT_PASSWORD,user.password_digest)){
                    return user
                }
            }
            return null
        }catch(err){
            throw new Error(`Cant authenticate. Error ${err}`)
         }
    }
}