const puppeteer = require('puppeteer');

const makeAddResume = require('./add-resume');
const makeDeleteResume = require('./delete-resume');
const makeGetResume = require('./get-resume');
const makeUpdateResume = require('./update-resume');
const makeUpdateProfileImage = require('./update-profile-image');
const makeDownloadResume = require('./download-resume');
const { db } = require('../../data-access');

//
const addResume = makeAddResume({ db });
const deleteResume = makeDeleteResume({ db });
const getResume = makeGetResume({ db });
const updateResume = makeUpdateResume({ db })
const updateProfileImage = makeUpdateProfileImage({ db });
const downloadResume = makeDownloadResume({ puppeteer, db });

// Export use cases
module.exports = Object.freeze({
    addResume,
    deleteResume,
    getResume,
    updateResume,
    updateProfileImage,
    downloadResume
});
