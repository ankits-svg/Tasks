const express=require("express")
const { TodoModel } = require("../../models/todo/todo.model")

const todoRouter=express.Router()

todoRouter.get("/read",async(req,res)=>{
    // console.log(req)
    try {
        const todo=await TodoModel.find()
        res.status(200).send({"msg":"Your Todo List Here","Data":todo})
    } catch (error) {
        console.log("read error")
        res.status(500).send({"msg":"Some error has occured in reading"})
    }
})

todoRouter.post("/add",async(req,res)=>{
    // console.log(req.body)
    try {
        const todo=new TodoModel(req.body)
        await todo.save(); 
        console.log(todo)
        res.status(200).send({"msg":"Data added sucessfully","Data":todo})
    } catch (error) {
        console.log("added error")
        res.status(500).send({"msg":"Some error has occured in adding"})
    }
})

todoRouter.patch("/update/:id",async(req,res)=>{
    try {
        const todo = await TodoModel.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        res.status(200).send({"msg":"Update data","Data":todo});
      } catch (error) {
        res.status(400).send(error);
      }
})

todoRouter.delete("/delete/:id",async(req,res)=>{
    try {
        const todo = await TodoModel.findByIdAndDelete(req.params.id);
        res.status(200).send({"msg":"Delete Data","Data":todo});
      } catch (error) {
        res.status(500).send(error);
      }
})

module.exports={
    todoRouter
}