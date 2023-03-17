import "../css/nav.css"
import { Link } from "react-router-dom"

function NavItem({route, title}){
    return(
        <li className="nav-item"><Link to={route}>{title}</Link></li>
    )
}

function Nav(){
    return (
        <nav>
            <ul>
                <NavItem route={"/flag"} title="Flaggen Quiz" />
                <NavItem route={"/capital"} title="Hauptstädte Quiz" />
                <NavItem route={"/map"} title="Länder auf Karte zuordnen" />
            </ul>
        </nav>
    )
}

export default Nav