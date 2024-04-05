import './Auth.css';

const Logout = () => {
    const logout = () => {
        localStorage.setItem('loggedIn', false);
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        window.location.href = '/';
    }

    return (
        <div className="form-container">
            <div className="auth-form">
                <h1>Logout?</h1>
                <button className='form-button' onClick={logout}>Yes</button>
                <button className='form-button' >No</button>
            </div>
        </div>
    );
}

export default Logout;