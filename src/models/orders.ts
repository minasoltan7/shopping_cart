import Client from "../database";

export type Order= {
    readonly id?:number,
    status:string,
    user_id:string,
}

export type Order_Products={
    quantiy:string,
    product_id:number,
    order_id:number
}

// books (plural) table in the database, but the book (singular) file for the model?
//  That's because the database table will hold many books, but the model file is defining what a book is for our application. 
// The model is represented as a class, each book row in the database will be an instance of the book model. 
export class OrderModel {
    async index(): Promise<Order[]> {
        try {
          const conn = await Client.connect()
          const sql = 'SELECT * FROM orders'
          const result = await conn.query(sql)
          conn.release()
          return result.rows 
        } catch (err) {
          throw new Error(`Could not get orders. Error: ${err}`)
        }
      }
    
    async show(id:number):Promise <Order[]>{
        try{

            const conn=await Client.connect();
            // the $1 refer to the first argument in the array of argument(s) we pass in the .query() method in line 28
            const sql='SELECT * FROM orders WHERE id=($1)';
            const result =await conn.query(sql,[id]);
            conn.release();
            // returning first row in the order table
            return result.rows[0]
        }catch(err){
            throw new Error(`Cant get Order with id=${id}.Error:${err}`)
        }
    }
    async create(o:Order):Promise <Order[]>{
        try{

            const conn=await Client.connect();
            // the $1,$2,$3,$4,$5 refer to the arguments number in the array of argument(s) we pass in the .query() method in line 28
            // The RETURNING keyword in PostgreSQL gives an opportunity to return from the insert or update statement the values of any columns after the insert or update was run. 
            const sql='INSERT INTO orders (status,user_id) VALUES ($1,$2) RETURNING*';
            const result =await conn.query(sql,[o.status,o.user_id]);
            conn.release();
            // returning the row of the book we created
            console.log(result.rows[0])
            return result.rows[0]
        }catch(err){
            throw new Error(`Can't create new order. Error ${err}`)
    
        }
    }
    async destroy(id:number):Promise <Order[]>{
        try{

            const conn=await Client.connect();
            // the $1, refer to the first argument in the array of argument(s) we pass in the .query() method in line 28
            // The RETURNING keyword in PostgreSQL gives an opportunity to return from the insert or update statement the values of any columns after the insert or update was run. 
            const sql='DELETE FROM orders WHERE id=($1) RETURNING *';
            const result =await conn.query(sql,[id]);
            conn.release();
            console.log(result.rows[0])
            return result.rows[0]
        }catch(err){
            throw new Error(`Can't delete order with id=${id}. Error ${err}`)
    
        }
    }
    async addProduct(quantiy:number,order_id:number,product_id:number):Promise<Order[]>{
        try{

            const conn=await Client.connect();
            const sql='INSERT INTO order_products (quantity,order_id,product_id) VALUES($1,$2,$3) RETURNING *'
            const result =await conn.query(sql,[quantiy,order_id,product_id])
            conn.release()
            return result.rows[0]
        }catch(err){
            throw new Error(`Could not add product ${product_id} to order ${order_id}: ${err}`)
        }
    }
    
}


