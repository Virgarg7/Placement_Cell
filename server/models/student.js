const mongoose = require("mongoose");

// Make Student Schema
const studentSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter first name"]
  },
  lastName: {
    type: String,
    required: [true, "Please enter last name"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter email"]
  },
  password: {
    type: String,
    required: [true, "Please enter password"]
  },
  resumes: [{
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume' 
      },
      name: String,
      date: Date
  }],
  stream:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stream', 
    required: [true, "Please Enter Stream"]
  },
  placed: {
    type: Boolean,
    default: false
  },
  placedAt: {
    type: Date
  },
  placedIn : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opportunity', 
  }
});

// Make model
const Student = mongoose.model("Student", studentSchema);

module.exports = Object.freeze({
  Student,
});
