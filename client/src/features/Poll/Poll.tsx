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
    const [newOptionText, setNewOptionText] = useState<string>('');
    const [selectedPollId, setSelectedPollId] = useState<string | null>(null);

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
            const response = await axios.post<Poll>(`http://localhost:3000/api/v1/polls/${pollId}/options`, { text: newOptionText });
            setPolls(polls.map(poll => poll._id === pollId ? response.data : poll));
            setNewOptionText('');
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
        <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Polls</h1>
            <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Create a New Poll</h2>
                <input
                    type="text"
                    value={newPollQuestion}
                    onChange={(e) => setNewPollQuestion(e.target.value)}
                    placeholder="Enter poll question"
                    className="border border-gray-300 p-2 rounded w-full mb-4"
                />
                <button
                    onClick={handleCreatePoll}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Create Poll
                </button>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">Existing Polls</h2>
                {polls.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {polls.map(poll => (
                            <div key={poll._id} className="border border-gray-300 rounded-lg p-4 bg-white shadow-md">
                                <h3 className="text-2xl font-semibold mb-2">{poll.question}</h3>
                                <ul className="list-disc pl-5 mb-4">
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
                                                <div className="w-full bg-gray-200 rounded-full mt-1">
                                                    <div
                                                        className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                                                        style={{ width: `${percentage}%` }}
                                                    >
                                                        {percentage.toFixed(2)}%
                                                    </div>
                                                </div>
                                                <div className="mt-2 flex space-x-2">
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
                                        );
                                    })}
                                </ul>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        value={newOptionText}
                                        onChange={(e) => setNewOptionText(e.target.value)}
                                        placeholder="Add new option"
                                        className="border border-gray-300 p-2 rounded w-full mb-4"
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
                        ))}
                    </div>
                ) : (
                    <p className="text-center">No polls available.</p>
                )}
            </div>
        </div>
    );
};

export default Poll;
