import { useState } from "react"
import "../../css/table.css"
import BackHome from "../BackHome"
import {  MdArrowUpward } from "react-icons/md"

function TableRow({data}){
    return(
        <tr>
            {/* first td for the row number */}
            <td></td>
            <td>
                <img className="td-image" src={data.flags.svg} alt="Flag" />
            </td>
            <td>{data.translations.deu.common}</td>
            <td>{data.capital}</td>
            <td>{new Intl.NumberFormat("de-DE").format(data.population)}</td>
            <td>
                <a href={data.maps.googleMaps} target="_blank" rel="noreferrer">    
                Karte
                </a>
            </td>
            <td>{new Intl.NumberFormat("de-DE").format(data.area)} km²</td>
        </tr>
    )
}

function TableForm({filterFunc, sortFunc, activeSortBtn}){
    const isActive = (index) =>{
        return index === activeSortBtn ? "active" : ""
    }

    return(
        <div className="table-form">
            <input type="text" placeholder="Suche nach Land oder Hauptstadt..." onChange={(e) => filterFunc(e.target.value)} />        
            <div className="sort-btns">
                <span>Sortiere nach: </span>
                <button className={`sort default ${isActive(0)}`} onClick={() => sortFunc()}>
                    Alphabet
                </button>
                <button className={`sort pop-desc ${isActive(1)}`} onClick={() => sortFunc("pop-desc")}>
                    Bevölkerung absteigend
                </button>
                <button className={`sort pop-asc ${isActive(2)}`} onClick={() => sortFunc("pop-asc")}>
                    Bevölkerung aufsteigend
                </button>
                <button className={`sort area-desc ${isActive(3)}`} onClick={() => sortFunc("area-desc")}>
                    Fläche absteigend
                </button>
                <button className={`sort area-asc ${isActive(4)}`} onClick={() => sortFunc("area-asc")}>
                    Fläche aufsteigend
                </button>
            </div>
        </div>
    )
}

function DataTable({data}){

    const [sortedData, setSortedData] = useState(data)
    const [filter, setFilter] = useState("")
    const [activeSortBtn, setActiveSortBtn] = useState(0)

    const filterList = (text) => {
        let textCapitalized = text.charAt(0).toUpperCase() + text.slice(1)
        setFilter(textCapitalized)
    }

    const sortList = (type) =>{
        const copy =[...sortedData]

        switch (type) {
            case "pop-desc":
                copy.sort((a,b) => b.population - a.population)
                setActiveSortBtn(1)
                break;
            case "pop-asc":
                copy.sort((a,b) => a.population - b.population)
                setActiveSortBtn(2)
                break;

            case "area-desc":
                copy.sort((a,b) => b.area - a.area)
                setActiveSortBtn(3)
                break;
            case "area-asc":
                copy.sort((a,b) => a.area - b.area)
                setActiveSortBtn(4)
                break;

            default:
                copy.sort((a,b) => a.name.common.localeCompare(b.name.common))
                setActiveSortBtn(0)
                break;
        }
        setSortedData(copy)
    }

    return (
        <div className="table-wrapper">
            <BackHome/>
           
            <TableForm filterFunc={filterList} sortFunc={sortList} activeSortBtn={activeSortBtn}/>
           
            <div className="credit-link">
                Daten von: <a href="https://restcountries.com/">restcountries.com</a>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th> </th>
                        <th></th>
                        <th>Name</th>
                        <th>Hauptstadt</th>
                        <th>Einwohner</th>
                        <th>Karte</th>
                        <th>Fläche</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData
                    .filter((item) => {
                        return item.translations.deu.common.startsWith(filter) || item.capital?.[0]?.startsWith?.(filter)
                    })
                    .map((item, index) => {
                        return <TableRow data={item} key={index} />
                    })}
                </tbody>
            </table>
            <button className="back-to-top" onClick={() => window.scrollTo(0, 0)}>
                <MdArrowUpward/>
            </button>
        </div>
    )
}

export default DataTable