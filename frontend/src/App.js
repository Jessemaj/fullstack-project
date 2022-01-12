import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Excercise from "./Excercise";
import Navbar from "./Navbar";
import Admin from "./Admin";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <>
            <Route path="/" element={<Excercise />} />
            <Route path="/admin" element={<Admin />} />
          </>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
