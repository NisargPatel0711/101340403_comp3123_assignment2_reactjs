import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AddEmployee from "./Components/AddEmployee";
import EmployeeList from "./Components/EmployeeList";
import ViewEmployee from "./Components/ViewEmployee";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { AuthProvider } from "./Components/auth";
import { RequireAuth } from "./Components/RequireAuth";

function App() {

    return (
        <AuthProvider>            
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/"
                        element={
                            <RequireAuth>
                                <Navbar />
                                <EmployeeList />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/add"
                        element={
                            <RequireAuth>
                                <Navbar />
                                <AddEmployee />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/view/:id"
                        element={
                            <RequireAuth>
                                <Navbar />
                                <ViewEmployee />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/edit/:id"
                        element={
                            <RequireAuth>
                                <Navbar />
                                <AddEmployee type="edit" />
                            </RequireAuth>
                        }
                    />
                    <Route path="*" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
