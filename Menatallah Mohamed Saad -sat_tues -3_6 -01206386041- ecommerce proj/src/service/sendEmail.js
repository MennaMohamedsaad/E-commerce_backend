import  nodemailer from "nodemailer";




export const sendEmail= async(to,subject,html)=>{


    const transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",
        // port: 587,
        // secure: false, 
        service: "gmail",
        auth: {
          user: "menamohammed996@gmail.com",
          pass: "jn7jnAPss4f63QBp6D",
        },
      });

        const info = await transporter.sendMail({
          from: '"mena 👻" <menamohammed996@gmail.com>', 
          to: to? to: "",
          subject:subject? subject:"hi ", 
          html: html? html: "hello", 
        });
      
        console.log(info);
        if(info.accepted.length){
            return true
        }
        return false;
}