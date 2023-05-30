const nodemailer = require("nodemailer");
const mailGen = require("mailgen");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: process.env.ETHEREAL_EMAIL,
        pass: process.env.ETHEREAL_PASSWORD
    }
});

const MailGenerator = new mailGen({
    theme: "salted",
    product:{
        name: "Mailgen",
        link: "https://mailgen.js/"
    }
})

const registerMail = async(req, res) =>{
    try {
        const {name, userEmail, text, subject} = req.body;
        console.log(name);

        let email = {
            body:{
                name: name,
                intro: text || "Welcome Sir...!",
                outro: "Need Help Or have any questions? ask here"
            }
        }

        let emailBody = MailGenerator.generate(email);

        let message = {
            from : process.env.ETHEREAL_EMAIL,
            to: userEmail,
            html: emailBody,
            subject: subject || "Signup Successfull...!",
        }

        const response = await transporter.sendMail(message);
        res.status(200).send({msg: "You have recived an email from us ..!"})

    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = registerMail;