import { useState } from "react"
import "../css/table.css"
import BackHome from "./BackHome"

function TableRow({data}){
    return(
        <tr>
            <td>
                <img className="td-image" src={data.flags.svg} alt="Flag" />
            </td>
            <td>{data.name.common}</td>
            <td>{data.capital}</td>
            <td>{new Intl.NumberFormat("de-DE").format(data.population)}</td>
            <td>
                <a href={data.maps.googleMaps} target="_blank" rel="noreferrer">    
                Map
                </a>
            </td>
            <td>{new Intl.NumberFormat("de-DE").format(data.area)} km²</td>
            <td>{data.cca3}</td>
        </tr>
    )
}

function TableForm({filterFunc, sortFunc}){
    return(
        <div className="table-form">
            <input type="text" placeholder="Suche nach Land oder Hauptstadt..." onChange={(e) => filterFunc(e.target.value)} />        
            <div className="sort-btns">
                <span>Sortiere nach: </span>
                <button className="sort pop-desc" onClick={() => sortFunc("pop-desc")}>
                    Bevölkerung abst.
                </button>
                <button className="sort pop-asc" onClick={() => sortFunc("pop-asc")}>
                    Bevölkerung aufst.
                </button>
                <button className="sort area-desc" onClick={() => sortFunc("area-desc")}>
                    Fläche abst.
                </button>
                <button className="sort area-asc" onClick={() => sortFunc("area-asc")}>
                    Fläche aufst.
                </button>
                <button className="sort default" onClick={() => sortFunc()}>
                    Alphabetisch
                </button>
            </div>
        </div>
    )
}

function DataTable({data}){

    const [sortedData, setSortedData] = useState(data)
    const [filter, setFilter] = useState("")

    const filterList = (text) => {
        let textCapitalized = text.charAt(0).toUpperCase() + text.slice(1)
        setFilter(textCapitalized)
    }

    const sortList = (type) =>{
        const copy =[...sortedData]

        switch (type) {
            case "pop-asc":
                copy.sort((a,b) => a.population - b.population)
                break;
            case "pop-desc":
                copy.sort((a,b) => b.population - a.population)
                break;
        
            case "area-asc":
                copy.sort((a,b) => a.area - b.area)
                break;
            case "area-desc":
                copy.sort((a,b) => b.area - a.area)
                break;

            default:
                copy.sort((a,b) => a.name.common.localeCompare(b.name.common))
                break;
        }
        setSortedData(copy)
    }

    return (
        <div className="table-wrapper">
            <BackHome/>
            <TableForm filterFunc={filterList} sortFunc={sortList}/>
            <table>
                <thead>
                    <tr>
                        <th>Flagge</th>
                        <th>Name</th>
                        <th>Hauptstadt</th>
                        <th>Einwohner</th>
                        <th>Karte</th>
                        <th>Fläche</th>
                        <th>Code</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData
                    .filter((item) => {
                        return item.name.common.startsWith(filter) || item.capital?.[0]?.startsWith?.(filter)
                    })
                    .map((item, index) => {
                        return <TableRow data={item} key={index} />
                    })}
                </tbody>
            </table>
            <button className="back-to-top" onClick={() => window.scrollTo(0, 0)}>
                ⬆️
            </button>
        </div>
    )
}

export default DataTable