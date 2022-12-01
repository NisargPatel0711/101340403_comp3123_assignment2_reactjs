import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const BACKEND_URL = "https://101340403-comp-3123-assignment1.vercel.app"

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const employees = await axios.get(
                BACKEND_URL + "/api/emp/employees"
            );
            setEmployees(employees.data);
        }
        fetchData();
    }, []);

    return (
        <>
            <h1 className="text-center">Employee List</h1>
            <Link className="btn btn-success" to="/add">
                Add Employee
            </Link>

            <table className="table mt-4">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={employee._id}>
                            <td>{index + 1}</td>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.salary}</td>
                            <td>
                                <Link
                                    className="btn btn-primary me-3"
                                    to={`/view/${employee._id}`}
                                >
                                    <i className="bi bi-eye-fill me-2"></i>
                                    View
                                </Link>

                                <Link
                                    className="btn btn-secondary me-3"
                                    to={`/update/${employee._id}`}
                                >
                                    <i className="bi bi-pencil-square me-2"></i>
                                    Update
                                </Link>
                                <button className="btn btn-danger">
                                    <i className="bi bi-trash3-fill me-2"></i>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
