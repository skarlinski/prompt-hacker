'use client'
import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

type LevelData = {
    prompt: string;
    defense: string;
    testPrompt: string;
};

const Game = () => {
    const [level, setLevel] = useState(1);
    const [userInput, setUserInput] = useState('');
    const [password, setPassword] = useState('');
    const [levelData, setLevelData] = useState<LevelData>({ prompt: '', defense: '', testPrompt: '' });
    const [message, setMessage] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`/api/levels?level=${level}`)
            .then(response => {
                setLevelData(response.data);
                setMessage(''); // Clear the message upon entering a new level
            })
            .catch(error => {
                console.error('Error fetching level data:', error);
            });
    }, [level]);

    const handlePrompt = () => {
        setLoading(true); // Show loading state
        axios.get(`/api/prompt?prompt=${userInput}&level=${level}`, )
            .then(response => {
                setOutput(response?.data?.chatGptResponse);
                setLoading(false); // Hide loading state
            })
            .catch(error => {
                console.error('Error submitting prompt:', error);
                setLoading(false); // Hide loading state
            });
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setLoading(true); // Show loading state
        axios.post(`/api/levels?level=${level}`, { guess: password })
            .then(response => {
                if (response.data.error) {
                    setMessage(response.data.error);
                } else {
                    setMessage(response.data.message);
                    setLevel(level + 1);
                    setOutput('');
                }
                setLoading(false); // Hide loading state
            })
            .catch(error => {
                console.error('Error submitting guess:', error);
                setLoading(false); // Hide loading state
            });
        setPassword('');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Promptlicious Game</h1>

            <div className="w-full max-w-md p-4 bg-white rounded shadow">
                <h2 className="text-xl font-bold mb-2">Level {level}</h2>
                <p className="mb-4">{levelData.prompt}</p>
                <p className="mb-4 text-sm text-gray-500">{levelData.defense}</p>

                <div className="mb-4">
                    <label className="block mb-2">Your Prompt</label>
                    <textarea value={userInput} onChange={e => setUserInput(e.target.value)} className="w-full p-2 border rounded h-24"></textarea>
                    <button type="button" className="w-full p-2 mt-4 bg-blue-500 text-white rounded" onClick={handlePrompt} disabled={loading}>Prompt LLM</button>
                </div>

                {output && <div className="p-4 mb-4 bg-gray-200 rounded"><p>LLM Output: {output}</p></div>}

                <div className="mb-4">
                    <label className="block mb-2">Your Password Guess</label>
                    <input type="text" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" />
                    <button type="button" className="w-full p-2 mt-4 bg-blue-500 text-white rounded" onClick={handleSubmit} disabled={loading}>Guess Password</button>
                </div>

                {message && <div className="p-2 bg-yellow-200 rounded">{message}</div>}
                {loading && <div className="p-2 bg-blue-200 rounded">Loading...</div>}
            </div>
        </div>
    );
};

export default Game;
