module.exports = function makeFetchPlaced({ db }) {
    return async function fetchPlaced({id, data }) {
        // Fetch Placed
        const response = await db.fetchPlaced({id, data});
        if(response){
            return response.placedStudents
        }
        return response;
    }
}