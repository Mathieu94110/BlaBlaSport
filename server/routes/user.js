const express = require('express')
const router = express.Router()
const User = require("../model/user").User

function checkUser(email,password){
    return new Promise ((resolve , reject)=> {
        email= email.toLowerCase();
        User.findOne({email: email}, (err, doc)=>{
            if (err){
                return reject (err, null)
            }
            if (!doc || doc=== false || !doc.validatePassword(password)) {
                return reject ({type:"wrongCredentials", message:"Email ou mot de passe erronné"}, null)
            }
            doc.password = null;
            doc.salt= null
            return resolve({user: doc});
        })
    })

}

// route pour créer un user
router.post("/createUser", (req, res)=>{
    let u = new User()
    u.name = req.body.name
    u.email = req.body.email
    u.password = req.body.password

    u.save().then(user=>{
        // ici c'est quand la requete se passe bien
        user.password = null;
        user.salt = null;
        res.json({
            success: true,
            user: user
        })
    }).catch(err=>{
        // ici c'est quand le user existe deja ou alors ya une erreur d'un autre type
        res.json({
            sucess:false,
            message : "l'utilisateur existe déja"
        })
    })
})

// route pour se logger
router.post("/login", (req, res)=>{
    checkUser(req.body.email , req.body.password).then(data=>{
        let user= data.user;
        res.json({
            success: true,
            user : user
        })
    }).catch(err=>{
        res.json ({
            success : false,
            message : err.message
        })
    })
})

module.exports = router;
