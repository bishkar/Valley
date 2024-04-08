import './Auth.css';
import { Link } from 'react-router-dom';

const Logout = () => {
    const logout = () => {
        localStorage.setItem('loggedIn', false);
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        window.location.href = '/';
    }

    const cancel = () => {
        window.location.href = '/';
    }

    return (
        <div className="logout-form-container">
            <div className="auth-form">
                <h1>Logout?</h1>
                <button className='form-button' onClick={logout}>Yes</button>
                <button className='form-button' onClick={cancel}>No</button>
            </div>
        </div>
    );
}

export default Logout;