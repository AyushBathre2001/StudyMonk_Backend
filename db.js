const mongoose = require('mongoose')

const dbConnect = ()=>{
    const con = mongoose.connect(process.env.MONGO_URI)

    if(con){
        console.log("Connected")
    }
    else{
        console.log("Not connected")
    }
}

module.exports = dbConnect