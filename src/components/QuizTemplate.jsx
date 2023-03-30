import {QuizCard, QuizForm} from "./QuizCard"
import BackHome from "./BackHome"
import { useState, useRef } from "react"

const getRandomIndex = (max) => {
    return Math.floor(Math.random() * max)
}

function QuizTemplate({data, targetValue, type}){

    const [currentData, setCurrentData] = useState(data[getRandomIndex(250)])

    const [isCorrect, setCorrect] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)


    const [score, setScore] = useState({correct: 0, total: 0})

    const inputElement = useRef()

    const initNewGame = (skipped) => {
        let delay = 0;
        if (skipped) delay = 1500

        setShowAnswer(true);

        setTimeout(() => {
            let randomCountry = data[getRandomIndex(250)]
            setCurrentData(randomCountry)
            setCorrect("")
            setScore({...score, total: score.total + 1})
            setShowAnswer(false)

            inputElement.current.value = "";
            inputElement.current.focus()
        }, delay)
    }

    const checkUserGuess = (guess) => {
        if(guess === currentData[targetValue]) {
            handleCorrectOrFalse(true)
            setScore({...score, correct: score.correct + 1})
        } else{
            handleCorrectOrFalse(false)
        }
    }

    const handleCorrectOrFalse = (bool) =>{
        setCorrect(bool)
    }

    return(
        <div className={`page-wrapper ${type}`}>
            <div className="quiz-wrapper">
                <BackHome/>
                <QuizCard type={type} data={currentData} isCorrect={isCorrect} score={score} showAnswer={showAnswer}/>
                <QuizForm onCheck={checkUserGuess} onSkip={initNewGame} inputRef={inputElement} isCorrect={isCorrect}/>
            </div>
        </div>
    )
}
export default QuizTemplate