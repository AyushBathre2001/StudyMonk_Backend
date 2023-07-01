const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//signup
router.post('/user/signup',async(req,res)=>{
    try {

        if (req.method == 'POST') {
            const { firstname,lastname, email,company,contact, password } = req.body
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const user = new userModel({
              firstname,lastname,email,company,contact, password: hash
            });
            await user.save();
            res.status(200).json({ "Success": true });
          } else {
            res.send("Bad request!");
          }
        
    } catch (error) {
        res.status(500).json({"message":"Internal server error","error":error})
    }
})


//login
router.post('/user/login',async(req,res)=>{
    try {
        if(req.method == 'POST'){
            const {email,password} = req.body
            const user = await userModel.findOne({"email":email})
            const pass = bcrypt.compareSync(password, user.password); 
            if(user){
                if(user.email == email && pass ){
                  var token = jwt.sign({data:user}, process.env.JWT_SECRET ,{expiresIn:"4d"});
                  res.status(200).json({"Success":true,"Token":token})
                }
                else{
                    res.status(404).json({"Success":false,"Message":"Invalid credentials!"})
                }
            }
            else{
                res.status(404).json({"Success":false,"Message":"Invalid credentials!"})
            }
          
        }
        else{
            res.send("Bad request!")
        }

        
    } catch (error) {
        console.log(error)
        res.status(500).json({"message":"Internal server error","error":error})
    }
})

module.exports = router