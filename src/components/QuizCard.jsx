import "../css/quizcard.css"

function QuizCard({type, data}){
    if(type==="flag"){
        return (
            <div className={`quiz-card ${type}`}>
                <img className="flag-img" src={data.flags?.svg} alt="flag of ..."/>
                <div className="solution">...</div>
            </div>    
        )
    }
}



function QuizForm({onCheck, onSkip}){
    return(
        <div className="quiz-form">
            <input type="text"/>
            <button className="skip-btn" onClick={onSkip}>Skip</button>
            <button className="check-btn" onClick={(e) => onCheck(e.target.closest(".quiz-form").querySelector("input").value)}>Check</button>
        </div>
    )
}


export {
    QuizCard,
    QuizForm
}