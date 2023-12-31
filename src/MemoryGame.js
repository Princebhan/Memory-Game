import React, { useState, useEffect } from 'react';
import './memorycss.css';
import game from './game.mp3'

const successSound = new Audio(game); // Replace with your success sound file path

const generateCards = () => {
  const symbols = ['🐶', '🐱', '🐭', '🐹', '🦊', '🐻', '🐼', '🐨'];
  const allCards = [...symbols, ...symbols];
  return allCards.sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
    // eslint-disable-next-line
  const symbols = ['🐶', '🐱', '🐭', '🐹', '🦊', '🐻', '🐼', '🐨']; // Added this line
  const [cards, setCards] = useState(generateCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  // eslint-disable-next-line
  const [chances, setChances] = useState(0);
  // eslint-disable-next-line
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      const newMatchedPairs = [...matchedPairs];

      if (cards[firstIndex] === cards[secondIndex]) {
        newMatchedPairs.push(cards[firstIndex]);
      }

      setTimeout(() => {
        setMatchedPairs(newMatchedPairs);
        setFlippedIndices([]);
        setChances((prevChances) => prevChances + 1);

        if (newMatchedPairs.length === symbols.length) {
          setGameWon(true);
          playSuccessSound();
          setTimeout(resetGame, 5000);
        }
      }, 1000);
    }
  }, [flippedIndices, cards, matchedPairs, symbols]);

  const playSuccessSound = () => {
    successSound.play();
  };

  const handleCardClick = (index) => {
    if (flippedIndices.length < 2 && !flippedIndices.includes(index)) {
      setFlippedIndices((prevFlipped) => [...prevFlipped, index]);
    }
  };

  const renderCard = (symbol, index) => {
    const isFlipped = flippedIndices.includes(index) || matchedPairs.includes(symbol);
    return (
      <div
        key={index}
        className={`card ${isFlipped ? 'flipped' : ''}`}
        onClick={() => handleCardClick(index)}
      >
        {isFlipped ? symbol : ' '}
      </div>
    );
  };

  const resetGame = () => {
    setCards(generateCards());
    setFlippedIndices([]);
    setMatchedPairs([]);
    setChances(0);
    setGameWon(false);
  };

  return (
    <div className="memory-game">
      <h1>Memory Game</h1>
      <div className="card-grid" style={{ alignItems: 'center', justifyContent: 'center' }}>
        {cards.map((symbol, index) => renderCard(symbol, index))}
      </div>
      <h2>Chances: {chances}</h2>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default MemoryGame;
