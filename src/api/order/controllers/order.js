"use strict";
const stripe = require("stripe")(
  //"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"
   "sk_test_51JBm75EtuCIyjulJux3iHYQWJvCkQYGZcPpRzQrL8oTKQJopSzmZcZzGYiJTecqCRHxkk8T3GWXSgV1MrYdpB7GR0019oK1aBj"
);

function calcDiscountPrice(price, discount) {
  if (!discount) return price;

  const discountAmount = (price * discount) / 100;
  const result = price - discountAmount;

  return result.toFixed(2);
}

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async paymentOrder(ctx) {
    const { token, products, userId, addressShipping, tip } = ctx.request.body;

    let totalPayment = 0;
    products.forEach((product) => {
      const priceTemp = calcDiscountPrice(product.price, product.discount);
      totalPayment += Number(priceTemp) * product.quantity;
    });
    // You can set the selected tip percentage here (0 for 0%, 1 for 10%, 2 for 15%, 3 for 25%)
    const tipAmount = totalPayment * (tip/100);
    const deliveryFee = totalPayment > 25 ? 0 : 5.99;
    totalPayment = tipAmount + deliveryFee + totalPayment;

    const charge = await stripe.charges.create({
      amount: Math.round(totalPayment * 100),
      currency: "usd",
      source: token,
      description: `User ID: ${userId}`,
    });

    const data = {
      products,
      user: userId,
      totalPayment,
      idPayment: charge.id,
      addressShipping,
      tip,
      deliveryFee,
    };

    const model = strapi.contentTypes["api::order.order"];
    const validData = await strapi.entityValidator.validateEntityCreation(
      model,
      data
    );

    const entry = await strapi.db
      .query("api::order.order")
      .create({ data: validData });

    return entry;
  },
}));
