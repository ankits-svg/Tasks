const express=require("express");
const { todoRouter } = require("./routes/todo/todo.routes");
const { Connection } = require("./db");
const app=express()
require("dotenv").config()
const port=process.env.port || 4000;

app.use(express.json())
app.get("/",(req,res)=>{
    res.send({"msg":"Todo application"})
})

app.use("/app",todoRouter)


app.listen(port,async()=>{
    try {
        await Connection
        console.log(`Mongodb database is connected to server i.e index.js`)
    } catch (error) {
        console.log(`Mongodb database is not connected to server i.e index.js`)
    }
    console.log(`Server is connected to ${port}`)
})