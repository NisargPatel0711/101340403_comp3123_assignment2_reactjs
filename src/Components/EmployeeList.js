import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EmployeeList() {
    axios.defaults.headers.post["Content-Type"] =
        "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const employees = await axios.get(
                "http://101340403-comp-3123-assignment1.vercel.app/api/emp/employees"
            );
            setEmployees(employees.data);
        }
        fetchData();
    }, []);

    return (
        <>
            <h1 className="text-center">Employee List</h1>
            <Link className="btn btn-success" to="/add-employee">
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
                                <a
                                    className="btn btn-primary me-3"
                                    href={`/view/${employee._id}`}
                                >
                                    <i className="bi bi-eye-fill"></i>
                                    View
                                </a>

                                <a
                                    className="btn btn-secondary me-3"
                                    href={`/update/${employee._id}`}
                                >
                                    <i class="bi bi-pencil-square"></i>
                                    Update
                                </a>
                                <button className="btn btn-danger">
                                    <i class="bi bi-trash3-fill"></i>
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
