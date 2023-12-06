const express=require("express")
const app=express()
const port=4000;

app.get("/",(req,res)=>{
    res.send({"msg":"Todo application"})
})

app.listen(port,()=>{
    console.log(`Server is connected to ${port}`)
})