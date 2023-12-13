const mongoose=require("mongoose")

const pSchema=mongoose.Schema({
    name: String,
    course: String,
    type:String,
    date: { type: Date, default: Date.now },
    linkedin: String,

})

const HtmlModel=mongoose.model("p",pSchema)

module.exports={
    HtmlModel
}