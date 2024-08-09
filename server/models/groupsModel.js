const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    members: [
      {
        type: String, // Using string to store identifiers directly
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model("groups", groupSchema);

module.exports = Group;
