import "../css/quizcard.css"

function QuizCard({type, data, isCorrect, score, showAnswer}){
    if(type==="flag"){
        return (
            <div className={`quiz-card ${type} ${isCorrect}`}>
                <div className="score">{score.correct}/{score.total}</div>
                <img className="flag-img" src={data.flags?.svg} alt="flag of ..."/>
                <div className="solution">
                    {isCorrect || showAnswer ? data.name.common : " . . . "}
                </div>
            </div>    
        )
    }
    if(type==="capital"){
        return (
            <div className={`quiz-card ${type} ${isCorrect}`}>
                <div className="card-text">
                    Hauptstadt von 
                    <span className="card-text-big">
                        {data.name.common}
                    </span>
                </div>
                <div className="score">{score.correct}/{score.total}</div>
                <div className="solution">
                    {isCorrect || showAnswer ? data.capital : " . . . "}
                </div>
            </div>    
        )
    }
    
}

function QuizForm({onCheck, onSkip, inputRef, isCorrect}){

    const handleInputEnter = (e) => {
        if(e.code === "Enter") onCheck(e.target.value)
    }

    return(
        <div className="quiz-form">
            <input type="text" ref={inputRef} onKeyDown={handleInputEnter}/>
            <button className="skip-btn" onClick={() => onSkip(isCorrect ? false : true)}>
                {isCorrect ? "Next" : "Skip"}
            </button>
            <button className="check-btn" onClick={(e) => onCheck(e.target.closest(".quiz-form").querySelector("input").value)}>
                Check
            </button>
        </div>
    )
}


export {
    QuizCard,
    QuizForm
}