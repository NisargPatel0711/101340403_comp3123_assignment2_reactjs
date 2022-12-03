import axios from "axios";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import background from "./background.svg";
const BACKEND_URL = "https://101340403-comp-3123-assignment1.vercel.app";

export default function Signup() {
    const navigate = useNavigate();
    const auth = useAuth();
    async function handleSignup(event) {
        event.preventDefault();
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            email: emailRef.current.value,
        };
        try {
            await axios.post(BACKEND_URL + "/api/user/signup", user);
            localStorage.setItem("employee-system", JSON.stringify(user));
            auth.login({username: user.username, password: user.password});
            navigate("/", { replace: true });
        } catch (error) {
            if (error.response.status === 400) {
                const alertPlaceholder = document.getElementById(
                    "liveAlertPlaceholder"
                );
                const wrapper = document.createElement("div");
                wrapper.id = "alertWrapper";
                wrapper.innerHTML = [
                    '<div class="alert alert-danger alert-dismissible d-flex align-items-center" role="alert">',
                    '<i class="bi bi-exclamation-triangle-fill me-3 fs-3"></i>',
                    "  <div><span>User already exists with same email.</span><br><span>Please enter different email address.</span></div>",
                    "</div>",
                ].join("");
                alertPlaceholder.append(wrapper);
                const email = document.getElementById("email");
                email.parentElement.classList.add("is-invalid");
                email.classList.add("is-invalid");
                email.focus();
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
    const emailRef = useRef();

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
                <h2 className="text-center mb-5">Create an account</h2>
                <div id="liveAlertPlaceholder"></div>

                <form
                    className="form"
                    onSubmit={(event) => handleSignup(event)}
                >
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
                            <label for="username">Username</label>
                        </div>
                        <div className="invalid-feedback">
                            Please enter your username.
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
                            <label for="username">Password</label>
                        </div>
                        <div className="invalid-feedback">
                            Please enter correct password.
                        </div>
                    </div>
                    <div className="input-group has-validation mb-4">
                        <span className="input-group-text">
                            <i className="bi bi-envelope-fill fs-3"></i>
                        </span>
                        <div className="form-floating">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Email"
                                required
                                ref={emailRef}
                            />
                            <label for="email">Email</label>
                        </div>
                        <div className="invalid-feedback">
                            Please enter valid & different email.
                        </div>
                    </div>
                    <div className="mt-4 mb-4">
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg w-100"
                        >
                            Sign Up
                        </button>
                    </div>
                    <p className="text-center">
                        Already have an account ?{" "}
                        <Link className="text-decoration-none" to={"/login"}>
                            Login here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
