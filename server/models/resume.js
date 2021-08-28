const mongoose = require("mongoose");

// Make Resume Schema
const resumeSchema = mongoose.Schema({
  profile: {
    type: Object,
  },
  networks: {
    type: Object,
  },
  objectives: {
    type: Object,
  },
  workExp: {
    type: Object,
  },
  educations: {
    type: Object,
  },
  projects: {
    type: Object,
  },
  awards: {
    type: Object,
  },
  certifications: {
    type: Object,
  },
  skills: {
    type: Object,
  },
  hobbies: {
    type: Object,
  },
  languages: {
    type: Object,
  },
  references: {
    type: Object,
  },
});

// Make model
const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Object.freeze({
  Resume,
});
