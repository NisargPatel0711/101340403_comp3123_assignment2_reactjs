import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal } from "bootstrap";
const BACKEND_URL = "https://101340403-comp-3123-assignment1.vercel.app";

export default function AddEmployee({ type }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEdit = type === "edit" ? true : false;

    const [employee, setEmployee] = useState({
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        salary: "",
    });

    useEffect(() => {
        if (isEdit) {
            async function fetchEmployee() {
                const result = await axios.get(
                    BACKEND_URL + `/api/emp/employees/${id}`
                );
                setEmployee(result.data);
            }
            fetchEmployee();
        }
    }, [isEdit, id]);

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const genderRef = useRef();
    const salaryRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newEmployee = {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            email: emailRef.current.value,
            gender: genderRef.current.value,
            salary: salaryRef.current.value,
        };

        try {
            if (isEdit) {
                await axios.put(
                    BACKEND_URL + "/api/emp/employees/" + id,
                    employee
                );
                new Modal(document.getElementById("edit")).show();
            } else {
                await axios.post(
                    BACKEND_URL + "/api/emp/employees",
                    newEmployee
                );
                new Modal(document.getElementById("add")).show();
            }
            navigate("/");
        } catch (error) {
            if (error.response.data.code === 11000) {
                const alertPlaceholder = document.getElementById(
                    "liveAlertPlaceholder"
                );
                const wrapper = document.createElement("div");
                wrapper.id = "alertWrapper";
                wrapper.innerHTML = [
                    '<div class="alert alert-danger alert-dismissible d-flex align-items-center" role="alert">',
                    '<i class="bi bi-exclamation-triangle-fill me-3 fs-1"></i>',
                    "  <div><span>Employee already exists with same email.</span><br><span>Please enter different email address.</span></div>",
                    "</div>",
                ].join("");
                alertPlaceholder.append(wrapper);
                const input = document.getElementById("email");
                input.focus();
                setTimeout(() => {
                    const div = document.getElementById("alertWrapper");
                    div.remove();
                }, 8000);
            }
        }
    };

    const ModalComponent = ({ id, title, message }) => {
        return (
            <div
                className="modal fade"
                id={id}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5 text-success"
                                id="staticBackdropLabel"
                            >
                                {title}
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">{message}</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-bs-dismiss="modal"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="container mt-3">
            <h1 className="text-center">
                {isEdit ? "Update" : "Add"} Employee
            </h1>
            <div className="d-flex justify-content-center align-items-center">
                <div className="border rounded p-5  w-50">
                    <div id="liveAlertPlaceholder"></div>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <div className="mb-3">
                            <label htmlFor="first_name" className="form-label">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                required={true}
                                ref={firstNameRef}
                                value={isEdit ? employee.first_name : null}
                                onChange={(e) =>
                                    setEmployee({ first_name: e.target.value })
                                }
                                placeholder="Enter your first name here..."
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="last_name" className="form-label">
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                required={true}
                                ref={lastNameRef}
                                value={isEdit ? employee.last_name : null}
                                onChange={(e) =>
                                    setEmployee({ last_name: e.target.value })
                                }
                                placeholder="Enter your last name here..."
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                ref={emailRef}
                                required={true}
                                value={isEdit ? employee.email : null}
                                onChange={(e) =>
                                    setEmployee({ email: e.target.value })
                                }
                                placeholder="Enter your email address here..."
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="last_name" className="form-label">
                                Gender
                            </label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                ref={genderRef}
                                required={true}
                                value={isEdit ? employee.gender : null}
                                onChange={(e) =>
                                    setEmployee({ gender: e.target.value })
                                }
                            >
                                <option selected disabled value="">
                                    Choose gender
                                </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="salary" className="form-label">
                                Salary
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="salary"
                                ref={salaryRef}
                                value={isEdit ? employee.salary : null}
                                onChange={(e) =>
                                    setEmployee({ salary: e.target.value })
                                }
                                required={true}
                                step="any"
                                placeholder="Enter your annual salary here..."
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-around mt-4">
                            <button type="submit" className="btn btn-success">
                                <i className="bi bi-clipboard2-check-fill me-2"></i>
                                Save
                            </button>
                            <button
                                type="reset"
                                className="btn btn-secondary me-2"
                            >
                                <i className="bi bi-arrow-clockwise"></i>
                                Reset
                            </button>
                            <Link className="btn btn-danger" to="/">
                                <i className="bi bi-x-circle-fill me-2"></i>
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <ModalComponent
                id={"add"}
                title="Success"
                message="New Employee added successfully!"
            />
            <ModalComponent
                id={"edit"}
                title="Success"
                message="Employee updated successfully!"
            />
        </div>
    );
}
