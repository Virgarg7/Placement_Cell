const nodemailer=require('nodemailer');
const jwt=require('jsonwebtoken');

const {sendEmailQueue} = require('../../data-access');
const makeSendEmail=require('./send-email');
const makeCreateJWT=require('./create-JWT');

const sendEmail=makeSendEmail({
    nodemailer,
    sendEmailQueue,
});

const createJWT=makeCreateJWT({
    jwt
});

module.exports=Object.freeze({
    sendEmail,
    createJWT
})
