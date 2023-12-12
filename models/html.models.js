const mongoose=require("mongoose")

const htmlSchema=mongoose.Schema({
    name: String,
    course: String,
    date: { type: Date, default: Date.now },
    linkedin: String,

})

const HtmlModel=mongoose.model("html",htmlSchema)

module.exports={
    HtmlModel
}