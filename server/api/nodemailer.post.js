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
    // console.log("Message sent: %s", info.messageId);
    // let info = await transporter.sendMail(x)  
    // return info
    return await transporter.sendMail(x)
  } 
  
  export default defineEventHandler(async (event) => {
    // const body = await readBody(event)
    await emailer(await readBody(event))
    // const info = await emailer(body)
    // console.log(info);
    return {status: 'email sent'}
    // return {body}
}) 

  // async..await is not allowed in global scope, must use a wrapper
