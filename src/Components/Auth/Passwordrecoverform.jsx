import './Auth.css';

import { useState } from "react";
import { useDispatch } from 'react-redux';

import { sendCode } from '../../redux/auth.slice/restorePassword.slice';
import { confirmCode } from '../../redux/auth.slice/restorePassword.slice';
import ErrorMessage from './Errormessage';

const PasswordOtpForm = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [otp, setOTP] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmitSendOTP = (e) => {
        e.preventDefault();
    
        dispatch(sendCode(email))
            .then((response) => {
                if (response.payload) {
                    setErrors({email: "Code sent to your email"});
                } else if (response.error) {
                    setErrors({ email: "Invalid Email" });
                }
            });
    }
    
    const handleSubmitConfirmCode = (e) => {
        e.preventDefault();
        const promise = dispatch(confirmCode({ email, otp }));
    
        if (!promise || !promise.then || !promise.catch) {
            setErrors({ otp: "Invalid Code" });
        } else {
            promise.then(result => {
                const restoreToken = result.payload.restore_token;
                localStorage.setItem('restore_token', restoreToken);
                localStorage.setItem('email', email);
                window.location.href = '/recover/change-password';
            })
            .catch(error => {
                setErrors({ otp: "Invalid Code" });
            });
        }
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
                    {errors.email && <ErrorMessage message={errors.email} />}
                </form>
                <form onSubmit={handleSubmitConfirmCode} className="auth-form code-form no-background">
                <label className="form-label" htmlFor="password">Code:</label>
                    <input className="form-input" type="text" value={otp} onChange={(e) => setOTP(e.target.value)} />
                    {errors.otp && <ErrorMessage message={errors.otp} />}
                    <button type="submit" className="form-button">Confirm</button>
                </form>
                </div>
        </div>
    );
}

export default PasswordOtpForm;