var nodemailer = require('nodemailer');

var sendEmail = function(senderEmail, username)
{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'senroxx440@gmail.com', //host email address
               pass: '' //host email password
           },
        tls: {
            rejectUnauthorized: false
        }
        // host: 'smtp.ethereal.email',
        // port: 587,
        // auth: {
        //     user: 'arbdprwhbnaaimua@ethereal.email',
        //     pass: '6kQY6uEWYXHwVx1AFa'
        // },
        // tls: {
        //     rejectUnauthorized: false
        // }
       });
    
    const mailOptions = {
        from: 'sourishkumarmusib@gmail.com', // sender address
        to: senderEmail, // list of receivers
        subject: 'Welcome', // Subject line
        html: `<p>Dear ${username},Welcome to our app</p>`//text body
      };
    
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
}

module.exports = sendEmail;