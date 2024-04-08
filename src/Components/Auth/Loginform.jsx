import './Auth.css';

import { useState } from "react";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/auth.slice/login.slice';
import ReactFacebookLogin from 'react-facebook-login';
import { loginUserFacebook } from '../../redux/auth.slice/facebook.slice';

import { Link } from 'react-router-dom';

const LoginForm = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email,
            password
        }

        dispatch(loginUser(data)).then((response) => {
            if (response.payload) {
                if (localStorage.getItem('accessToken')) {
                    window.location.href = '/';
                }
            }
        })
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h1>LOGIN</h1>
                <label className="form-label" htmlFor="email">Email:</label>
                <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className="form-label" htmlFor="password">Password:</label>
                <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="link-container">
                    <Link to="/recover" className="form-link">Forgot password?</Link>
                </div>

                <button type="submit" className="form-button">Continue</button>

                <div className="social-media-container">
                    <ReactFacebookLogin
                        appId="394073726712169"
                        autoLoad={false}
                        fields="name,email,picture"
                        responseType='token'
                        callback={(response) => {dispatch(loginUserFacebook({auth_token: response.accessToken}))}}             
                        cssClass="facebook-button"
                        icon="fa-facebook"
                    />
                </div>
{/* dispatch(loginUserFacebook({auth_token: response.accessToken}))} */}
                <div className="content-container">
                    <p>Don't have an account? <Link to="/register" className="form-link">Create account</Link></p>
                </div>

            </form>
        </div>
    );
}

export default LoginForm;