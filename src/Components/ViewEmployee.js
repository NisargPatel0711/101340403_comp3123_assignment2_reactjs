import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
const BACKEND_URL = "https://101340403-comp-3123-assignment1.vercel.app";

export default function ViewEmployee() {
    const [employee, setEmployee] = useState({});
    const [loading, isLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        if (!loading) {
            const spinner = document.getElementById("spinner");
            spinner.remove();
        }
        async function fetchEmployee() {
            const employee = await axios.get(
                BACKEND_URL + `/api/emp/employees/${id}`
            );
            isLoading(false);
            setEmployee(employee.data);
        }
        fetchEmployee();
    }, [loading, id]);

    return (
        <div className="container mt-3">
            <h1 className="text-center">View Employee</h1>
            <div className="d-flex justify-content-center align-items-center mt-4">
                <div className="border rounded p-4  w-50">
                    <div className="d-flex justify-content-center">
                        <div
                            className="spinner-border m-5"
                            role="status"
                            id="spinner"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <th scope="row">First Name</th>
                                <td>{employee.first_name}</td>
                            </tr>
                            <tr>
                                <th scope="row">Last Name</th>
                                <td>{employee.last_name}</td>
                            </tr>
                            <tr>
                                <th scope="row">Email</th>
                                <td>{employee.email}</td>
                            </tr>
                            <tr>
                                <th scope="row">Gender</th>
                                <td>{employee.gender}</td>
                            </tr>
                            <tr>
                                <th scope="row">Salary</th>
                                <td>$ {employee.salary}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="d-flex align-items-center justify-content-center mt-4">
                        <Link
                            className="btn btn-primary me-3"
                            to={`/edit/${employee._id}`}
                        >
                            <i className="bi bi-pencil-square me-2"></i>
                            Update
                        </Link>
                        <Link className="btn btn-danger" to="/">
                            <i className="bi bi-x-circle-fill me-2"></i>
                            Cancel
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
