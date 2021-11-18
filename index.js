const express = require("express");
const Biscoint = require("biscoint-api-node").default;
const axios = require("axios").default;

const PORT = process.env.PORT || 3000;

require("dotenv").config();

const bc = new Biscoint({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

function notify(template_id, template_params) {
  return axios.post("https://api.emailjs.com/api/v1.0/email/send", {
    service_id: "service_iplt3nr",
    template_id,
    template_params,
    user_id: "user_PFZ8CRvPzDNFG1tQOTkNa",
    accessToken: "3c20cef8d467b1d0185e36a53485d8f4",
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

      await notify("template_re6xyu7", { order });

      res.json(order);
    } catch (error) {
      await notify("template_kt7p8dg", { amount, error });

      res.json({ amount, error });
    }
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
