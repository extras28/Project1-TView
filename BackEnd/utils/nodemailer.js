const nodemailer = require('nodemailer');
const sendEmail= async(email,subject,text)=>{
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: true,
            auth: {
                user: "daotrungkien515@gmail.com",
                pass: "nmbpfxjwobrwlgmt",
            },
        });

        await transporter.sendMail({
            from: "dungdtp201@gmail.com",
            to: email,
            subject: subject,
            text:'Your code : '+text 
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
}
module.exports= sendEmail
