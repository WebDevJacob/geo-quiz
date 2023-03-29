import "../css/quizcard.css"

function QuizCard({type, data, isCorrect}){
    if(type==="flag"){
        return (
            <div className={`quiz-card ${type} ${isCorrect}`}>
                <img className="flag-img" src={data.flags?.svg} alt="flag of ..."/>
                <div className="solution">
                    {isCorrect ? data.name.common : " . . . "}
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
            <button className="skip-btn" onClick={onSkip}>
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