import './Auth.css';
import { useState } from "react";
import { registerUser } from '../../redux/auth.slice/register.slice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrorMessage from './Errormessage';

const RegisterForm = () => {
    const dispatch = useDispatch();

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({}); // Створюємо об'єкт для зберігання помилок

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (password !== password2) {
            newErrors.password2 = 'Passwords do not match';
        }

        if (password.length < 6 || password.length > 20) {
            newErrors.password = 'Password must be between 6 and 20 characters';
        }

        // Перевірка на велику літеру, цифри та символи в паролі
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        if (!passwordRegex.test(password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
        }

        // Перевірки для інших полів
        if (first_name.length < 3 || first_name.length > 20) {
            newErrors.first_name = 'First name must be between 3 and 20 characters';
        }

        if (last_name.length < 3 || last_name.length > 20) {
            newErrors.last_name = 'Last name must be between 3 and 20 characters';
        }

        if (email.length < 3 || email.length > 20) {
            newErrors.email = 'Invalid Email';
        }

        // Оновлюємо стан помилок
        setErrors(newErrors);

        // Якщо є хоча б одна помилка, не відправляємо дані на сервер
        if (Object.keys(newErrors).length !== 0) {
            return;
        }

        // Відправляємо дані на сервер
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
                    window.location.href = '/';
                }
            }
        });
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h1>REGISTER</h1>
                <label className="form-label" htmlFor="firstName">First Name:</label>
                <input className="form-input" type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                {errors.first_name && <ErrorMessage message={errors.first_name} />}
                <label className="form-label" htmlFor="lastName">Last Name:</label>
                <input className="form-input" type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} />
                {errors.last_name && <ErrorMessage message={errors.last_name} />}
                <label className="form-label" htmlFor="email">Email:</label>
                <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <ErrorMessage message={errors.email} />}
                <label className="form-label" htmlFor="password">Password:</label>
                <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {errors.password && <ErrorMessage message={errors.password} />}
                <label className="form-label" htmlFor="confirmPassword">Confirm Password:</label>
                <input className="form-input" type="password" value={password2} onChange={(e) => setConfirmPassword(e.target.value)} />
                {errors.password2 && <ErrorMessage message={errors.password2} />}

                <button type="submit" className="form-button">Continue</button>

                <div className="content-container">
                    <p>Already have an account? <Link to="/login" className="form-link">Login</Link></p>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;
