const mongoose = require("mongoose");

const billItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true },
  hsnSac: { type: String },
});

const billSchema = new mongoose.Schema({
  invoiceNo: { type: String, required: true },
  invoiceDate: { type: String, required: true },
  to: { type: String, required: true },
  toAddress: { type: String, required: true },
  toGst: { type: String },
  toEmail: { type: String },
  isGstBill: { type: Boolean, required: true },
  items: [billItemSchema],
  isDeleted: { type: Boolean, default: false },
});

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
