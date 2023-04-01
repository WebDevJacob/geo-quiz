import { useState, useRef } from "react"
import { useParams } from "react-router-dom"

import { locations } from "../../App"
import NotFound from "../pages/NotFound"

import BackHome from "../BackHome"
import {QuizCard, QuizForm} from "./QuizCard"

const getRandomIndex = (max) => {
    return Math.floor(Math.random() * max)
}

function QuizTemplate({data}){
    
    const [currentData, setCurrentData] = useState(data[getRandomIndex(250)])

    const [isCorrect, setCorrect] = useState("")
    const [showAnswer, setShowAnswer] = useState(false)
    const [score, setScore] = useState({correct: 0, total: 1})

    const inputElement = useRef()

    // fallback if route does not exist 
    const { type } = useParams()
    const location = locations.find(location => location === type)
    if(!location) return <NotFound />

    const getTargetDataPropertyFromType = (type) =>{
        if(type === "flag") return currentData.translations.deu.common
        else if(type === "capital") return currentData.capital?.[0]
    }

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
        if(guess.toLowerCase() === getTargetDataPropertyFromType(type).toLowerCase()) {
            setCorrect(true)
            setScore({...score, correct: score.correct + 1})
        } else{
            setCorrect(false)
        }
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