const express = require("express");

const Bill = require("./bill_model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let bills = await Bill.find({ isDeleted: false }).select(
      "-isDeleted -__v -items._id"
    );

    res.json(bills.reverse());
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const bill = new Bill({
    invoiceNo: req.body.invoiceNo,
    invoiceDate: req.body.invoiceDate,
    to: req.body.to,
    toAddress: req.body.toAddress,
    toGst: req.body.toGst,
    toEmail: req.body.toEmail,
    isGstBill: req.body.isGstBill,
    items: req.body.items,
  });

  try {
    const savedBill = await bill.save();
    res.json(savedBill);
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/:billId", async (req, res) => {
  try {
    const updatedBill = await Bill.findOneAndUpdate(
      { _id: req.params.billId },
      {
        $set: {
          invoiceNo: req.body.invoiceNo,
          invoiceDate: req.body.invoiceDate,
          to: req.body.to,
          toAddress: req.body.toAddress,
          toGst: req.body.toGst,
          toEmail: req.body.toEmail,
          isGstBill: req.body.isGstBill,
          items: req.body.items,
        },
      },
      { new: true }
    );
    res.json(updatedBill);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:billId", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.billId).select(
      "-isDeleted -__v -items._id"
    );
    res.json(bill);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:billId", async (req, res) => {
  try {
    const removedBill = await Bill.findOneAndUpdate(
      { _id: req.params.billId },
      { $set: { isDeleted: true } },
      { new: true }
    );
    res.json(removedBill);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
