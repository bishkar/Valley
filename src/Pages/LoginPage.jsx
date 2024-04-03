import LoginForm from "../components/Auth/Loginform.jsx";
import RegisterForm from "../components/Auth/Registerform.jsx";
import PasswordOtpForm from "../components/Auth/Passwordrecoverform.jsx";
import ChangePasswordForm from "../components/Auth/Passwordrecoverconfirmform.jsx";

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
      <RegisterForm />
      <PasswordOtpForm />
      <ChangePasswordForm />
    </div>
  );
};

export default LoginPage;