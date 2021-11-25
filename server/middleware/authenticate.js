const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const  Authenticate = async(req, res, next ) =>{
    try{
        const token = req.cookies.jwtoken;                                      //storing the token recieved in a variable
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);           //verifying

        const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token": token});      //recieving all the info of the user whom the token belongs

        // verifying whether the token recieved belongs to any user or not
        if(!rootUser) {throw new Error('User not found')}

        // filling all the details if token belongs to any user
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    }catch(err){
        res.status(401).send('Unauthorized: No token provided')
        console.log(err);
    }
}

module.exports = Authenticate;