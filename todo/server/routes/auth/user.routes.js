const express=require("express")
const { UserModel } = require("../../models/user.model")
const userRouter=express.Router()

userRouter.post("/signup",async(req,res)=>{
    console.log(req.body)
    const {email,password,company}=req.body;
    try {
        const user=new UserModel({email,password,company})
        await user.save()
        res.send({"msg":"SignUp Successfully","data":user}) 
    } catch (error) {
        res.send({"msg":"Something Error"})
    }
    
})

userRouter.post("/login",async(req,res)=>{
    // console.log(req.body)
    const {email,password}=req.body;
    try {
        const user=await UserModel.find({email:email,password:password})
        if(user.length===0){
            res.status(400).send({"msg":"No such user is present"})
        }else{
        res.send({"msg":"Login Successfull","data":user})
        }
    } catch (error) {
        res.send({"msg":error.message})
    }
})

module.exports={
    userRouter
}