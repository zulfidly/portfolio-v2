import nodemailer from 'nodemailer'

async function emailer(x) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, 
        pass: process.env.PASSWORD,  
      },
    }); 
    let info = await transporter.sendMail(x)  
    console.log("Message sent: %s", info.messageId);
    return info
    // console.log("Message sent: %s", info);
  } 
  
  export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const info = await emailer(body)
    // console.log(info);
    return {body}
}) 

  // async..await is not allowed in global scope, must use a wrapper
