import { useState, useContext } from "react"
import "../css/table.css"
import BackHome from "./BackHome"
import { DataContext } from "../App"

function TableRow({data}){
    return(
        <tr>
            <td>
                <img className="td-image" src={data.flags.svg} alt="Flag" />
            </td>
            <td>{data.name.common}</td>
            <td>{data.capital}</td>
            {/* <td>{data.borders.join(", ")}</td> */}
            <td>{new Intl.NumberFormat("de-DE").format(data.population)}</td>

            <td>
                <a href={data.maps.googleMaps} target="_blank" rel="noreferrer">    
                Google Maps
                </a>
            </td>
            <td>{data.cca3}</td>
        </tr>
    )
}

function TableForm({filterFunc}){
    return(
        <div className="table-form">
            <input type="text" placeholder="Suche..." onChange={(e) => filterFunc(e.target.value)} />        
        </div>
    )
}

function DataTable(){

    const data = useContext(DataContext)
    const [filter, setFilter] = useState("")

    const filterList = (text) => {
        let textCapitalized = text.charAt(0).toUpperCase() + text.slice(1)
        setFilter(textCapitalized)
    }

    return (
        <div className="table-wrapper">
            <BackHome/>
            <TableForm filterFunc={filterList}/>
            <table>
                <thead>
                    <tr>
                        <th>Flag</th>
                        <th>Name</th>
                        <th>Capital</th>
                        <th>Population</th>
                        <th>Maps</th>
                        <th>Code</th>
                    </tr>
                </thead>
                <tbody>
                    {data && 
                    
                    data
                    .filter((item) => {
                        return item.name.common.startsWith(filter) 
                    })
                    .map((item, index) => {
                        return <TableRow data={item} key={index} />
                    })}
                </tbody>
            </table>
            <button className="back-to-top" onClick={() => window.scrollTo(0, 0)}>
                Back to Top
            </button>
        </div>
    )
}

export default DataTable