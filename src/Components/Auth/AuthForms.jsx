import React from "react";
import './Auth.css';

import { useState } from "react";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h1>LOGIN</h1>
                <label className="form-label" htmlFor="email">Email:</label>
                <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className="form-label" htmlFor="password">Password:</label>
                <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="checkbox-container">
                    <input type="checkbox" id="remember" name="remember" className="checkbox"/>
                    <label htmlFor="remember">Stay signed in</label>
                </div>

                <button type="submit" className="form-button">Continue</button>
            </form>
        </div>
    );
}

export default LoginForm;
