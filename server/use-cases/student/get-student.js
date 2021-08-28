module.exports = function makeGetStudent({ db }) {
    return async function getStudent({ id }) {
        const response = await db.getStudent({ 
            id ,
            fields: 'firstName lastName email stream'
        });
        return response;
    }
}