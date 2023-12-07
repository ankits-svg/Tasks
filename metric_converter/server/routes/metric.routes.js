const express=require("express")
const { MetModel } = require("../models/metric.models")
const metRouter=express.Router()
const convert = require('convert-units')


metRouter.post("/",async(req,res)=>{
    console.log(req.body)
    // const {digit,from,to}=req.body
    try {
        const met=new MetModel(req.body)
        // console.log("met:",met)
        await met.save()
        let final=convert(met.digit).from(met.from).to(met.to)
        res.send({"msg":"Data added succesfully","data":final})
        // console.log("met:",met)
        
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
    
})

module.exports={
    metRouter
}