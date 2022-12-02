import axios from "axios";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import background from "./background.svg";
const BACKEND_URL = "https://101340403-comp-3123-assignment1.vercel.app";

export default function Login() {
    async function handleLogin(event) {
        event.preventDefault();
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };
        try {
            await axios.post(BACKEND_URL + "/api/user/login", user);
            console.log("Login success");
        } catch (error) {
            if (error.response.status === 404) {
                const alertPlaceholder = document.getElementById(
                    "liveAlertPlaceholder"
                );
                const wrapper = document.createElement("div");
                wrapper.id = "alertWrapper";
                wrapper.innerHTML = [
                    '<div class="alert alert-danger alert-dismissible d-flex align-items-center" role="alert">',
                    '<i class="bi bi-exclamation-triangle-fill me-3 fs-2"></i>',
                    "  <div><span>Incorrect Username or Password</span></div>",
                    "</div>",
                ].join("");
                alertPlaceholder.append(wrapper);
                const username = document.getElementById("username");
                username.parentElement.classList.add("is-invalid");
                username.classList.add("is-invalid");
                const password = document.getElementById("password");
                password.parentElement.classList.add("is-invalid");
                password.classList.add("is-invalid");
                username.focus();
                setTimeout(() => {
                    const div = document.getElementById("alertWrapper");
                    div.remove();
                }, 8000);
            }
            console.log(error);
        }
    }

    const usernameRef = useRef();
    const passwordRef = useRef();

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                height: "100vh",
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
            }}
        >
            <div className="border rounded bg-light p-4 w-25">
                <div className="d-flex justify-content-center align-items-center">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
                        alt="logo"
                        style={{ height: "8rem" }}
                    />
                </div>
                <h1 className="text-center">Login</h1>
                <h4 className="text-center mt-4 mb-4">
                    Enter your credentials
                </h4>
                <div id="liveAlertPlaceholder"></div>
                <form className="form" onSubmit={(event) => handleLogin(event)}>
                    <div className="input-group has-validation mb-4">
                        <span className="input-group-text">
                            <i className="bi bi-person-fill fs-3"></i>
                        </span>
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Username"
                                required
                                ref={usernameRef}
                            />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="invalid-feedback">
                            Please enter correct username or password.
                        </div>
                    </div>
                    <div className="input-group has-validation mb-4">
                        <span className="input-group-text">
                            <i className="bi bi-lock-fill fs-3"></i>
                        </span>
                        <div className="form-floating">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                required
                                ref={passwordRef}
                            />
                            <label htmlFor="username">Password</label>
                        </div>
                        <div className="invalid-feedback">
                            Please enter correct username or password.
                        </div>
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg w-100"
                        >
                            LOGIN
                        </button>
                    </div>
                    <p className="text-center">
                        Don't have an account ?{" "}
                        <Link className="text-decoration-none" to={"/signup"}>
                            Sign Up here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
