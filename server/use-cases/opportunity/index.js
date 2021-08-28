const Fuse = require('fuse.js');
const marked = require("marked");

const makeAddOpportunity = require('./add-opportunity');
const makeDeleteOpportunity = require('./delete-opportunity');
const makeGetAllOpportunities = require('./get-all-opportunities');
const makeGetOpportunity = require('./get-opportunity');
const makeUpdateOpportunity = require('./update-opportunity');
const makeSearchOpportunities = require('./search-opportunities');
const makeApplyOpportunity = require('./apply-opportunity');
const makeSendEmailApplicants = require('./send-email-applicants');
const makeGetSelectionProcesses = require('./get-selection-processes');
const makeManageSelected = require('./manage-selected');
const makeFetchPlaced = require('./fetch-placed');
const makeGetApplicants = require('./get-applicants');
const makeSearchApplicants = require('./search-applicants');
const makeFetchSelectionProcessSelected = require('./fetch-selection-process-selected');
const makeSearchSelectionProcessSelected = require('./search-selection-process-selected');
const { db, sendEmailQueue } = require('../../data-access');

const addOpportunity = makeAddOpportunity({ db, sendEmailQueue });
const deleteOpportunity = makeDeleteOpportunity({ db });
const getAllOpportunities = makeGetAllOpportunities({ db });
const getOpportunity = makeGetOpportunity({ db });
const updateOpportunity = makeUpdateOpportunity({ db });
const searchOpportunities = makeSearchOpportunities({db, Fuse});
const applyOpportunity = makeApplyOpportunity({db});
const sendEmailApplicants = makeSendEmailApplicants({db, sendEmailQueue, marked});
const manageSelected = makeManageSelected({db, sendEmailQueue});
const getSelectionProcesses = makeGetSelectionProcesses({db});
const fetchPlaced = makeFetchPlaced({db});
const getApplicants = makeGetApplicants({db});
const searchApplicants = makeSearchApplicants({db, Fuse});
const fetchSelectionProcessSelected = makeFetchSelectionProcessSelected({db});
const searchSelectionProcessSelected = makeSearchSelectionProcessSelected({db, Fuse});

module.exports = Object.freeze({
    addOpportunity,
    deleteOpportunity,
    getAllOpportunities,
    getOpportunity,
    updateOpportunity,
    searchOpportunities,
    applyOpportunity,
    sendEmailApplicants,
    manageSelected,
    getSelectionProcesses,
    fetchPlaced,
    getApplicants,
    searchApplicants,
    fetchSelectionProcessSelected,
    searchSelectionProcessSelected
})