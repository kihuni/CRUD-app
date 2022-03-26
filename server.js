const express = require('express');
const bodyParser = require('body-parser')

const app = express();

//urlencoded tells body-parser to extract data from form
// element and add them to the body property in the request 
// object "req.body"
app.use(bodyParser.urlencoded({extended: true}))



app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req,res)=>{
    console.log(req.body)
})

app.listen(3000, function(){
    console.log('listening on port 3000')
})
