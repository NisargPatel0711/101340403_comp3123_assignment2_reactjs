import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const BACKEND_URL = "https://101340403-comp-3123-assignment1.vercel.app";

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        if (!loading) {
            const spinner = document.getElementById("spinner");
            spinner.remove();
        }
        async function fetchData() {
            const employees = await axios.get(
                BACKEND_URL + "/api/emp/employees"
            );
            isLoading(false);
            setEmployees(employees.data);
        }
        fetchData();
    }, [loading]);

    function DeleteModal({ employee }) {
        return (
            <div
                className="modal fade"
                id={`delete${employee._id}`}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="staticBackdropLabel"
                            >
                                Are you sure, you want to delete this employee ?
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
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
                        </div>
                        <div className="modal-footer">
                            <form>
                                <button
                                    type="submit"
                                    className="btn btn-danger"
                                    onClick={(event) =>
                                        handleDelete(event, employee._id)
                                    }
                                >
                                    <i className="bi bi-trash3-fill me-2"></i>
                                    Delete
                                </button>
                            </form>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                <i className="bi bi-x-circle-fill me-2"></i>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const handleDelete = async (event, id) => {
        event.preventDefault();
        await axios.delete(BACKEND_URL + "/api/emp/employees", {
            params: {
                eid: id,
            },
        });
        window.location.reload();
    };

    return (
        <>
            <h1 className="text-center">Employee List</h1>
            <Link className="btn btn-success" to="/add">
                Add Employee
            </Link>
            <div className="d-flex justify-content-center">
                <div className="spinner-border m-5" role="status" id="spinner">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

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
                                    to={`/edit/${employee._id}`}
                                >
                                    <i className="bi bi-pencil-square me-2"></i>
                                    Update
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#delete${employee._id}`}
                                >
                                    <i className="bi bi-trash3-fill me-2"></i>
                                    Delete
                                </button>
                                <DeleteModal employee={employee} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
