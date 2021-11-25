const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// defining structure of document
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true
    },

    phone:{
        type: Number,
        required: true,
    },

    work: {
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },
    
    cpassword:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

    messages: [
        {
            name:{
                type: String,
                required: true,
            },
        
            email:{
                type: String,
                required: true
            },
        
            phone:{
                type: Number,
                required: true,
            },
        
            message: {
                type: String,
                required: true
            },
         
        }
    ],

    tokens:[
        {
            token:{
                type: String,
                reuired: true
            }
        }
    ]
})


// hashing the password

userSchema.pre('save', async function(next){
    // console.log('userSchema');
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }

    next();
});


// generating token

userSchema.methods.generateAuthToken = async function(){
    try{

        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);       //token generated
        this.tokens = this.tokens.concat({token:token});                    //token added
        await this.save();
        return token;s

    }catch(err){
        console.log(err);
    }
}

// storing message

userSchema.methods.addMessage = async function( name, email, phone, message) {
    try{
        this.messages = this.messages.concat({name, email, phone, message});
        await this.save();
        return this.messages;
    }catch(err){
        console.log(err);
    }
}

// creating collections

const User = mongoose.model('USER', userSchema);

// this part can be required in many folders so it is exported from here for easily accessing it
module.exports = User