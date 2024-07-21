import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Poll() {
    const [polls, setPolls] = useState([]);
    const [newPollQuestion, setNewPollQuestion] = useState('');
    const [newOptionText, setNewOptionText] = useState('');
    const [selectedPollId, setSelectedPollId] = useState(null);

    // Fetch all polls
    const fetchPolls = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/polls');
            setPolls(response.data.polls);
        } catch (error) {
            console.error('Error fetching polls:', error);
        }
    };

    useEffect(() => {
        fetchPolls();
    }, []);

    // Create a new poll
    const handleCreatePoll = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/polls', { question: newPollQuestion });
            setPolls([...polls, response.data]);
            setNewPollQuestion('');
        } catch (error) {
            console.error('Error creating poll:', error);
        }
    };

    // Add an option to a poll
    const handleAddOption = async (pollId) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/polls/${pollId}/options`, { text: newOptionText });
            setPolls(polls.map(poll => poll._id === pollId ? response.data : poll));
            setNewOptionText('');
        } catch (error) {
            console.error('Error adding option:', error);
        }
    };

    // Vote on an option
    const handleVote = async (pollId, optionId) => {
        try {
            await axios.post(`http://localhost:3000/api/v1/polls/${pollId}/options/${optionId}/vote`);
            fetchPolls();
        } catch (error) {
            console.error('Error voting on option:', error);
        }
    };

    // Delete a poll
    const handleDeletePoll = async (pollId) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/polls/${pollId}`);
            setPolls(polls.filter(poll => poll._id !== pollId));
        } catch (error) {
            console.error('Error deleting poll:', error);
        }
    };

    // Delete an option
    const handleDeleteOption = async (pollId, optionId) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/polls/${pollId}/options/${optionId}`);
            setPolls(polls.map(poll => {
                if (poll._id === pollId) {
                    poll.options = poll.options.filter(option => option._id !== optionId);
                }
                return poll;
            }));
        } catch (error) {
            console.error('Error deleting option:', error);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Polls</h1>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Create a New Poll</h2>
                <input
                    type="text"
                    value={newPollQuestion}
                    onChange={(e) => setNewPollQuestion(e.target.value)}
                    placeholder="Enter poll question"
                    className="border border-gray-300 p-2 rounded w-full mb-2"
                />
                <button
                    onClick={handleCreatePoll}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Create Poll
                </button>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">Existing Polls</h2>
                {polls.length > 0 ? (
                    polls.map(poll => (
                        <div key={poll._id} className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm">
                            <h3 className="text-2xl font-semibold mb-2">{poll.question}</h3>
                            <ul className="list-disc pl-5 mb-4">
                                {poll.options.map(option => (
                                    <li key={option._id} className="flex justify-between items-center mb-2">
                                        <span>{option.text}</span>
                                        <span>{option.votes} votes</span>
                                        <div className="space-x-2">
                                            <button
                                                onClick={() => handleVote(poll._id, option._id)}
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                                            >
                                                Vote
                                            </button>
                                            <button
                                                onClick={() => handleDeleteOption(poll._id, option._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                            >
                                                Delete Option
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={newOptionText}
                                    onChange={(e) => setNewOptionText(e.target.value)}
                                    placeholder="Add new option"
                                    className="border border-gray-300 p-2 rounded w-full mb-2"
                                />
                                <button
                                    onClick={() => handleAddOption(poll._id)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                                >
                                    Add Option
                                </button>
                            </div>
                            <button
                                onClick={() => handleDeletePoll(poll._id)}
                                className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition"
                            >
                                Delete Poll
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No polls available.</p>
                )}
            </div>
        </div>
    );
}

export default Poll;
