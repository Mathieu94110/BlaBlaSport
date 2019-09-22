const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const dev = process.env.NODE_DEV !== 'production' //true false
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler() //part of next config
const mongoose = require('mongoose')
const model = require('./model/model.js')
// const db = mongoose.connect('mongodb://localhost:27017/Photos')

nextApp.prepare().then(() => {
    // express code here
    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api/index', require('./routes/index'))
    app.use('/api/magasin', require('./routes/magasin'))
    app.get('*', (req,res) => {
        return handle(req,res) // for all the react stuff
    })


    /*
    model.connect(function (){

      app.listen(PORT, err => {
          if (err) throw err;
          console.log(`ready at http://localhost:${PORT}`)
      })
    });

     */
    app.listen(PORT, err => {
        if (err) throw err;
        console.log(`ready at http://localhost:${PORT}`)
    })

})
