require("dotenv").config();

module.exports = {
  amount: +process.env.AMOUNT,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  mailgun: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASS,
    email: process.env.MAILGUN_EMAIL,
  },
};
