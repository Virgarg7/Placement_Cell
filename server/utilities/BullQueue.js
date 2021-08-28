const Queue=require('bull');
class BullQueue{
    constructor({URL}) {
        if (!URL) {
            console.log("Redis URL is not defined...");
            process.exit(0);
        }
        this._URL=URL;
    }

    createSendEmailQueue(){
        const sendMailQueue = new Queue('sendMail', this._URL);
        console.log("Send Email Queue Created");
        return sendMailQueue   
    }
}

module.exports=BullQueue;