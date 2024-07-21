const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
});

const PollSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [OptionSchema],
    votedUsers: [String],
});

module.exports = mongoose.model('Poll', PollSchema);
