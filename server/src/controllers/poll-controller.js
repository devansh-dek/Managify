const Poll = require('../models/poll');

// Create a new poll
const createPoll = async (req, res) => {
    let { question, options } = req.body;
    if (!options) {
        options = [];
    }

    if (options.length > 4) {
        return res.status(400).json({ msg: 'Cannot have more than 4 options' });
    }

    try {
        const poll = new Poll({ question, options, votedUsers: [] });
        await poll.save();
        res.status(201).json(poll);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Add an option to an existing poll
const addOption = async (req, res) => {
    const { pollId } = req.params;
    const { text } = req.body;

    try {
        const poll = await Poll.findById(pollId);
        if (!poll) {
            return res.status(404).json({ msg: 'Poll not found' });
        }

        if (poll.options.length >= 4) {
            return res.status(400).json({ msg: 'Cannot add more than 4 options' });
        }

        poll.options.push({ text, votes: 0 });
        await poll.save();
        res.status(200).json(poll);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Vote for an option
const voteOption = async (req, res) => {
    const { pollId, optionId } = req.params;
    const { email } = req.body;

    try {
        const poll = await Poll.findById(pollId);
        if (!poll) {
            return res.status(404).json({ msg: 'Poll not found' });
        }

        if (poll.votedUsers.includes(email)) {
            return res.status(400).json({ msg: 'You have already voted' });
        }

        const option = poll.options.id(optionId);
        if (!option) {
            return res.status(404).json({ msg: 'Option not found' });
        }

        option.votes += 1;
        poll.votedUsers.push(email);
        await poll.save();

        res.status(200).json(option);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Get poll results
const getPoll = async (req, res) => {
    const { pollId } = req.params;

    try {
        const poll = await Poll.findById(pollId);
        if (!poll) {
            return res.status(404).json({ msg: 'Poll not found' });
        }
        res.status(200).json(poll);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Delete a poll
const deletePoll = async (req, res) => {
    const { pollId } = req.params;

    try {
        const poll = await Poll.findByIdAndDelete(pollId);
        if (!poll) {
            return res.status(404).json({ msg: 'Poll not found' });
        }
        res.status(200).json({ msg: 'Poll deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Delete an option from a poll
const deleteOption = async (req, res) => {
    const { pollId, optionId } = req.params;

    try {
        const poll = await Poll.findById(pollId);
        if (!poll) {
            return res.status(404).json({ msg: 'Poll not found' });
        }

        const optionIndex = poll.options.findIndex(opt => opt._id.toString() === optionId);
        if (optionIndex === -1) {
            return res.status(404).json({ msg: 'Option not found' });
        }

        poll.options.splice(optionIndex, 1);
        await poll.save();

        res.status(200).json({ msg: 'Option removed successfully', poll });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Get all polls
const getAllPolls = async (req, res) => {
    try {
        const polls = await Poll.find();
        res.status(200).json({ polls });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

module.exports = { createPoll, addOption, voteOption, getPoll, deletePoll, deleteOption, getAllPolls };
