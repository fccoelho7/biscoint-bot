require("dotenv").config();

module.exports = {
  amount: +process.env.AMOUNT,
  biscoint: {
    apiKey: process.env.BISCOINT_API_KEY,
    apiSecret: process.env.BISCOINT_API_SECRET,
  },
  mailgun: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASS,
    email: process.env.MAILGUN_EMAIL,
  },
};
