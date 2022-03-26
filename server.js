const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

require('dotenv').config()



const app = express();


MongoClient.connect(process.env.SECRET_KEY, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('CRUD-app-quotes')
    const quotesCollection = db.collection('quotes')
    app.set('view engine', 'ejs')
     
    //this tells express to make public folder accessible 
    // to the public
    app.use(express.static('public'))

    //urlencoded tells body-parser to extract data from form
// element and add them to the body property in the request 
// object "req.body"
    app.use(bodyParser.json())

    //app.get('/', (req,res) =>{
        //res.sendFile(__dirname + '/index.html')
   // })
    
    app.get('/',(req,res) =>{
    db.collection('quotes').find().toArray()
    .then(results =>{
        res.render('index.ejs', {quotes: results})
    })
    .catch(error => console.error(error))
    
        
    })

    //Creating
    app.post('/quotes', (req,res)=>{
        quotesCollection.insertOne(req.body)
        .then(result =>{
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })

     //updating
    app.put('/quotes', (req, res) =>{
        quotesCollection.findOneAndUpdate(
           {name: 'stephen'},
           {
               $set: {
                   name: req.body.name,
                   quote: req.body.quote
               }
           },
           {
            upsert: true

           }
          )
          .then(result => {
             res.json('Success')
          })
          .catch(error => console.error(error))
        
    })

    app.delete('/quotes', (req, res) =>{
     quotesCollection.deleteOne(
         {name: req.body.name },

     )   
     .then(result =>{
         res.json('deleted stephen quote')
     })
     .catch(error => console.error(error))
    })
    
    app.listen(3000, function(){
        console.log('listening on port 3000')
    })
    
  })
  .catch(error => console.error(error))

