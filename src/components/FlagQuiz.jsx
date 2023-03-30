import {QuizCard, QuizForm} from "./QuizCard"
import BackHome from "./BackHome"
import { useState, useRef } from "react"
// import QuizTemplate from "./QuizTemplate"

const getRandomIndex = (max) => {
    return Math.floor(Math.random() * max)
}

function FlagQuiz({data}){

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
        if(guess === currentData.name.common) {
            handleCorrectOrFalse(true)
            setScore({...score, correct: score.correct + 1})
        } else{
            handleCorrectOrFalse(false)
        }
    }

    const handleCorrectOrFalse = (bool) =>{
        setCorrect(bool)
    }

    return (
        <div className="page-wrapper flag">
            <div className="quiz-wrapper">
                <BackHome/>
                <QuizCard type="flag" data={currentData} isCorrect={isCorrect} score={score} showAnswer={showAnswer}/>
                <QuizForm onCheck={checkUserGuess} onSkip={initNewGame} inputRef={inputElement} isCorrect={isCorrect}/>
            </div>
        </div>
    )
}

// function FlagQuiz({data}){
//     <QuizTemplate data={data} targetValue={"['name']['common']"} type="flag"/>
// }
export default FlagQuiz


