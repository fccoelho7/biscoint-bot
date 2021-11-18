const express = require("express");
const Biscoint = require("biscoint-api-node").default;
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 3000;

require("dotenv").config();

const bc = new Biscoint({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

async function notify(template_params) {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  await transporter.sendMail({
    from: "Biscoint <contato@biscoint.com>", // sender address
    to: "fccoelho7@gmail.com", // list of receivers
    subject: "Biscoint - Compra Programada", // Subject line
    text: JSON.stringify(template_params), // plain text body
  });
}

express()
  .get("/balance", async (_, res) => {
    const data = await bc.balance();
    res.json(data);
  })
  .get("/buy", async (_, res) => {
    const amount = +process.env.AMOUNT;

    try {
      const offer = await bc.offer({
        amount,
        isQuote: true,
        op: "buy",
      });
      const order = await bc.confirmOffer({ offerId: offer.offerId });

      const payload = { message: "success", ...order };

      await notify(payload);

      res.json(payload);
    } catch (error) {
      const payload = { message: "error", amount, ...error };

      await notify(payload);

      res.json(payload);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
