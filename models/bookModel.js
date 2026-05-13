const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: String,
    author: String,
    totalCopies: {
      type: Number,
      default: 1,
    },
    copies: [
      {
        serialNumber: { type: String, unique: true },
        isAvailable: { type: Boolean, default: true },
      },
    ],
    currentAvailability: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "books",
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("books", bookSchema);