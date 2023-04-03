import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import DataTable from "./components/pages/DataTable";
import QuizTemplate from "./components/quiz/QuizTemplate";
import BordersQuiz from "./components/quiz/BordersQuiz";

export const locations = ["flag", "capital"];

function App() {
  const [data, setData] = useState(null);

  const [borderData, setBorderData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,flags,maps,population,area,translations,borders"
    )
      .then((res) => res.json())
      .then((data) => {
        let dataSortedAlphabetically = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setData(dataSortedAlphabetically);

        let countriesWithBorderEntries = data.filter((country) => {
          return country.borders.length > 0;
        });
        setBorderData(countriesWithBorderEntries);

        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="loading">Loading Data...</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/quiz">
          <Route path=":type" element={<QuizTemplate data={data} />} />
          <Route
            path="borders"
            element={<BordersQuiz data={borderData} type="borders" />}
          />
        </Route>

        <Route path="/data" element={<DataTable data={data} />} />
        <Route path="*" element={<NotFound />} />
        {/* higher lower population  und area (random index für erstes und zweiter index dann +- 10 damit schwere frage)*/}
      </Routes>
    </div>
  );
}

export default App;
