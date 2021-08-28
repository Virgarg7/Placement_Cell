const express = require("express");
const router = express.Router();
const makeCallback = require("../express-callback");
const { opportunity } = require("../controllers");

// Routes
router.post("/", makeCallback(opportunity.addOpportunity));
router.post("/:id/apply", makeCallback(opportunity.applyOpportunity));
router.get(
    "/:id/selectionProcess",
    makeCallback(opportunity.getSelectionProcesses)
);
router.get("/:id/applicants", makeCallback(opportunity.getApplicants));
router.get("/:id/applicants/search", makeCallback(opportunity.searchApplicants));
router.post(
    "/:id/manageSelectionProcess",
    makeCallback(opportunity.manageSelected)
);
router.get(
    "/:id/selectionProcess/:processId/selected",
    makeCallback(opportunity.fetchSelectionProcessSelected)
);
router.get(
    "/:id/selectionProcess/:processId/selected/search",
    makeCallback(opportunity.searchSelectionProcessSelected)
);
router.get("/:id/placed", makeCallback(opportunity.fetchPlaced));
router.post("/:id/sendEmail", makeCallback(opportunity.sendEmailApplicants));
router.get("/all", makeCallback(opportunity.getAllOpportunities));
router.get("/search", makeCallback(opportunity.searchOpportunities));
router.get("/:id", makeCallback(opportunity.getOpportunity));
router.put("/:id", makeCallback(opportunity.updateOpportunity));
router.delete("/:id", makeCallback(opportunity.deleteOpportunity));

module.exports = router;
