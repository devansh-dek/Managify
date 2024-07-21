import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userDetailsAtom } from '@/atoms/userDetails';
import { isAdminAtom } from '@/atoms/isAdmin';

interface Option {
    _id: string;
    text: string;
    votes: number;
}

interface Poll {
    _id: string;
    question: string;
    options: Option[];
    voted: boolean; // Track if the user has voted
}

const Poll: React.FC = () => {
    const [userDetails] = useRecoilState(userDetailsAtom);
    const [isAdmin] = useRecoilState(isAdminAtom);

    const [polls, setPolls] = useState<Poll[]>([]);
    const [newPollQuestion, setNewPollQuestion] = useState<string>('');
    const [newOptions, setNewOptions] = useState<{ [key: string]: string }>({});

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

    const handleCreatePoll = async () => {
        if (newPollQuestion.trim() === '') return;
        try {
            const response = await axios.post<Poll>('http://localhost:3000/api/v1/polls', { question: newPollQuestion });
            setPolls([...polls, response.data]);
            setNewPollQuestion('');
        } catch (error) {
            console.error('Error creating poll:', error);
        }
    };

    const handleAddOption = async (pollId: string) => {
        const newOptionText = newOptions[pollId] || '';
        if (!newOptionText) return;
        try {
            const response = await axios.post<Poll>(`http://localhost:3000/api/v1/polls/${pollId}/options`, { text: newOptionText });
            setPolls(polls.map(poll => poll._id === pollId ? response.data : poll));
            setNewOptions(prev => ({ ...prev, [pollId]: '' }));
        } catch (error) {
            console.error('Error adding option:', error);
        }
    };

    const handleVote = async (pollId: string, optionId: string) => {
        if (userDetails.email === 'none') {
            alert('You must be logged in to vote.');
            return;
        }

        const poll = polls.find(p => p._id === pollId);
        if (poll?.voted) {
            alert('You have already voted on this poll.');
            return;
        }

        try {
            await axios.post(`http://localhost:3000/api/v1/polls/${pollId}/options/${optionId}/vote`, { email: userDetails.email });
            setPolls(polls.map(p => p._id === pollId ? { ...p, voted: true } : p));
            fetchPolls();
        } catch (error) {
            console.error('Error voting on option:', error);
        }
    };

    const handleDeletePoll = async (pollId: string) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/polls/${pollId}`);
            setPolls(polls.filter(poll => poll._id !== pollId));
        } catch (error) {
            console.error('Error deleting poll:', error);
        }
    };

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
        <div className="p-6 max-w-[550px] mx-5 my-10 bg-gray-800 rounded-[15px] shadow-lg">
            {isAdmin && (
                <div className="mb-6 p-4 w-[500px] rounded-[20px] bg-gray-700 shadow-md">
                    <h2 className="text-lg font-regular mb-4 font-roboto text-white">Create a New Poll</h2>
                    <input
                        type="text"
                        value={newPollQuestion}
                        onChange={(e) => setNewPollQuestion(e.target.value)}
                        placeholder="Enter poll question"
                        className="border border-gray-600 bg-gray-500 text-white px-4 py-2 rounded-[16px] w-full mb-4"
                    />
                    <button
                        onClick={handleCreatePoll}
                        className="px-4 py-2 bg-[#e78284] text-gray-200 rounded-[20px] hover:bg-white hover:text-[#e78284] transition-all font-roboto font-semibold"
                    >
                        Create Poll
                    </button>
                </div>
            )}
            <div>
                <h2 className="text-xl font-semibold mb-4 text-white font-roboto">Polls</h2>
                {polls.length > 0 ? (
                    <div className="flex flex-col gap-6">
                        {polls.map(poll => (
                            <div key={poll._id} className="rounded-[15px] w-[500px] p-4 bg-gray-900 shadow-md">
                                <h3 className="text-md font-semibold mb-2 text-white">{poll.question}</h3>
                                <ul className="list-disc pl-5 mb-4 text-white">
                                    {poll.options.map(option => {
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
                                                        className={`bg-green-600 text-white px-5 py-1 rounded-[20px] text-xs font-semibold hover:bg-green-700 transition ${poll.voted ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        disabled={poll.voted}
                                                    >
                                                        Vote
                                                    </button>
                                                    {isAdmin && (
                                                        <button
                                                            onClick={() => handleDeleteOption(poll._id, option._id)}
                                                            className="bg-red-600 text-xs font-semibold text-white px-3 py-1 rounded-[20px] hover:bg-red-700 transition"
                                                        >
                                                            Delete Option
                                                        </button>
                                                    )}
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                                {isAdmin && (
                                    <div className="mb-4 flex gap-5">
                                        <input
                                            type="text"
                                            value={newOptions[poll._id] || ''}
                                            onChange={(e) => setNewOptions(prev => ({ ...prev, [poll._id]: e.target.value }))}
                                            placeholder="Add new option"
                                            className="bg-gray-700 text-white px-5 text-sm py-2 rounded-[14px] w-full mb-4"
                                        />
                                        <button
                                            onClick={() => handleAddOption(poll._id)}
                                            className="bg-yellow-600 w-[120px] font-semibold text-xs text-white px-4 h-9 rounded-[15px] hover:bg-yellow-700 transition"
                                        >
                                            Add Option
                                        </button>
                                    </div>
                                )}
                                {isAdmin && (
                                    <button
                                        onClick={() => handleDeletePoll(poll._id)}
                                        className="bg-red-800 text-sm font-semibold rounded-[15px] text-white px-4 py-2 hover:bg-red-900 transition"
                                    >
                                        Delete Poll
                                    </button>
                                )}
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
