import nodemailer from "nodemailer";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.USER_APP_EMAIL,
    pass: process.env.USER_APP_PASSWORD,
  },
});

// Function to send email
const sendEmail = async (to, subject, text, html, attachments) => {
  try {
    const mailOptions = {
      from: {
        name: "E-commerce",
        address: process.env.USER_APP_EMAIL,
      },
      to: to,
      subject: subject,
      text: text,
      html: html,
      attachments: attachments || [],
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
