import './Auth.css';

import { useState } from "react";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/auth.slice/login.slice';
import ReactFacebookLogin from 'react-facebook-login';
import { loginUserFacebook } from '../../redux/auth.slice/facebook.slice';

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

        dispatch(loginUser(data));
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

                <div className="social-media-container">
                    <ReactFacebookLogin
                        appId="394073726712169"
                        autoLoad={false}
                        fields="name,email,picture"
                        responseType='token'
                        callback={(response) => console.log(response)}
                        cssClass="facebook-button"
                        icon="fa-facebook"
                        // dispatch(loginUserFacebook({ token: response.accessToken }))
                    />
                </div>

                <button type="submit" className="form-button">Continue</button>
            </form>
        </div>
    );
}

export default LoginForm;