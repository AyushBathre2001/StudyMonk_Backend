require('dotenv').config()
const express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors')
const dbConnect = require('./db')
dbConnect()
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 5000

app.use('/api',require('./routes/auth'))
app.use('/api',require('./routes/candidate'))

app.listen(port,()=>{
    console.log("Server is running...",port)
})