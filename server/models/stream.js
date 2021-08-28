const mongoose = require("mongoose");

// Make Resume Schema
const streamSchema = mongoose.Schema({
    degree:{
        type: String,
        required: [true, "Please Enter Degree"]
      },
      major:{
        type: String,
        required: [true, "Please Enter Major"]
      },
      sem:{
        type: Number,
        required: [true, "Please Enter Semester"]
      }
});

// Make model
const Stream = mongoose.model("Stream", streamSchema);

module.exports = Object.freeze({
  Stream,
});
