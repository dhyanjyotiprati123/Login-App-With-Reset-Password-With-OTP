const express = require("express");
const verifyJwtToken = require("../middleware/verifyJwt");
const localVariables = require("../middleware/lovalVariable");

const router = express.Router();

const {registerUser, loginUser, getUser, updateUser, generateOtp, verifyOtp, createResetSession, resetPassword, logoutUser} = require("../controller/userController");
const registerMail = require("../controller/mailer");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/mail", registerMail);

router.get("/user",verifyJwtToken, getUser);

router.get("/otp",localVariables, generateOtp);

router.get("/otp/verify/:code", verifyOtp);

router.get("/createsession", createResetSession);

router.get("/logout", verifyJwtToken, logoutUser);

router.patch("/update/:id", verifyJwtToken, updateUser);

router.patch("/password/reset", resetPassword);

module.exports = router;

