const mongoose = require('mongoose')

const candidateSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    contact:{type:Number, required:true, unique:true},
    location:{type:String,required:true},
    role:{type:String,required:true}
})

module.exports = mongoose.model('Candidate',candidateSchema)