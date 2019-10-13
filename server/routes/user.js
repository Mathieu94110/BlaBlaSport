const express = require('express')
const router = express.Router()
const User = require("../model/user").User



// route pour créer un user
router.post("/createUser", (req, res)=>{
    let u = new User()
    u.name = req.body.name
    u.email = req.body.email
    u.password = req.body.password

    u.save().then(user=>{
        res.send(user)
    })
})

// route pour se logger
router.post("/login", (req, res)=>{
    User.findOne({email: req.body.email, password: req.body.password}, (err, user)=>{
        if(user == null){
            res.send("Mdp ou email invalides")
        }else{
            res.send(user)
        }
    })
})

module.exports = router;
