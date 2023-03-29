import {QuizCard, QuizForm} from "./QuizCard"
import BackHome from "./BackHome"
import { useState, useRef } from "react"

const getRandomIndex = (max) => {
    return Math.floor(Math.random() * max)
}

function FlagQuiz({data}){

    const [currentData, setCurrentData] = useState(data[getRandomIndex(250)])

    const [isCorrect, setCorrect] = useState(false)

    const inputElement = useRef()

    const setRandomCountryAsCurrent = () => {
        let randomCountry = data[getRandomIndex(250)]
        setCurrentData(randomCountry)
        setCorrect("")
        inputElement.current.value = "";
        inputElement.current.focus()
    }

    const checkUserGuess = (guess) => {
        if(guess === currentData.name.common) {
            handleCorrectOrFalse(true)
        } else{
            handleCorrectOrFalse(false)
        }
    }

    const handleCorrectOrFalse = (bool) =>{
        console.log(bool)
        setCorrect(bool)
    }

    return (
        // data &&
        <div className="page-wrapper">
            <div className="quiz-wrapper">
                <BackHome/>
                <QuizCard type="flag" data={currentData} isCorrect={isCorrect}/>
                <QuizForm onCheck={checkUserGuess} onSkip={setRandomCountryAsCurrent} inputRef={inputElement} isCorrect={isCorrect}/>
            </div>
        </div>
    )
}
export default FlagQuiz