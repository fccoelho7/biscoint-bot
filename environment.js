require("dotenv").config();

module.exports = {
  amount: +process.env.AMOUNT,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  mailgunUser: process.env.MAILGUN_USER,
  mailgunPass: process.env.MAILGUN_PASS,
  mailgunEmail: process.env.MAILGUN_EMAIL,
};
