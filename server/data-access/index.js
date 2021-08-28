const utilities=require('../utilities');
const makeDb=require('./db');

// Connect to MongoDB
const DB_URL=process.env.DB_URL;
const mongoDB=new utilities.MongoDB({URL: DB_URL});

// Create Send Email Queue
const REDIS_URL= process.env.REDIS_URL;
const bullQueue=new utilities.BullQueue({URL: REDIS_URL});
const sendEmailQueue=bullQueue.createSendEmailQueue();
// const sendEmailQueue={process: "done"};

// Make DB
const Db = makeDb({mongoDB});

module.exports=Object.freeze({
    mongoDB,
    sendEmailQueue,
    db: Db
})
