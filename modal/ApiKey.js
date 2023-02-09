import mongoose from "mongoose";

const apiKeySchema = mongoose.Schema({

    apiKey: {
        type: String,
        required: true,
    },

    countDay: {
        type: Number,
        default: 0,
        required: true
    },
    countMonth:{
        type: Number,
        default: 0,
        required: true
    },
    checked: { type: Date, default: Date.now },

}, {
    timestamps: true,
})

const ApiKey = mongoose.model('ApiKey', apiKeySchema)

export default ApiKey