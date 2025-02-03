import React, { useState } from 'react';
import { FaReact, FaPython, FaJava, FaCode } from 'react-icons/fa'; // Icons for each programming language

const PollsAndSurveysSection = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [votes, setVotes] = useState({
    option1: 0,
    option2: 0,
    option3: 0,
    option4: 0,
  });
  const [voted, setVoted] = useState(false);
  const [emojiReaction, setEmojiReaction] = useState(''); // Store the emoji reaction

  const handleVote = (option) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [option]: prevVotes[option] + 1,
    }));
    setSelectedOption(option);
    setVoted(true);
  };

  const handleEmojiReaction = (emoji) => {
    setEmojiReaction(emoji); // Set the emoji reaction
  };

  const totalVotes = Object.values(votes).reduce((total, vote) => total + vote, 0);
  const getPercentage = (votesForOption) => ((votesForOption / totalVotes) * 100).toFixed(1);

  const emojiReactions = ['😎', '👍', '💻', '🔥']; // Emoji reactions

  return (
    <section className="py-12  bg-gradient-to-r from-indigo-600 via-purple-400 to-black text-white">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Poll of the Day</h2>
        <p className="text-lg text-gray-600 mb-6">We would love to know your opinion!</p>
        
        <div className="mb-6">
          <h3 className="text-xl font-medium text-gray-800">What is your favorite programming language?</h3>
        </div>

        <div className="space-y-4">
          {['option1', 'option2', 'option3', 'option4'].map((option, index) => {
            const optionText = ['JavaScript', 'Python', 'Java', 'C++'][index];
            const icons = [<FaReact />, <FaPython />, <FaJava />, <FaCode />];
            return (
              <div key={option} className="flex items-center space-x-3 hover:bg-gray-100 rounded-lg p-3 transition-all cursor-pointer">
                <input
                  type="radio"
                  id={option}
                  name="poll"
                  checked={selectedOption === option}
                  onChange={() => handleVote(option)}
                  className="w-5 h-5 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor={option} className="text-lg text-gray-800 flex items-center space-x-2">
                  {icons[index]}
                  <span>{optionText}</span>
                </label>
              </div>
            );
          })}
        </div>

        {voted && (
          <div className="mt-4 text-center">
            <p className="text-lg text-gray-700 font-semibold">Thanks for voting!</p>
          </div>
        )}

        {voted && (
          <div className="mt-4 text-center">
            <p className="text-lg text-gray-700 font-semibold">Pick an Emoji Reaction:</p>
            <div className="flex space-x-4 justify-center mt-3">
              {emojiReactions.map((emoji) => (
                <button
                  key={emoji}
                  className={`text-3xl ${emojiReaction === emoji ? 'text-blue-500' : 'text-gray-700'}`}
                  onClick={() => handleEmojiReaction(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
            {emojiReaction && (
              <div className="mt-3 text-xl text-gray-700">Your reaction: {emojiReaction}</div>
            )}
          </div>
        )}

        {totalVotes > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-medium text-gray-800 mb-4">Poll Results</h3>
            <div className="space-y-4">
              {['option1', 'option2', 'option3', 'option4'].map((option, index) => {
                const optionText = ['JavaScript', 'Python', 'Java', 'C++'][index];
                const percentage = getPercentage(votes[option]);
                return (
                  <div key={option} className="flex items-center justify-between">
                    <span className="text-lg text-gray-700">{optionText}</span>
                    <div className="w-2/3 bg-gray-200 h-4 rounded-lg relative">
                      <div
                        className="bg-blue-500 h-full rounded-lg"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => setVotes({ option1: 0, option2: 0, option3: 0, option4: 0 })}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Reset Poll
          </button>
        </div>
      </div>
    </section>
  );
};

export default PollsAndSurveysSection;
