const express = require("express");
const Biscoint = require("biscoint-api-node").default;
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 3000;

require("dotenv").config();

const bc = new Biscoint({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

function toCapitalize(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

async function notify(params) {
  const testAccount = await nodemailer.createTestAccount();

  var transporter = nodemailer.createTransport({
    service: "Mailgun",
    auth: {
      user: "postmaster@sandbox5f546285b4744128af16ebb1f6ffd85e.mailgun.org",
      pass: "5608dd35ead4bfd3012fa49bc0754d20",
    },
  });

  const html = Object.keys(params)
    .map(
      (key) => `<p><strong>${toCapitalize(key)}</strong>: ${params[key]}</p>`
    )
    .join("");

  await transporter.sendMail({
    from: "Biscoint <contato@biscoint.com>", // sender address
    to: "fccoelho7@gmail.com", // list of receivers
    subject: "Biscoint - Compra Programada", // Subject line
    text: JSON.stringify(params), // plain text body
    html,
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
      const payload = { message: "error", amount: `R$${amount}`, ...error };

      await notify(payload);

      res.json(payload);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
