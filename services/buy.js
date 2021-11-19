const { bc } = require("./bc");
const { notifyError } = require("./notifyError");
const { amount } = require("../environment");

async function buy() {
  try {
    const offer = await bc.offer({
      amount,
      isQuote: true,
      op: "buy",
    });
    const order = await bc.confirmOffer({ offerId: offer.offerId });

    console.info(order);

    return order;
  } catch (error) {
    await notifyError(error);
    console.error(error);

    return error;
  }
}

buy();

exports.buy = buy;
