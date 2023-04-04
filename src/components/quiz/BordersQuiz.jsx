import { useState, useRef, useEffect } from "react"

import BackHome from "../BackHome"
import { QuizForm } from "./QuizCard"

const getRandomIndex = (max) => {
    return Math.floor(Math.random() * max)
}

function BordersQuizCard({type, currentCountryName, borders, isCorrect, showAnswer}){
    
    const getBordersAnswer = () => {
        return (
            <ul className="not-guessed-list">
                {borders
                .filter(country => {
                    return country.wasGuessedCorrectly === false
                })
                .map((country, index) => {
                    return <li key={index}>{country.value}</li>
                })}
            </ul>
        )
    }

    return( 
            <div className={`quiz-card ${type} ${isCorrect}`}>
                <div className="card-text">
                    {borders.length !== 1 ? `Welche ${borders.length} Länder grenzen an` : "Welches Land grenzt an"}
                    <span className="card-text-big">
                        {currentCountryName}
                    </span>
                    <ul>
                        {borders
                        .filter(country => {
                            return country.wasGuessedCorrectly
                        })
                        .map((country, index) => {
                            return <li key={index}>{country.value}</li>
                        })}
                    </ul>
                </div>

                <div className="solution">
                    {showAnswer ? getBordersAnswer() : " . . . "}
                </div>
            </div>    
    )
}

function BordersQuiz({data, type}){

    const [currentData, setCurrentData] = useState(data[getRandomIndex(165)])
    const [currentBorders, setCurrentBorders] = useState(null)

    const [isCorrect, setCorrect] = useState("")
    const [allBordersGuessed, setAllBordersGuessed] = useState(false)

    const [showAnswer, setShowAnswer] = useState(false)

    const inputElement = useRef()

    useEffect(() => {

        fetch(`https://restcountries.com/v3.1/alpha?codes=${currentData.borders.join(",")}`)
            .then(res => res.json())
            .then(borderData => {
                let bordersList = []
                for(const country of borderData){
                    bordersList.push(
                        {
                            value: country.translations.deu.common,
                            wasGuessedCorrectly: false
                        }
                    )
                }

                setCurrentBorders(bordersList)
            })

    }, [currentData])

    const initNewGame = (skipped) => {
        let delay = 0;
        if (skipped) delay = 3000

        setShowAnswer(true);

        setTimeout(() => {
            let randomCountry = data[getRandomIndex(data.length)]
            setCurrentData(randomCountry)
            setCorrect("")
            setShowAnswer(false)

            setAllBordersGuessed(false)
            inputElement.current.value = "";
            inputElement.current.focus()
        }, delay)
    }

    const checkUserGuess = (guess) => {
        let indexOfGuess = currentBorders.findIndex(({value}) => {
            return value.toLowerCase() === guess.toLowerCase()
        })

        if(indexOfGuess !== -1) {
            let currentBordersCopy = [...currentBorders]
            currentBordersCopy[indexOfGuess].wasGuessedCorrectly = true

            setCurrentBorders(currentBordersCopy)
            setCorrect(true)
            inputElement.current.value = ""

            setTimeout(() => {
                setCorrect("")
            }, 1000)

            let allGuessed = checkIfAllBordersGuessed()
            if(allGuessed) setAllBordersGuessed(true)
        } else{
            setCorrect(false)
        }
    }

    const checkIfAllBordersGuessed = () =>{
        return currentBorders.findIndex(c => c.wasGuessedCorrectly === false) === -1
    }

    return(
        <div className={`page-wrapper ${type}`}>
            {currentBorders && 
                <div className="quiz-wrapper">
                    <BackHome/>
                    <BordersQuizCard type={type} currentCountryName={currentData?.translations.deu.common} borders={currentBorders} isCorrect={isCorrect} showAnswer={showAnswer} />
                    <QuizForm onCheck={checkUserGuess} onSkip={initNewGame} inputRef={inputElement} isCorrect={allBordersGuessed} />
                </div>
            }
        </div>
    )
}

export default BordersQuiz