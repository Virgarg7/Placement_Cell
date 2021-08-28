const mongoose = require('mongoose');
class MongoDB {
    constructor({ URL }) {

        if (!URL) {
            console.log("DB URL is not defined...");
            process.exit(0);
        }
        mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
            .then(() => console.log("Connected to MongoDB"))
            .catch(err => {
                console.error("Coudn't connect to MongoDB: ", err);
                process.exit(0);
            });
    }

    async createDocument({ model, data }) {
        const object = new model(data);
        const result = await object.save();
        return result;
    }

    async deleteDocument({ model, id }) {
        const result = await model.findByIdAndDelete(id);
        return result;
    }

    async getDocument({ model, id, fields, populateField }) {
        if(populateField){
            const result = await model.findById(id).populate(populateField).select(fields);
            return result;
        }
        const result = await model.findById(id).select(fields);
        return result;
    }

    async updateDocument({ model, id, data }) {
        const result = await model.findByIdAndUpdate(id, data, {
            new: true
        });
        return result;
    }

    async findByQuery({ model, query, fields, sort}) {
        if(sort){
            const result = await model.find(query).sort(sort).select(fields);
            return result;
        }
        const result = await model.find(query).select(fields);
        return result;
    }

    async findByQueryCount({ model, query }) {
        const result = await model.find(query).select().countDocuments();
        return result;
    }

    async bulkInsert({ model, data }) {
        const result = await model.insertMany(data);
        return result;
    }

    async searchAll({ model, fields, sort, populateField }) {
        if(sort){
            const result = await model.find().sort(sort).select(fields);
            return result;
        }

        if(populateField){
            const result = await model.find().populate(String(populateField)).select(fields);
            return result;
        }
        const result = await model.find().sort().select(fields);
        return result;
    }

    async save(obj){
        return await obj.save();
    }

    async getDocumentWithPopulate({model, id, populate}){
        let result = await model.findById(id);
        // if(populate.length > 0){
        //     for(let i=0; i<populate.length; ++i){
        //         console.log(populate[i]);
        //         result = result.populate("selectionProcess.selected");
        //     }
        // }
        // console.log(JSON.stringify(result));
        result =result.select();
        return result;
    }

    async custom({query}){

    }
}

module.exports = MongoDB;