import { useState } from "react"

const Login = () => {
  const [view, setView] = useState('login')
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', confirmPassword: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = () => {
    if (view === 'register') {
      if (!formData.fullName.trim()) {
        setError('Full name is required')
        return
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters')
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return
      }
    }
    // handle submit logic here
    console.log(view, formData)
  }

  const config = {
    login:    { title: 'Sign In',        subtitle: 'Sign in to your account',    btn: 'Sign In' },
    register: { title: 'Create Account', subtitle: 'Sign up for a new account',  btn: 'Create Account' },
    reset:    { title: 'Reset Password', subtitle: 'Enter your email to reset',  btn: 'Send Reset Link' },
  }

  const { title, subtitle, btn } = config[view]

  const inputClass = "w-full py-3 px-4 border-0 rounded-full bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"

  return (
    <div className='flex flex-col p-6 items-center justify-center min-h-screen'>
      <div className="flex flex-col items-center gap-6 m-2 p-6 rounded-lg bg-gray-100 shadow-2xl w-full max-w-sm">

        {/* Title */}
        <div className="bg-blue-500 px-4 py-2 rounded-full">
          <h1 className="text-amber-500 text-2xl font-bold">{title}</h1>
        </div>

        {/* Subtitle */}
        <div className="bg-gray-400 px-4 py-2 rounded-2xl">
          <p className="text-white font-semibold text-sm">{subtitle}</p>
        </div>

        {/* Fields */}
        <div className="flex flex-col items-center gap-4 w-full">

          {/* Full Name — register only */}
          {view === 'register' && (
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={inputClass}
              type="text"
              placeholder="Full Name"
            />
          )}

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            type="email"
            placeholder="Email"
          />

          {view !== 'reset' && (
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={inputClass}
              type="password"
              placeholder="Password"
            />
          )}

          {view === 'register' && (
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={inputClass}
              type="password"
              placeholder="Confirm Password"
            />
          )}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 transition-colors px-6 py-2 rounded-full cursor-pointer text-white font-bold"
        >
          {btn}
        </button>

        {/* Footer links */}
        <div className="flex flex-col items-center gap-2 text-sm">
          {view === 'login' && (
            <>
              <button onClick={() => setView('reset')} className="text-blue-500 hover:underline">
                Forgot password?
              </button>
              <p className="text-gray-500">
                Don't have an account?{' '}
                <button onClick={() => setView('register')} className="text-blue-500 hover:underline font-semibold">
                  Create one
                </button>
              </p>
            </>
          )}

          {view === 'register' && (
            <p className="text-gray-500">
              Already have an account?{' '}
              <button onClick={() => setView('login')} className="text-blue-500 hover:underline font-semibold">
                Sign In
              </button>
            </p>
          )}

          {view === 'reset' && (
            <button onClick={() => setView('login')} className="text-blue-500 hover:underline">
              Back to Sign In
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

export default Login