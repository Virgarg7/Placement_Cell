const useCases=require('../../use-cases');
const makeAddResume=require('./add-resume');
const makeDeleteResume=require('./delete-resume');
const makeGetResume=require('./get-resume');
const makeUpdateResume=require('./update-resume');
const makeUpdateProfileImage=require('./update-profile-image');
const makeDownloadResume=require('./download-resume');

const addResume=makeAddResume({
    addResumeToApp: useCases.addResume
});

const deleteResume=makeDeleteResume({
    deleteResumeToApp: useCases.deleteResume
});

const getResume=makeGetResume({
    getResumeToApp: useCases.getResume
});

const updateResume=makeUpdateResume({
    updateResumeToApp: useCases.updateResume
})

const updateProfileImage=makeUpdateProfileImage({
    updateProfileImageToApp: useCases.updateProfileImage
})

const downloadResume=makeDownloadResume({
    downloadResumeToApp: useCases.downloadResume
})

module.exports=Object.freeze({
    addResume,
    deleteResume,
    getResume,
    updateResume,
    updateProfileImage,
    downloadResume
});