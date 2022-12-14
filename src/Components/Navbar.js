import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./auth";

export default function Navbar() {
    const auth = useAuth()
    const navigate = useNavigate()

    function handleLogout(event) {
        event.preventDefault();
        auth.logout()
        navigate('/login', {replace: true})
    }

    return (
        <>
            <header className="App-header">
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <span className="navbar-brand" href="">
                            Employee Management System
                        </span>
                        <div>
                            <ul className="navbar-nav d-flex align-items-center">
                                <li className="nav-item">
                                    <button
                                        className="btn btn-primary d-flex justify-content-center align-items-center"
                                        onClick={(event) => handleLogout(event)}
                                    >
                                        Log Out &nbsp;
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            className="bi bi-box-arrow-right"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                                            />
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}
