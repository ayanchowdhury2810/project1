const { json } = require('express');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

const cookieParser = require('cookie-parser');              //if a valid user has logged in it will show the about page
router.use(cookieParser())

require('../db/conn');
const User = require("../model/userSchema");

router.get('/',(req, res)=>{
    res.send('home router');
});           

// REGISTER

// USING PROMISES

// router.post('/register', (req, res)=>{
//     const {name, email, phone, work, password, cpassword} = req.body;

//     // console.log(req.body)
//     // res.json({message:req.body});               //to display the entered data in postman(in postman)
//     // res.send('running...')
//     // console.log(name);

//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error:'Fill all the required information'});
//     }

//     User.findOne({email:email})
//         .then((userExist) =>{
//             if(userExist){
//                 return res.status(422).json({error: 'Email already exists'});
//         }
        
//         const user = new User({name, email, phone, work, password, cpassword});

//         user.save().then(()=>{
//             res.status(201).json({message: "user registered"})
//         }).catch((err)=>res.status(500).json({error:"registration failed"}));

//     }).catch(err=>{console.log(err); });

// })


// USING ASYNC AWAIT

router.post('/register', async(req, res)=>{
    const {name, email, phone, work, password, cpassword} = req.body;
    
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:'Fill all the fields properly'});
    }

    try{
        const userExist = await User.findOne({email:email});
        if(userExist){
            return res.status(422).json({error: 'Email already exists'});
        }else if(password != cpassword){
            return res.status(422).json({error: 'Password not matching'});
        }
        else{
            const user = new User({name, email, phone, work, password, cpassword});

            await user.save()

            res.status(201).json({message: 'User registered successfully'});
        }

        // const user = new User({name, email, phone, work, password, cpassword});

        // await user.save()

        // res.status(201).json({message: 'User registered successfully'});
    
    } catch(err){
        console.log(err)
    }

});

// LOGIN ROUTE

router.post("/signin", async(req,res)=>{

    let token;
    // console.log(req.body);
    // res.json({message: "Done"});

    try{
        const {email, password}= req.body;

        if(!email || !password){
            return res.status(400).json({error:'Please fill the form'});
        }

        const userLogin = await User.findOne({email:email});

        // console.log(userLogin)

        if(userLogin){
            // password verification
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);

            // cookies
            
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            });

            if(!isMatch){
                res.status(400).json({message:"Please provide valid email and password"});
            }else{
                res.json({message:"user signin successful"})
            }
        }else{
            res.status(400).json({message:"Please provide valid email and password"});
        }

    }catch(err){
        console.log(err);
    }
})

// ABOUT US
router.get('/about', authenticate,(req, res)=>{           //middleware will ensure that the user has logged in or not (here authenticate is a middleware)
    console.log('about us page');
    res.send(req.rootUser);
}); 

// get user data for contact us and home page
router.get('/getdata', authenticate,(req,res)=>{
    console.log('contact us page');
    res.send(req.rootUser);
});

// CONTACT US
router.post('/contact', authenticate, async(req, res) =>{
    try{
        const {name, email, phone, message} = req.body;

        if(!name || !email || !phone || !message){
            console.log('Error');
            return res.json({error:"Please fill the form"})
        }

        const userContact = await User.findOne({_id:req.userID});

        if(userContact){

            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();

            res.status(201).json({meassage:" message sent successfully"})
        }

    }catch(err){
        console.log(err)
    }
});

// LOGOUT
router.get('/logout', (req, res)=>{
    res.clearCookie('jwtoken', {path: '/'});
    res.status(200).send('Logged out successfully');
}); 

module.exports = router;

