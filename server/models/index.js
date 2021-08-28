const Resume=require('./resume');
const Student=require('./student');
const Stream=require('./stream');
const Opportunity=require('./opportunity');
const Admin = require('./admin');

module.exports=Object.freeze({
    ...Resume,
    ...Student,
    ...Stream,
    ...Opportunity,
    ...Admin
})