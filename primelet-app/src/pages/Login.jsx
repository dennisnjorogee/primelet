import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register_user, login_user, forgot_password, loading } = useAppContext();

  const [view, setView] = useState('login');
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', emailAddress: '', password: '', confirmPassword: ''
  });
  const [localError, setLocalError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLocalError('');
  };

  const handleSubmit = async () => {
    if (view === 'register') {
      if (!formData.firstName.trim())  { setLocalError('First name is required'); return; }
      if (!formData.lastName.trim())   { setLocalError('Last name is required');  return; }
      if (formData.password.length < 6){ setLocalError('Password must be at least 6 characters'); return; }
      if (formData.password !== formData.confirmPassword) { setLocalError('Passwords do not match'); return; }
    }
    if (!formData.emailAddress.trim()) { setLocalError('Email is required'); return; }

    // API calls via context 
    if (view === 'register') {
      const result = await register_user({
        firstName:    formData.firstName,
        lastName:     formData.lastName,
        emailAddress: formData.emailAddress,
        password:     formData.password,
      });
      if (result) {
        setView('login');
        setFormData({ firstName: '', lastName: '', emailAddress: '', password: '', confirmPassword: '' });
      }
    }

    if (view === 'login') {
      const result = await login_user({
        emailAddress: formData.emailAddress,
        password:     formData.password,
      });
      if (result) {
        navigate('/'); 
      }
    }

    if (view === 'reset') {
      const result = await forgot_password({ emailAddress: formData.emailAddress });
      if (result) {
        setLocalError('');
      }
    }
  };

  const config = {
    login:    { title: 'Sign In',        subtitle: 'Sign in to your account',   btn: 'Sign In' },
    register: { title: 'Create Account', subtitle: 'Sign up for a new account', btn: 'Create Account' },
    reset:    { title: 'Reset Password', subtitle: 'Enter your email to reset', btn: 'Send Reset Link' },
  };

  const { title, subtitle, btn } = config[view];

  const inputClass = "w-full py-3 px-4 border-0 rounded-full bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300";

  return (
    <div className="flex flex-col p-6 items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-6 m-2 p-6 rounded-lg bg-gray-100 shadow-2xl w-full max-w-sm">

        <div className="bg-blue-500 px-4 py-2 rounded-full">
          <h1 className="text-amber-500 text-2xl font-bold">{title}</h1>
        </div>

        <div className="bg-gray-400 px-4 py-2 rounded-2xl">
          <p className="text-white font-semibold text-sm">{subtitle}</p>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          {view === "register" && (
            <>
              <input name="firstName"    value={formData.firstName}    onChange={handleChange} className={inputClass} type="text"     placeholder="First Name" />
              <input name="lastName"     value={formData.lastName}     onChange={handleChange} className={inputClass} type="text"     placeholder="Last Name" />
            </>
          )}

          <input name="emailAddress"   value={formData.emailAddress} onChange={handleChange} className={inputClass} type="email"    placeholder="Email" />

          {view !== "reset" && (
            <input name="password"     value={formData.password}     onChange={handleChange} className={inputClass} type="password" placeholder="Password" />
          )}

          {view === "register" && (
            <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={inputClass} type="password" placeholder="Confirm Password" />
          )}

          {localError && (
            <p className="text-red-500 text-sm italic font-semibold bg-red-300/20 py-4 px-5 text-center">{localError}</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors px-6 py-2 rounded-full cursor-pointer text-white font-bold"
        >
          {loading ? 'Please wait…' : btn}
        </button>

        <div className="flex flex-col items-center gap-2 text-sm">
          {view === "login" && (
            <>
              <button onClick={() => setView("reset")}    className="text-blue-500 hover:underline">Forgot password?</button>
              <p className="text-gray-500">Don't have an account?{" "}
                <button onClick={() => setView("register")} className="text-blue-500 hover:underline font-semibold">Create Account</button>
              </p>
            </>
          )}
          {view === "register" && (
            <p className="text-gray-500">Already have an account?{" "}
              <button onClick={() => setView("login")} className="text-blue-500 hover:underline font-semibold">Sign In</button>
            </p>
          )}
          {view === "reset" && (
            <button onClick={() => setView("login")} className="text-blue-500 hover:underline">Back to Sign In</button>
          )}
        </div>

      </div>
    </div>
  );
};

export default Login;