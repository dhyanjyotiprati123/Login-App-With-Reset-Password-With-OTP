const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const verifyJwtToken = async(req, res, next)=>{
    try {
        const token = req.cookies.jwt;

        const verifyJwt = jwt.verify(token, process.env.JWT_KEY);

        const user = await User.findOne({_id: verifyJwt.id});

        if(!user){
            return res.status(404).send("Invalid Token");
        }
    
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send("please authinticate")
    }
}

module.exports = verifyJwtToken;