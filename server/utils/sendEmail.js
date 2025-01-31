const nodemail = require("nodemailer");
const {senderEmail , emailPassword} = require("../config/kyes");
const sendEmail = async({emailTo , subject, code , content})=>{
    const transporter = nodemail.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth: {
            user : senderEmail,
            pass : emailPassword,
        }
    });
    const message = {
        to : emailTo,
        subject ,
        html : `
          <div>
            <h1>Use this below Code to ${content}</h1>
            <p><strong>Code :  </strong> ${code}</p>
          </div>
        `,
    }
    await transporter.sendMail(message)
};
module.exports = sendEmail;
