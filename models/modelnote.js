const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  // id:{
  //     type: Number,
  //     required: true
  // },
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("modelnote", noteSchema);
