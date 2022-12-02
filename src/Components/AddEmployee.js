import axios from "axios";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
const BACKEND_URL = "https://101340403-comp-3123-assignment1.vercel.app";

export default function AddEmployee() {
    const navigate = useNavigate();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const genderRef = useRef();
    const salaryRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const employee = {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            email: emailRef.current.value,
            gender: genderRef.current.value,
            salary: salaryRef.current.value,
        };

        try {
            await axios.post(BACKEND_URL + "/api/emp/employees", employee);
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

    return (
        <>
            <h1 className="text-center">Add Employee</h1>
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
                                ref={firstNameRef}
                                required={true}
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
                                ref={lastNameRef}
                                required={true}
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
        </>
    );
}
