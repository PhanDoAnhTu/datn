import { faker } from "@faker-js/faker";

const orders_managements = [
  {
    _id: faker.string.uuid(),
    userId: 234,
    order_trackingNumber: "0001",
    order_status: "pending",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    order_shipping: {
      user_phone: "566633",
      user_address: "tkh",
    },
    order_payment: {},
    order_checkout: {
      totalPrice: 0,
      feeShip: 0, //phi ship
      totalDiscount: 0, //tong discount
      totalCheckout: 0, //tong thanh toan
    },
    order_products: {
      priceRaw: 1000000, //tien truoc khi giam gia
      priceApplyDiscount: 1222222,
      shop_discounts: [
        {
          discountId: "663ce6534ecf7acec983ea3c",
          codeId: "ssss",
        },
      ],
      item_products: [
        {
          price: 200000,
          quantity: 2,
          sku_id: "ssss",
          productId: "663bcbd18f18455e305d8001",
        },
      ],
    },
  },
];
export default orders_managements;
