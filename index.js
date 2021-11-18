const express = require("express");
const PORT = process.env.PORT || 3000;
const Biscoint = require("biscoint-api-node").default;

require("dotenv").config();

const bc = new Biscoint({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

express()
  .get("/balance", async (_, res) => {
    const data = await bc.balance();
    res.json(data);
  })
  .get("/buy", async (_, res) => {
    const offer = await bc.offer({
      amount: +process.env.AMOUNT,
      isQuote: true,
      op: "buy",
    });
    const confirmOrder = await bc.confirmOffer({ offerId: offer.offerId });
    res.json(confirmOrder);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
