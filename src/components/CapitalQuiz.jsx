import QuizTemplate from "./QuizTemplate"

function CapitalQuiz({data}){
return (
    <QuizTemplate data={data} targetValue={"capital?.[0]"} type="capital"/>
)
}
export default CapitalQuiz