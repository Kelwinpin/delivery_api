const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

async function sendEmail(to, subject, text, html) {
  const mailOptions = {
    from: '"Sistema de Entrega" <sistemadeenvioautomatico2@gmail.com>',
    to,
    subject,
    text,
    html,
  };

  // Send the email
  await transporter.sendMail(mailOptions).then(
    (info) => {
        transporter.close();
        return info;
    },
    (error) => {
      console.error('Error sending email:', error);
    },
  );
}

module.exports = {
  sendEmail,
};