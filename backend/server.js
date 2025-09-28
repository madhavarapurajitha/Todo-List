const express=require('express');
const cors=require('cors');
const app=express();
const mysql=require('mysql2');
app.use(cors());
app.use(express.json());
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Raji@333',
    database:'todo'
})
db.connect((err)=>{
    if(err){
        console.log("error connecting to the database");
        return
    }
    console.log("connected with database");
})
app.get('/',(req,res)=>{
    console.log("default route");
    //res.send('Hello World')
    db.query('select * from todoItem',(err,result)=>{
        if(err){
            console.log("Error occured",err)
            return
        }
        console.log("Data: ", result);
        res.send(result);
    })
})
app.post('/add-item',(req,res)=>{
    console.log(req.body);
    res.send("added successfully!");
    db.query(`insert into todoItems(itemDescription) values('${req.body.text}')`,(err,results)=>{
        if(err){
            console.log("Error occured",err)
            return
        }
        console.log("Created Successfully")
    })
})
app.put('/edit-item',(req,res)=>{
    console.log('Line 54: ', req.body);
    db.query(`update todoItems set itemDescription="${req.body.itemDescription}" where ID=${req.body.ID};)`,(err,results)=>{
        if(err){
            console.log("Error occured",err)
            return
        }
        console.log("Created Successfully")
    })
    res.send("success");
})
app.listen(3000,()=>{
    console.log("server is running on port 3000");

})

