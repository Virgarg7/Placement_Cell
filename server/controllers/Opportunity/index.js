const useCases=require('../../use-cases');
const makeAddOpportunity=require('./add-opportunity');
const makeDeleteOpportunity=require('./delete-opportunity');
const makeGetOpportunity=require('./get-opportunity');
const makeGetAllOpportunitys=require('./get-all-opportunities');
const makeUpdateOpportunity=require('./update-opportunity');
const makeSearchOpportunities = require('./search-opportunities');
const makeApplyOpportunity = require('./apply-opportunity');
const makeSendEmailApplicants = require('./send-email-applicants');
const makeGetSelectionProcesses = require('./get-selection-processes');
const makeManageSelected = require('./manage-selected');
const makeFetchPlaced = require('./fetch-placed');
const makeGetApplicants =  require('./get-applicants');
const makeSearchApplicants = require('./search-applicants');
const makeFetchSelectionProcessSelected = require('./fetch-selection-process-selected');
const makeSearchSelectionProcessSelected = require('./search-selection-process-selected');

const addOpportunity=makeAddOpportunity({
    addOpportunityToApp: useCases.addOpportunity
});

const deleteOpportunity=makeDeleteOpportunity({
    deleteOpportunityToApp: useCases.deleteOpportunity
});

const getOpportunity=makeGetOpportunity({
    getOpportunityToApp: useCases.getOpportunity
});

const getAllOpportunities=makeGetAllOpportunitys({
    getAllOpportunitiesToApp: useCases.getAllOpportunities
})

const updateOpportunity=makeUpdateOpportunity({
    updateOpportunityToApp: useCases.updateOpportunity
})

const searchOpportunities = makeSearchOpportunities({
    searchOpportunititesToApp: useCases.searchOpportunities
})

const applyOpportunity = makeApplyOpportunity({
    applyOpportunityToApp: useCases.applyOpportunity
})

const sendEmailApplicants = makeSendEmailApplicants({
    sendEmailApplicantsToApp: useCases.sendEmailApplicants
})

const getSelectionProcesses = makeGetSelectionProcesses({
    getSelectionProcessesToApp: useCases.getSelectionProcesses
})

const manageSelected = makeManageSelected({
    manageSelectedToApp: useCases.manageSelected
})

const fetchPlaced = makeFetchPlaced({
    fetchPlacedToApp: useCases.fetchPlaced
})

const getApplicants = makeGetApplicants({
    getApplicantsToApp: useCases.getApplicants
})

const searchApplicants = makeSearchApplicants({
    searchApplicantsToApp: useCases.searchApplicants
})

const fetchSelectionProcessSelected = makeFetchSelectionProcessSelected({
    fetchSelectionProcessSelectedToApp: useCases.fetchSelectionProcessSelected
})

const searchSelectionProcessSelected = makeSearchSelectionProcessSelected({
    searchSelectionProcessSelectedToApp: useCases.searchSelectionProcessSelected
})

module.exports=Object.freeze({
    addOpportunity,
    deleteOpportunity,
    getOpportunity,
    getAllOpportunities,
    updateOpportunity,
    searchOpportunities,
    applyOpportunity,
    sendEmailApplicants,
    getSelectionProcesses,
    manageSelected,
    fetchPlaced,
    getApplicants,
    searchApplicants,
    fetchSelectionProcessSelected,
    searchSelectionProcessSelected
});