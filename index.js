const express = require("express");
const { buy } = require("./services/buy");
const { bc } = require("./services/bc");

const PORT = process.env.PORT || 3000;

express()
  .get("/", async (_, res) => {
    const data = await bc.balance();
    const currentBalance = Object.keys(data)
      .map((key) => `<div><strong>${key}</strong>: ${data[key]}</div>`)
      .join("\n");

    const html = `
      <h1>Balanço Atual</h1>
      ${currentBalance}
    `;

    res.send(html);
  })
  .get("/buy", async (_, res) => {
    const data = await buy();
    res.json(data);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
