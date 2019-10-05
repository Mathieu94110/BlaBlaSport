const express = require('express')
const router = express.Router()
const User = require("../model/user").User


router.get('/test', (req, res) => {
    console.log("test")
})

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

module.exports = router;
