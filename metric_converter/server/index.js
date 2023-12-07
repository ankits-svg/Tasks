const express=require("express");
const { metRouter } = require("./routes/metric.routes");
const app=express()
const cors=require("cors");
const { connection } = require("./config/db");
require("dotenv").config()
const port=process.env.port || 9000;

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send({"msg":"Metric converter"})
})

app.use("/met",metRouter)

app.listen(port,async()=>{
    try {
        await connection
        console.log(`Database is connected to server which is running on port ${port}`)
    } catch (error) {
        console.log(`Database is not connected to server which is running on port ${port}`)
    }
    console.log(`Server is connected to ${port}`)
})