const express = require('express')
const router = express.Router()
const candidateModel = require('../models/candidateModel')


//create candidates
router.post('/create/candidate',async(req,res)=>{
    try {
        if(req.method == 'POST'){

            const {candidates} = req.body
            candidates.forEach(async (item) => {
                const candidate = new candidateModel({
                    name:item.name,
                    email:item.email,
                    contact:item.contact,
                    location:item.location,
                    role:item.role
                })
                await candidate.save()
            });

            res.json({"success":true})
            

        }else{
            res.send("Bad request!")
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error!")
    }
})



//fetch candidates
router.get('/fetch/candidates',async(req,res)=>{
    try {

        const candidates = await candidateModel.find()
        res.json({"success":true, candidates})
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error!")
    }
})



//search candidates
router.post('/search/candidates', async(req,res)=>{
    try {
        if(req.method == "POST"){

            if(req.body.location && req.body.role){
                let regexp1 = new RegExp("^"+ req.body.location);
                let regexp2 = new RegExp("^"+ req.body.role);
                const items = await candidateModel.find({location:regexp1,role:regexp2})  
                res.json({"items":items})
            }
            else if(req.body.location && !req.body.role){
                let regexp = new RegExp("^"+ req.body.location);
                const items = await candidateModel.find({location:regexp})
                res.json({"items":items})
            }
            else if(req.body.role && !req.body.location){
                let regexp = new RegExp("^"+ req.body.role);
                const items = await candidateModel.find({role:regexp})  
                res.json({"items":items})
            }
          
        }
        else{
            res.send("Bad request!")
        }
        
    } catch (error) {
        res.status(500).send("Internal server error!")
    }
})

module.exports = router