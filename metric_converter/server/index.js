const express=require("express")
const app=express()
require("dotenv").config()
const port=process.env.port || 9000;


app.get("/",(req,res)=>{
    res.send({"msg":"Metric converter"})
})

app.listen(port,()=>{
    console.log(`Server is connected to ${port}`)
})