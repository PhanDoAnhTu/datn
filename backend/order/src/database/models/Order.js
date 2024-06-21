const { model, Schema } = require("mongoose");
const DOCUMENT_NAME = "Order";
const COLLECTION_NAME = "orders";

const orderSchema = new Schema(
  {
    order_userId: { type: String, required: true },
    order_checkout: { type: Object, default: {} },
    order_shipping: { type: Object, default: {} },
    order_payment: { type: Object, default: {} },
    order_product: { type: Object, required: true },
    order_trackingNumber: { type: String, default: "#0001" },
    order_status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "cancelled","successful","review"],
      default: "pending",
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: {
      createdAt: "createdOn",
      updatedAt: "modifiedOn",
    },
  }
);

module.exports = model(DOCUMENT_NAME, orderSchema);
