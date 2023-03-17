import BackHome from "./BackHome"

function NotFound(){
    return (
        <div className="not-found">
            <h2>
                Not Found
            </h2>
            <br />
            Zurück zur Startseite: <br /> 

            <BackHome/>
        </div>
    )
}
export default NotFound