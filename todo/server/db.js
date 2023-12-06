const mongoose=require("mongoose")
require("dotenv").config()

const Connection=mongoose.connect(process.env.mongo)

module.exports={
    Connection
}