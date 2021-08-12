const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

// DEFINE MONGOOSE SCHEMA
const contactschema = mongoose.Schema({
    name: String,
    age: Number,
    address: String,
    phonenumber: Number,
    otp: Number
});

const Contact = mongoose.model("Contact", contactschema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    res.status(200).render('home.pug');
})

app.get('/contact', (req, res) =>{
    res.render('contact.pug');
})

app.post('/contact', (req,res)=>{
    const data = new Contact(req.body);
    data.save().then(()=>{
        res.send("Your form has been submitted succesfully");
    }).catch(()=>{
        res.status(404).send("Something Went Wrong")
    })
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
