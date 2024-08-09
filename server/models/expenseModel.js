 const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    payer: {
      type: String, // Identifier of the payer
      required: true,
    },
    payees: [
      {
        identifier: {
          type: String, // Identifier of the payee
          required: true,
        },
        amount: {
          type: Number, // Amount paid for this payee
          required: true,
        },
      },
    ],
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "groups",
      required: true,
    },
    date: {
      type: Date,
      // default: Date.now,
    },
    type: {
      type: String,
      enum: ['expense', 'settlement'],
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("expense", expenseSchema);

module.exports = Expense;
