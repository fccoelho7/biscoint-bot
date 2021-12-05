const { bc } = require("./bc");
const { notifyError } = require("./notify-error");
const { notify } = require("./email-notifier");
const { amount } = require("../environment");

async function buy({ notifyOnError = true } = {}) {
  try {
    const offer = await bc.offer({
      amount,
      isQuote: true,
      op: "buy",
    });
    const order = await bc.confirmOffer({ offerId: offer.offerId });
    const currentBalance = await bc.balance();
    const currentBalanceBrl = currentBalance.BRL;

    // Notify user about the current balance
    if (currentBalanceBrl < amount * 4) {
      notify({
        subject: "[ALERTA] Hora de aportar!",
        body: `Seu saldo atual é de R$${currentBalanceBrl}`,
      });
    }

    return order;
  } catch (error) {
    if (notifyOnError) await notifyError(error);

    console.error(error);

    return error;
  }
}

exports.buy = buy;
