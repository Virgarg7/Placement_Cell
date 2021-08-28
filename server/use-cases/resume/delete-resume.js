module.exports = function makeDeleteResume({ db }) {
    return async function deleteResume({ id, data }) {
        // Check given user id is valid or not
        const user=await db.getStudent({id: data.userId});
        if(!user){
            throw new Error("User with given Id not found");
        }

        // Delete Resume
        const response = await db.deleteResume({id});
        if(response){
            // Delete resume from user
            await db.deleteResumeFromStudent({id, userId:data.userId});

            const resumes = await db.getStudent({ 
                id: data.userId ,
                fields: 'resumes'
            });

            console.log(resumes);
            return resumes;
        }
        else{
            throw new Error("Resume with the given id not found")
        }
        
    }
}