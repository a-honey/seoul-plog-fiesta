const nodemailer = require('nodemailer');
require('dotenv').config();

const smtpTransport = nodemailer.createTransport({
  service: 'naver',
  host: 'smtp.naver.com',
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = smtpTransport;
