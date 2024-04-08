import './Auth.css';

import { useState } from "react";
import { useDispatch } from 'react-redux';
import { changePassword } from '../../redux/auth.slice/restorePassword.slice';

const ChangePasswordForm = () => {
    const dispatch = useDispatch();

    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (password !== password1) {
            alert("Passwords do not match");
            return;
        } else if (password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        } else {
            const email = localStorage.getItem('email');
            const restore_token = localStorage.getItem('restore_token');

            const data = {
                restore_token,
                password,
                email,
            }

            dispatch(changePassword(data)).then((response) => {
                if (response.payload) {
                    alert("Password changed successfully");
                    window.location.href = '/login';
                }
            })

            localStorage.removeItem('email');
            localStorage.removeItem('restore_token');

        }
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h1>Change Password</h1>
                <label className="form-label" htmlFor="email">Password:</label>
                <input className="form-input" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label className="form-label" htmlFor="password">Password:</label>
                <input className="form-input" type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} />

                <button type="submit" className="form-button">Change Password</button>
            </form>
        </div>
    );
}

export default ChangePasswordForm;