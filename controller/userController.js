const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator")

const registerUser = async(req, res)=>{
    try {
        const {name, email,password,cpassword, profile} = req.body;

        if(!name || !email || !password || !cpassword){
            return res.status(403).send("Please provide all the fields")
        }
        if(password !== cpassword){
            return res.status(403).send("Passwords didn't match")
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).send("User already exist please login to continue")
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({name, email,password: hashPassword, profile});

        await newUser.save();

        res.status(201).send(newUser)
    } catch (error) {
        res.status(500).send(error)
    }
};

const loginUser = async(req,res)=>{
    try {
        const {email, password} = req.body

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send("user not found please register")
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).send("Invalid Credentials")
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_KEY);

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true,
        });

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error)
    }
};

const updateUser = async(req, res)=>{
    try {
        const id = req.params.id;

        if(req.user._id.toString() !== id){
            return res.status(401).send("Unauthorized Access")
        }

        const user = await User.findByIdAndUpdate(id, {$set: req.body}, {new: true});

        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getUser = async(req, res)=>{
    try {
        const id = req.user.id;
        if(req.user._id.toString() !== id){
            return res.status(401).send("Unauthorized Access")
        }
    
        const user = await User.findById(id);
    
        if(!user){
            return res.status(404).send("no user found with this id")
        }
    
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}

const logoutUser = async(req, res)=>{
    try {
        res.clearCookie("jwt");
        res.status(200).send("User LOgged Out")
    } catch (error) {
        res.status(500).send(error)
    }
}

const generateOtp = async(req, res)=>{
    try {
        const otp =await otpGenerator.generate(6, {lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false});
        req.app.locals.OTP = otp;
        res.status(201).send({code: req.app.locals.OTP})
    } catch (error) {
        res.status(500).send(error)
    }
}

const verifyOtp = async(req,res)=>{
    try {
        const {code} = req.params;

        if(parseInt(req.app.locals.OTP) === parseInt(code)){
            req.app.locals.OTP = null;
            req.app.locals.resetSession = true;
            return res.status(200).send({msg: "Verified Successfully..!"})
        }
        return res.status(400).send({error: "Invalid OTP"})
    } catch (error) {
        res.status(500).send(error)
    }
}

const createResetSession = async(req, res)=>{
    try {
        if(req.app.locals.resetSession === false){
            return res.status(401).send("Session Expired")
        }
        
        console.log(req.app.locals.resetSession);
        res.status(200).send({flag: req.app.locals.resetSession})
    } catch (error) {
        res.status(500).send(error)
    }
}

const resetPassword = async(req, res)=>{
    try {
        if(!req.app.locals.resetSession){
            return res.status(401).send({msg: "Session Expired"})
        }
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send({msg: "User Not Found"})
        }
        const hashPassword = await bcrypt.hash(password, 10);

        user.password = hashPassword;

        await user.save();
        req.app.locals.resetSession = false;

        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {registerUser, loginUser,logoutUser, getUser, updateUser, generateOtp, verifyOtp, createResetSession, resetPassword}