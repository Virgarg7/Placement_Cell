const mongoose = require("mongoose");

// Make Resume Schema
const opportunitySchema = mongoose.Schema({
    companyName: {
        type: String,
        required: [true, "Please Enter Company Name"],
    },
    roleName: {
        type: String,
        required: [true, "Please Enter Role Name"],
    },
    CTC: {
        type: Number,
        required: [true, "Please Enter CTC"],
    },
    description: {
        type: String,
        required: [true, "Please enter Description"],
    },
    eligibleStreams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Please Enter Eligible Streams"],
            ref: 'Stream'
        },
    ],
    eligibilityCriteria: {
        type: String,
        required: [true, "Please Enter Eligibity Criteria"],
    },
    selectionProcess: [
        {
            name: String,
            date: Date,
            completed: {
                type: Boolean,
                default: false
            },
            selected: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Student'
                },
            ],
        },
    ],
    registrationLastDate: {
        type: Date,
        required: [true, "Please Enter Date"],
    },
    attachments: [String],
    postedAt: {
        type: Date,
        required: [true, "Please Enter Date"],
    },
    applicants: [
        {
            studentId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Student' 
            },
            resumeId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Resume' 
            },
            appliedAt: Date
        }
    ],
    placedStudents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
});

// Make model
const Opportunity = mongoose.model("Opportunity", opportunitySchema);

module.exports = Object.freeze({
    Opportunity,
});
