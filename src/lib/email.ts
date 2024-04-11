import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export async function sendVerificationCode(to: string, code: string) {
  console.log("Email sent");
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: to,
    subject: "Código de verificação",
    text: code,
  });
}
