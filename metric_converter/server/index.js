const express=require("express");
const { metRouter } = require("./routes/metric.routes");
const app=express()
const cors=require("cors")
require("dotenv").config()
const port=process.env.port || 9000;

app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send({"msg":"Metric converter"})
})

app.use("/met",metRouter)

app.listen(port,()=>{
    console.log(`Server is connected to ${port}`)
})