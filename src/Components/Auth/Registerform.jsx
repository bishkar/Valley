import './Auth.css';

import useFetch from "../../hooks/useFetch";

import { useState } from "react";
import { registerUser } from '../../redux/auth.slice/register.slice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    const dispatch = useDispatch();

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            first_name,
            last_name,
            email,
            password,
            password2
        }

        dispatch(registerUser(data)).then((response) => {
            if (response.payload) {
                if (localStorage.getItem('accessToken')) {
                    console.log('logged in');
                    window.location.href = '/';
                }
                console.log('not logged in');
            }
        })

        

    }


    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h1>REGISTER</h1>
                <label className="form-label" htmlFor="firstName">First Name:</label>
                <input className="form-input" type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                <label className="form-label" htmlFor="lastName">Last Name:</label>
                <input className="form-input" type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} />
                <label className="form-label" htmlFor="email">Email:</label>
                <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className="form-label" htmlFor="password">Password:</label>
                <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label className="form-label" htmlFor="confirmPassword">Confirm Password:</label>
                <input className="form-input" type="password" value={password2} onChange={(e) => setConfirmPassword(e.target.value)} />

                <button type="submit" className="form-button">Continue</button>

                <div className="content-container">
                    <p>Already have an account? <Link to="/login" className="form-link">Login</Link></p>
                </div>

            </form>
        </div>
    );
}

export default RegisterForm;