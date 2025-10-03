import { useEffect, useState } from 'react'
import './Quiz.css'
import qizImage from './assets/quiz.png'
import scoreImage from './assets/score.gif'
import questionData from './questions.json'

export const Quiz = () => {
   
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [timer, setTimer] = useState(30)

    useEffect(() => {
        let interval
        if(timer>0 && !showScore){
            interval = setInterval(() => {
                setTimer((prevTimer)=>prevTimer - 1)
            }, 1000)
        } else{
            clearInterval(interval)
            setShowScore(true)
        }
        return () => clearInterval(interval)
    }, [timer, showScore])

    const correctAnswer = (option) => {
        if(option===questionData[currentQuestion].correctOption){
            setScore((prescore)=>prescore+1)
        }

        if(currentQuestion < questionData.length - 1){
            setCurrentQuestion((prequestion)=>prequestion+1)
            setTimer(30)
        }
        else{
            setShowScore(true)
        }
    }

    const restartQuiz = () => {
        setCurrentQuestion(0)
        setScore(0)
        setShowScore(false)
        setTimer(30)
    }


  return (
    <>
        <h2>QuizHub</h2>
        <div className="quiz-app">
            {showScore ? (<div className="score-section" >
                <img src={scoreImage} />
                <p>Your Score {score}/{questionData.length}</p>
                <button className="restart-btn" onClick={restartQuiz}>Restart</button>
            </div>) : (  
                <>
                <div className="image">
                <img src={qizImage} />
            </div>
            <div className="questions-section">
                <p className="question">Question {currentQuestion+1}</p>
                <p>{questionData[currentQuestion].question}</p>
                <div className="options">
                    {(questionData[currentQuestion].options).map((option, index)=>(<button key={index} onClick={(()=>correctAnswer(option))}>{option}</button>))}               
                </div>
                <div className="timeLeft">
                    <p>Time left <span>{timer}s</span></p>
                </div>
            </div>
            </> )}
         
        </div>
    </>
  )
}
