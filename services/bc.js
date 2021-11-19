const Biscoint = require("biscoint-api-node").default;
const { biscoint } = require("../environment");

require("dotenv").config();

const { apiKey, apiSecret } = biscoint;

const bc = new Biscoint({ apiKey, apiSecret });

exports.bc = bc;
