const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// for securing key and portnumber (in config.env)
dotenv.config({path:'./config.env'});
require('./db/conn.js')
// const user = require('../model/userSchema.js');

app.use(express.json())     //json data will be converted into object and displayed (middleware)

// linking router files to make route easy
app.use(require('./route/auth'))

const PORT = process.env.PORT;

// ------------------------------NOT NEEDED AFTER CONNECTING FRONTEND AND BACKEND------------------------------
// Middleware

// const middleware = (req, res, next) =>{
//     console.log('middleware');
//     next();
// }

 //home page
// app.get('/',(req, res)=>{
//     res.send('home');
// });                                 
// --------------------------------------------------------------------------------------------------------------

// about page

// app.get('/about',middleware,(req, res)=>{           //middleware will ensure that the user has logged in or not
//     res.send('about');
// }); 

// app.get('/about',(req, res)=>{           
//     res.send('about');
// }); 

// contact page
// app.get('/contact',(req, res)=>{
//     res.cookie('Test','ayan');
//     res.send('contact');
// }); 

// sign in page
// app.get('/signin',(req, res)=>{
//     res.send('sign in');
// }); 

// sign up page
app.get('/signup',(req, res)=>{
    res.send('sign up');
}); 

app.listen(PORT, ()=>{
    console.log(`running at ${PORT}...`)
})

// mongodb+srv://ayan:<password>@cluster0.zore0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

