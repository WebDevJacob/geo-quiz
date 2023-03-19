import { useEffect, useState } from "react"
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
            <td>{data.cca3}</td>
            {/* <td>{data.borders.join(", ")}</td> */}
            <td>{new Intl.NumberFormat("de-DE").format(data.population)}</td>
        </tr>
    )
}

function TableForm(){
    return(
        <div className="table-form">
            <input type="text" placeholder="Suche..." />
            <div className="filter-buttons">
                filter buttons
            </div>
        </div>
    )
}

function DataTable(){

    const [data, setData] = useState(null)

    useEffect( ()=> {
        fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data => {
            const countryData = []

            for (const country of data) {
                const { borders, capital, cca3, flags, maps, name, population } = country
                const relevantProps = {borders, capital, cca3, flags, maps, name, population}
                countryData.push(relevantProps)
            }

            setData(countryData)
        })
    }, [])

    return (
        <div className="table-wrapper">
            <BackHome/>
            <TableForm/>
            <table>
                <thead>
                    <tr>
                        <th>Flag</th>
                        <th>Name</th>
                        <th>Capital</th>
                        <th>Code</th>
                        <th>Population</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => {
                        return <TableRow data={item} key={index} />
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable