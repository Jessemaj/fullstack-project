import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Excercise from "./Excercise";
import Navbar from "./Navbar";
import Edit from "./Edit";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <>
            <Route path="/" element={<Excercise />} />
            <Route path="/edit" element={<Edit />} />
          </>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
