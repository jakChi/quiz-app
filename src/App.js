//import logo from './logo.svg';
import './App.css';
import questionsData from './MOCK_DATA (1).json';
import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

function App() {

  const [ current, setCurrent ] = useState(0);
  const [ correctAnswer, setCorrectAnswer ] = useState(0);
  const [ score, setScore ] = useState(0);
  const [ showMenu, setShowMenu ] = useState(false);
  const [ submitted, setSubmitted ] = useState(false);

  const currentQuestion = questionsData[current];
  

  const handleCurrent = (answerIndex) => {
    //if current question is 50 (index 49) it will no more change
    if(current < 49 && !submitted) {
      setCurrent(current + 1);
      if(answerIndex === correctAnswer) {
        setScore(score + 1);
      }
    } 
    //below line is randomly choosing correct answer
    setCorrectAnswer(Math.floor(currentQuestion.answers.length * Math.random()));
  }

  const handleMenu = () => {
    setShowMenu(!showMenu);
  }

  const handleSubmit = (e) => {
    setSubmitted(true);
  }

  const handleInput = (e) => {
    if(e.target.value && e.target.value < 51) {
      setCurrent(e.target.value - 1)
    }
  }
  

  return (
    <>
      {
        showMenu ? (
          <div className='menu'>
            <input type='number' min={1} max={50} value={current + 1} onChange={handleInput}/> 
            <input type='submit' className='submit-btn' onClick={handleSubmit}/>  
            <h3 className='score-section'>{submitted ? score : "?"}/{questionsData.length}</h3>
          </div>
        ) : null
      }
      <div className="app">
      <button className='menu-btn' onClick={handleMenu}>bars</button> 
        <div className='question-section'>
            <h2 className='question'>
              <span className='q-id'>{currentQuestion.id}. </span>
              {currentQuestion.question}
            </h2>
        </div>
        <div className='answer-section'>
          {
            currentQuestion.answers.map((answer, index) => (
              <button  
              key={index}
              onClick={() => handleCurrent(index)}
              >{answer}</button>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default App;
