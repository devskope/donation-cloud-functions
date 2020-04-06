const { env } = process;

exports.amountToLowerDenomination = amount => amount * 100;

exports.computePaystackFees = amount => {
  const decimalFee = env.PAYSTACK_NGN_TX_FEE / 100;
  const feeCap = this.amountToLowerDenomination(env.PAYSTACK_NGN_FEE_CAP); // to disregard for international TXs
  const flatCharge =
    amount > this.amountToLowerDenomination(env.PAYSTACK_NGN_FEE_FREE_MAX)
      ? this.amountToLowerDenomination(env.PAYSTACK_NGN_ADDITIONAL_FEE)
      : 0;
  const fee = Math.ceil(decimalFee * amount + flatCharge);
  return Math.min(fee, feeCap);
};

