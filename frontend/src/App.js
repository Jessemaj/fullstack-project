import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Excercise from "./Excercise";
import Navbar from "./Navbar";
import Admin from "./Admin";
import EditWord from "./EditWord";

/** Navbar stays always on the top while other pages change below it */
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <>
            <Route path="/" element={<Excercise />} />
            <Route path="/:id/editword" element={<EditWord />} />
            <Route path="/admin" element={<Admin />} />
          </>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
