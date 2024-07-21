const Poll = require('../models/poll');

// Create a new poll
const createPoll = async (req, res) => {
    const { question, options } = req.body;

    if (options.length > 4) {
        return res.status(400).json({ msg: 'Cannot have more than 4 options' });
    }

    try {
        const poll = new Poll({ question, options });
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

        poll.options.push({ text });
        await poll.save();
        res.status(200).json(poll);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Vote for an option
const voteOption = async (req, res) => {
    const { pollId, optionId } = req.params;

    try {
        const poll = await Poll.findById(pollId);
        if (!poll) {
            return res.status(404).json({ msg: 'Poll not found' });
        }

        const option = poll.options.id(optionId);
        if (!option) {
            return res.status(404).json({ msg: 'Option not found' });
        }

        option.votes += 1;
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
        // Find the poll and remove the option by its ID
        const poll = await Poll.findById(pollId);
        if (!poll) {
            return res.status(404).json({ msg: 'Poll not found' });
        }

        // Find the index of the option to remove
        const optionIndex = poll.options.findIndex(opt => opt._id.toString() === optionId);
        if (optionIndex === -1) {
            return res.status(404).json({ msg: 'Option not found' });
        }

        // Remove the option from the options array
        poll.options.splice(optionIndex, 1);

        // Save the updated poll document
        await poll.save();

        res.status(200).json({ msg: 'Option removed successfully', poll });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
const getAllPolls = async (req, res) => {
    try {
        // Fetch all polls from the database
        const polls = await Poll.find();

        // Send the fetched polls in the response
        res.status(200).json({ polls });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

module.exports = { createPoll, addOption, voteOption, getPoll, deletePoll, deleteOption, getAllPolls };
