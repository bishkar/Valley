import './Auth.css';

import { useState } from "react";
import { useDispatch } from 'react-redux';

import { sendCode } from '../../redux/auth.slice/restorePassword.slice';
import { confirmCode } from '../../redux/auth.slice/restorePassword.slice';


const PasswordOtpForm = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [otp, setOTP] = useState("");

    const handleSubmitSendOTP = (e) => {
        e.preventDefault();

        dispatch(sendCode(email));
    }

    const handleSubmitConfirmCode = (e) => {
        e.preventDefault();
        const promise = dispatch(confirmCode({ email, otp }));
    
        promise.then(result => {
            const restoreToken = result.payload.restore_token;
            console.log(restoreToken);
            localStorage.setItem('restore_token', restoreToken);
            localStorage.setItem('email', email);
        });
    }

    return (
        <div className="form-container">
            <div className="auth-form">
                <form onSubmit={handleSubmitSendOTP} className="auth-form mail-form no-background">
                    <h1>PASSWORD RECOVER</h1>
                    <label className="form-label" htmlFor="email">Email:</label>
                    <div className="input-mail-div">
                        <input className="form-input mail-send-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button type="submit" className="form-button-send">Send</button>
                    </div>
                </form>
                <form onSubmit={handleSubmitConfirmCode} className="auth-form code-form no-background">
                <label className="form-label" htmlFor="password">Code:</label>
                    <input className="form-input" type="text" value={otp} onChange={(e) => setOTP(e.target.value)} />
                    <button type="submit" className="form-button">Confirm</button>
                </form>
                </div>
        </div>
    );
}

export default PasswordOtpForm;