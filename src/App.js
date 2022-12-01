import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AddEmployee from "./Components/AddEmployee";
import EmployeeList from "./Components/EmployeeList";

function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<EmployeeList />} />
                        <Route path="/add" element={<AddEmployee />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
