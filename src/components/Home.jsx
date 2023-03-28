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
                von Jacob <br />
                <Link to="/data">Daten</Link> von <a href="https://restcountries.com/">restcountries</a> <br />
                Icons von <a href="https://icons8.com/">Icons8</a>
            </footer>
        </div>
    )
}

export default Home