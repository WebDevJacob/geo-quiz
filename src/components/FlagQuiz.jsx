import {QuizCard, QuizForm} from "./QuizCard"
import BackHome from "./BackHome"
import { useContext, useState } from "react"
import { DataContext } from "../App"

function FlagQuiz(){

    const data = useContext(DataContext)

    const [currentData, setCurrentData] = useState(data[Math.floor(Math.random() * 250)])


    const setRandomCountryAsCurrent = () => {
        let randomCountry = null;
        if(data) randomCountry = data[Math.floor(Math.random() * 250)]
        setCurrentData(randomCountry)
    }

    const isUserGuessCorrect = (text) => {
        if(text === currentData.name.common) return true
        return false
    }
    
    const checkUserGuess = (guess) => {
        if(isUserGuessCorrect(guess)){
            console.log("correct")
        }
        else{
            console.log("false")
        }
    }

    return (
        data &&
        <div>
            <BackHome/>
            <QuizCard type="flag" data={currentData}/>
            <QuizForm onCheck={checkUserGuess} onSkip={setRandomCountryAsCurrent}/>
        </div>
        
    )
}
export default FlagQuiz