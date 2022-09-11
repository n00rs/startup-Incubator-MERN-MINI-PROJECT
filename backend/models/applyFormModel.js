// const { ObjectId } = require('mongodb')
const moongose = require('mongoose')
const { Schema, Types } = moongose


const applicationFormSchema = new Schema({
    userDetails: {

        userId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
    },
    companyDetails: {
        companyName: {
            type: String,
            required: true
        }, companyLogo: {
            type: String,
            required: true
        },
        teamBackground: {
            type: String,
            required: true
        },
        companyProducts: {
            type: String,
            required: true
        },
        solvingProblem: {
            type: String,
            required: true
        },
        uniqueSolution: {
            type: String,
            required: true
        },
        revenueModel: {
            type: String,
            required: true
        },
        marketSize: {
            type: String,
            required: true
        },
        incubationType: {
            type: String,
            required: true
        },
        businessProposal: {
            type: String,
            required: true
        },
    },
    status: {
        type: String,
        default: 'pending'
    },
    slotId: {
        type: Types.ObjectId,
        default: null
    },
    allotedDay:{
        type:Date,
        default:null
    },
    slotSection: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

module.exports = moongose.model('applicationForm', applicationFormSchema)