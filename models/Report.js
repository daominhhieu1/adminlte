const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ReportSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    numberPhone: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

ReportSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

ReportSchema.set('toJSON', {
    virtuals: true
});

module.exports = User = mongoose.model("report", ReportSchema);
