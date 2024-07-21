import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Define types for Poll and Option
interface Option {
    _id: string;
    text: string;
    votes: number;
}

interface Poll {
    _id: string;
    question: string;
    options: Option[];
}

const Poll: React.FC = () => {
    const [polls, setPolls] = useState<Poll[]>([]);
    const [newPollQuestion, setNewPollQuestion] = useState<string>('');
    const [newOptions, setNewOptions] = useState<{ [key: string]: string }>({});

    // Fetch all polls
    const fetchPolls = async () => {
        try {
            const response = await axios.get<{ polls: Poll[] }>('http://localhost:3000/api/v1/polls');
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
            const response = await axios.post<Poll>('http://localhost:3000/api/v1/polls', { question: newPollQuestion });
            setPolls([...polls, response.data]);
            setNewPollQuestion('');
        } catch (error) {
            console.error('Error creating poll:', error);
        }
    };

    // Add an option to a poll
    const handleAddOption = async (pollId: string) => {
        try {
            const newOptionText = newOptions[pollId] || '';
            if (!newOptionText) return; // Prevent adding empty options

            const response = await axios.post<Poll>(`http://localhost:3000/api/v1/polls/${pollId}/options`, { text: newOptionText });
            setPolls(polls.map(poll => poll._id === pollId ? response.data : poll));
            setNewOptions(prev => ({ ...prev, [pollId]: '' })); // Clear input after adding
        } catch (error) {
            console.error('Error adding option:', error);
        }
    };

    // Vote on an option
    const handleVote = async (pollId: string, optionId: string) => {
        try {
            await axios.post(`http://localhost:3000/api/v1/polls/${pollId}/options/${optionId}/vote`);
            fetchPolls();
        } catch (error) {
            console.error('Error voting on option:', error);
        }
    };

    // Delete a poll
    const handleDeletePoll = async (pollId: string) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/polls/${pollId}`);
            setPolls(polls.filter(poll => poll._id !== pollId));
        } catch (error) {
            console.error('Error deleting poll:', error);
        }
    };

    // Delete an option
    const handleDeleteOption = async (pollId: string, optionId: string) => {
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
        <div className="p-6 max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Polls</h1>
            <div className="mb-6 p-4 bg-gray-900 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-white">Create a New Poll</h2>
                <input
                    type="text"
                    value={newPollQuestion}
                    onChange={(e) => setNewPollQuestion(e.target.value)}
                    placeholder="Enter poll question"
                    className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full mb-4"
                />
                <button
                    onClick={handleCreatePoll}
                    className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
                >
                    Create Poll
                </button>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4 text-white">Existing Polls</h2>
                {polls.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {polls.map(poll => (
                            <div key={poll._id} className="border border-gray-600 rounded-lg p-4 bg-gray-900 shadow-md">
                                <h3 className="text-2xl font-semibold mb-2 text-white">{poll.question}</h3>
                                <ul className="list-disc pl-5 mb-4 text-white">
                                    {poll.options.map(option => {
                                        // Calculate the percentage for progress bar
                                        const totalVotes = poll.options.reduce((acc, opt) => acc + opt.votes, 0);
                                        const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                                        return (
                                            <li key={option._id} className="flex flex-col mb-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium">{option.text}</span>
                                                    <span className="font-medium">{option.votes} votes</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full mt-1">
                                                    <div
                                                        className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                                                        style={{ width: `${percentage}%` }}
                                                    >
                                                        {percentage.toFixed(2)}%
                                                    </div>
                                                </div>
                                                <div className="mt-2 flex space-x-2">
                                                    <button
                                                        onClick={() => handleVote(poll._id, option._id)}
                                                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                                                    >
                                                        Vote
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteOption(poll._id, option._id)}
                                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                                    >
                                                        Delete Option
                                                    </button>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        value={newOptions[poll._id] || ''}
                                        onChange={(e) => setNewOptions(prev => ({ ...prev, [poll._id]: e.target.value }))}
                                        placeholder="Add new option"
                                        className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full mb-4"
                                    />
                                    <button
                                        onClick={() => handleAddOption(poll._id)}
                                        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
                                    >
                                        Add Option
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleDeletePoll(poll._id)}
                                    className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900 transition"
                                >
                                    Delete Poll
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-white">No polls available.</p>
                )}
            </div>
        </div>
    );
};

export default Poll;
