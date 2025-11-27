import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginSide from "../Components/LoginSide.jsx";
import "../Css/Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Validate inputs on the client
    const validate = () => {
        if (!email.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email";
        if (!password.trim()) return "Password is required";
        if (password.length < 6) return "Password must be at least 6 characters";
        return null;
    };

    // Local fallback for offline / dev mode
    const localFallbackLogin = () => {
        // simple mock credentials for local testing
        if (email === "test@example.com" && password === "123456") {
            // store token in sessionStorage for this example
            sessionStorage.setItem("authToken", "local-dev-token");
            return true;
        }
        return false;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            // API call to backend login endpoint
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                // if server returned a clear client error, show it
                const msg = data.message || `Login failed (${res.status})`;
                setError(msg);
                setLoading(false);
                return;
            }

            // expected response: { token, user }
            const { token, user } = data;
            if (token) {
                // store token (using sessionStorage here; switch to localStorage or httpOnly cookie as needed)
                sessionStorage.setItem("authToken", token);
                if (user) sessionStorage.setItem("user", JSON.stringify(user));
                navigate("/");
            } else {
                setError("Invalid server response");
            }
        } catch (err) {
            // Network error or API not reachable -> fallback to local mock so page still works in dev
            const ok = localFallbackLogin();
            if (ok) {
                navigate("/");
            } else {
                setError("Network error or server unreachable. If you're offline, use test@example.com / 123456 for local login.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex gap-6 container-login align-items-center">
            <div className="side-Photo pt-5">
                <LoginSide />
            </div>

            <div className="container-main p-5 d-flex flex-column gap-4">
                <div className="text d-flex flex-column gap-4">
                    <h2>Log in to Exclusive</h2>
                    <p>Enter your details below</p>
                </div>

                {error && <p className="text-danger">{error}</p>}

                <form className="container-form d-flex flex-column gap-3" onSubmit={handleLogin} noValidate>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="submit-section d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4">
                        <button type="submit" className="btn btn-danger" disabled={loading}>
                            {loading ? "Logging in..." : "Log In"}
                        </button>
                        <Link to="/signup" className="text-danger text-decoration-none">
                            Don't have an account?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
