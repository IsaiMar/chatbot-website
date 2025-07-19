const mongoose = require("mongoose");

const ProspectiveUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  pestType: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ProspectiveUser", ProspectiveUserSchema);
