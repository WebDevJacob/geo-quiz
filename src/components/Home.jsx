import Nav from "./Nav"
import "../css/home.css"
import { Link } from "react-router-dom"

function Home(){
    return (
        <div>
            <header>
            <h1>Willkommen 
                </h1>
            </header>
            <Nav/>

            <footer>
                von Jacob
                <br />
                <Link to="/data">Daten</Link> von:
                <br /> 
                Icons von : Icons8
            </footer>
        </div>
    )
}

export default Home