const mongoose=require("mongoose")

const metSchema=mongoose.Schema({
    "digit":Number,
    "from":String,
    "to":String
})

const MetModel=mongoose.model('met',metSchema)

module.exports={
    MetModel
}