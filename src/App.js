import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AddEmployee from "./Components/AddEmployee";
import EmployeeList from "./Components/EmployeeList";
import ViewEmployee from "./Components/ViewEmployee";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<EmployeeList />} />
                    <Route path="/add" element={<AddEmployee />} />
                    <Route path="/view/:id" element={<ViewEmployee />} />
                    <Route
                        path="/edit/:id"
                        element={<AddEmployee type="edit" />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
