import React, { useState } from 'react';
import './style.css';
import voprosi from './voprosi.json';

function App() {
  const [now, setNow] = useState(0);
  const [answers, setAnswers] = useState(Array(voprosi.length).fill(null));
  const [results, setResults] = useState(false);
  const [message, setMessage] = useState('');

  const handleAnswerClick = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[now] = answerIndex;
    setAnswers(newAnswers);
    
    const nextQuestion = now + 1;
    
    if (nextQuestion < voprosi.length) {
      setNow(nextQuestion);
    } else {
      setResults(true);
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (userAnswers) => {
    let correctCount = 0;
    
    for (let i = 0; i < voprosi.length; i++) {
      const correctAnswerIndex = 0;
      if (userAnswers[i] === correctAnswerIndex) {
        correctCount++;
      }
    }
    
    let resultMessage = '';
    
    if (correctCount === 7) {
      resultMessage = '🎉 Идеально! Вы настоящий географ! 🌍';
    } else if (correctCount === 6) {
      resultMessage = '👍 Отлично! Всего одна ошибка!';
    } else if (correctCount === 5) {
      resultMessage = '📚 Хорошо! Но есть куда расти.';
    } else if (correctCount === 4) {
      resultMessage = '😊 Неплохо. Повторите столицы ещё раз!';
    } else if (correctCount === 3) {
      resultMessage = '🤔 Тройка. Карта мира вам в помощь! 🗺️';
    } else if (correctCount === 2) {
      resultMessage = '😬 Мало. Давайте пересдадим?';
    } else if (correctCount === 1) {
      resultMessage = '😭 Очень плохо. Нужно учить столицы!';
    } else {
      resultMessage = '💀 0 из 7. Это провал...';
    }
    
    resultMessage = `${resultMessage} (${correctCount} из ${voprosi.length})`;
    setMessage(resultMessage);
  };

  const restartQuiz = () => {
    setNow(0);
    setAnswers(Array(voprosi.length).fill(null));
    setResults(false);
    setMessage('');
  };

  return (
    <div className="quiz-container">
      <h1>🌍 Столицы мира 🗺️</h1>
      
      {results ? (
        <div className="result-message">
          <h2>Ваш результат:</h2>
          <p>{message}</p>
          <button className="restart-button" onClick={restartQuiz}>
            🔄 Начать заново
          </button>
        </div>
      ) : (
        <>
          <div className="flag-container">
            <img 
              src={`/${voprosi[now].flag}`} 
              alt="флаг страны"
              className="flag-image"
            />
          </div>
          <h2>{voprosi[now].question}</h2>
          <div className="options-container">
            {voprosi[now].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={answers[now] !== null}
              >
                {option}
              </button>
            ))}
          </div>
          <p>Вопрос {now + 1} из {voprosi.length}</p>
        </>
      )}
    </div>
  );
}

export default App;