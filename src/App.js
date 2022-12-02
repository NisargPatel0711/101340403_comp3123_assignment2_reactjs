import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AddEmployee from "./Components/AddEmployee";
import EmployeeList from "./Components/EmployeeList";
import ViewEmployee from "./Components/ViewEmployee";
import EditEmployee from "./Components/EditEmployee";

function App() {
    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<EmployeeList />} />
                        <Route path="/add" element={<AddEmployee />} />
                        <Route path="/view/:id" element={<ViewEmployee />} />
                        <Route path="/edit/:id" element={<EditEmployee />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
