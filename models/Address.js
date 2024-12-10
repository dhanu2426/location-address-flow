const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  house: { type: String, required: true },
  apartment: { type: String, required: true },
  category: { type: String, required: true },
  coordinates: { lat: Number, lng: Number },
});

module.exports = mongoose.model("Address", AddressSchema);
