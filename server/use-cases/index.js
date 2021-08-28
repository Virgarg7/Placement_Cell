const general = require('./general');
const resume = require('./resume');
const student = require('./student');
const stream = require('./stream');
const opportunity=require('./opportunity');
const admin = require('./admin');

// Export use cases
module.exports = Object.freeze({
  ...general,
  ...resume,
  ...student,
  ...stream,
  ...opportunity,
  ...admin
});
