import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import FlagQuiz from "./components/FlagQuiz";
import CapitalQuiz from "./components/CapitalQuiz";
import NotFound from "./components/NotFound";
import MapQuiz from "./components/MapQuiz";
import DataTable from "./components/DataTable";

function App() {
  return (
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
  );
}

export default App;
