const express = require("express");
const { buy } = require("./services/buy");
const { bc } = require("./services/bc");

const PORT = process.env.PORT || 3000;

require("dotenv").config();

express()
  .get("/", async (_, res) => {
    const data = await bc.balance();
    res.json(data);
  })
  .get("/buy", async (_, res) => {
    const data = await buy();
    res.json(data);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
