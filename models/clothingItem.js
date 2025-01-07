const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  weather: {
    type: String,
    required: true,
    enum: ['hot', 'warm', 'cold']
  },
  imageURL: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Not a valid link.'
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,

  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("item", clothingItemSchema)

module.exports.createClothingItem = (
    req, res) => {
    console.log(req.user._id);
  };