import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import FlagQuiz from "./components/FlagQuiz";
import CapitalQuiz from "./components/CapitalQuiz";
import NotFound from "./components/NotFound";
import MapQuiz from "./components/MapQuiz";
import DataTable from "./components/DataTable";

import { useState, useEffect, createContext } from "react";

export const DataContext = createContext(null);

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,cca3,borders,flags,maps,population"
    )
      .then((res) => res.json())
      .then((data) => {
        let dataSortedAlphabetically = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setData(dataSortedAlphabetically);
      });
  }, []);

  return (
    <DataContext.Provider value={data}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flag" element={<FlagQuiz />} />
          <Route path="/capital" element={<CapitalQuiz />} />
          <Route path="/map" element={<MapQuiz />} />
          <Route path="/data" element={<DataTable />} />
          <Route path="*" element={<NotFound />} />
          {/* higher lower capitals
              karte mit highlight land sagen welches land
          */}
        </Routes>
      </div>
    </DataContext.Provider>
  );
}

export default App;
