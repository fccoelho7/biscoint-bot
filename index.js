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
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
