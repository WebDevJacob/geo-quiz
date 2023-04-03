import "../../css/quizcard.css"

function QuizCardContent({data, type, length}){

    if(type==="flag"){
        return <img className="flag-img" src={data.flags?.svg} alt="flag of ..."/>
    }
    
    if(type==="capital"){
        return (
            <div className="card-text">
                Hauptstadt von 
                <span className="card-text-big">
                    {data.translations.deu.common}
                </span>
            </div>
        )
    }
}

function QuizCard({type, data, isCorrect, score, showAnswer}){

    const getAnswer = (type) =>{
        if(type === "flag") return data.translations.deu.common
        if(type === "capital") return data.capital?.[0]
    }

    return (
        <div className={`quiz-card ${type} ${isCorrect}`}>
            
            <QuizCardContent data={data} type={type}/>

            <div className="score">{score.correct}/{score.total}</div>
            <div className="solution">
                {isCorrect || showAnswer ? getAnswer(type) : " . . . "}
            </div>
        </div>    
    )
}

function QuizForm({onCheck, onSkip, inputRef, isCorrect}){

    const handleInputEnter = (e) => {
        if(e.code === "Enter") onCheck(e.target.value)
    }

    return(
        <div className="quiz-form">
            <input type="text" ref={inputRef} onKeyDown={handleInputEnter}/>
            <button className="skip-btn" onClick={() => onSkip(isCorrect ? false : true)}>
                {isCorrect ? "Nächstes" : "Land überspringen"}
            </button>
            <button className="check-btn" onClick={(e) => onCheck(inputRef.current.value)}>
                Überprüfen (oder <kbd>Enter</kbd>)
            </button>
        </div>
    )
}

export {
    QuizCard,
    QuizForm
}