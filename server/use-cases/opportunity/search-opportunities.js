module.exports = function makeSearchOpportunities({ db, Fuse }) {
    return async function searchOpportunities({ term }) {
        let response = await db.getAllOpportunities();
        response = JSON.stringify(response);
        response = JSON.parse(response);

        if (response && response.length > 0) {
            response.forEach((opportunity) => {
                // Find no of applicants
                opportunity.applicants = opportunity.applicants.length;

                // Find diff between registration last date and today's date
                let diff =
                    new Date(opportunity.registrationLastDate) - new Date();
                // If diff is less then 0 then registration ended otherwise it is open
                if (diff < 0) {
                    diff = Math.abs(diff);
                    // Count no of days between two dates
                    const diffDays =
                        Math.ceil(diff / (1000 * 60 * 60 * 24)) - 1;

                    // If days are 0 then set message registration ended today otherwise ended x days ago
                    if (diffDays == 0) {
                        opportunity.registrationEndMessage = `Registration Ended Today`;
                    } else {
                        opportunity.registrationEndMessage = `Registration Ended ${diffDays} Days Ago`;
                    }
                } else {
                    // Count no of days and set message that registration ends in x days
                    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
                    if (diffDays == 1) {
                        opportunity.registrationEndMessage = `Registration Ends in ${diffDays} Day`;
                    } else {
                        opportunity.registrationEndMessage = `Registration Ends in ${diffDays} Days`;
                    }
                }
            });

            if (term.trim().length > 0) {
                const fuse = new Fuse(response, {
                    threshold: 0.3,
                    keys: ["companyName", "CTC"],
                });

                // Search
                const result = fuse.search(term);

                response = result.map((val) => val.item);
                return response;
            }
        }
        return response;
    };
};
