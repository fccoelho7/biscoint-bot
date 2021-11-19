const Biscoint = require("biscoint-api-node").default;
const { apiKey, apiSecret } = require("../environment");

require("dotenv").config();

const bc = new Biscoint({ apiKey, apiSecret });

exports.bc = bc;
