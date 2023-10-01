import nodemailer from "nodemailer"

async function emailer(x) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  })
  return await transporter.sendMail(x)
}

export default defineEventHandler(async(eventObj) => {
  let temp = await readBody(eventObj)
  let htmlString = temp.html
    .replace(/&#..;/g, (unicodehtml)=> convertUnicodeToChar(unicodehtml))
    .replace(/&#...;/g, (htmlunicode)=> convertUnicodeToChar(htmlunicode))
    .replace(/<script>/g, '<p style="color:red;">')
    .replace(/<\/script>/g, '</p>')

  function convertUnicodeToChar(str) {
    const unicodeDec = str.replace(/[&#;]/g, '')
    return String.fromCharCode(unicodeDec)
  }

  temp.html = htmlString
  await emailer(temp)
  // console.log(await readBody(event));
  return { status: "email sent" }
})
// async..await is not allowed in global scope, must use a wrapper