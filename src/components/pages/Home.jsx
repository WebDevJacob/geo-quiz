import Nav from "../Nav"
import "../../css/home.css"
import { Link } from "react-router-dom"

function Home(){
    return (
        <div className="home">
            <header>
                <h1>Geo Quiz App</h1>
                <Link to="/data" title="Tabelle mit Daten" className="data-link">
                    Datentabelle 
                </Link>
            </header>

            <Nav/>

        </div>
    )
}

export default Home