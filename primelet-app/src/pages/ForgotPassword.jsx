
import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"

const ForgotPassword = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [localError, setLocalError] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const backend_url = import.meta.env.VITE_BACKEND_URL

  const handleSubmit = async () => {
    setLocalError("")

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters")
      return
    }
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${backend_url}/api/v1/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ resetToken: token, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setLocalError(data.message || "Reset failed. The link may have expired.")
        return
      }

      setDone(true)
    } catch {
      setLocalError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    "w-full py-3 px-4 border-0 rounded-full bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"

  //Invalid / missing token 
  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="flex flex-col items-center gap-4 p-6 rounded-lg bg-gray-100 shadow-2xl w-full max-w-sm text-center">
          <div className="bg-red-500 px-4 py-2 rounded-full">
            <h1 className="text-white text-xl font-bold">Invalid Link</h1>
          </div>
          <p className="text-gray-600 text-sm">
            This reset link is missing a token. Please request a new one.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 hover:bg-blue-600 transition-colors px-6 py-2 rounded-full text-white font-bold"
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  
  if (done) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="flex flex-col items-center gap-4 p-6 rounded-lg bg-gray-100 shadow-2xl w-full max-w-sm text-center">
          <div className="bg-green-500 px-4 py-2 rounded-full">
            <h1 className="text-white text-xl font-bold">Password Reset!</h1>
          </div>
          <p className="text-gray-600 text-sm">
            Your password has been updated. You can now sign in with your new password.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 hover:bg-blue-600 transition-colors px-6 py-2 rounded-full text-white font-bold"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

 
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="flex flex-col items-center gap-6 p-6 rounded-lg bg-gray-100 shadow-2xl w-full max-w-sm">

        <div className="bg-blue-500 px-4 py-2 rounded-full">
          <h1 className="text-amber-500 text-2xl font-bold">New Password</h1>
        </div>

        <div className="bg-gray-400 px-4 py-2 rounded-2xl">
          <p className="text-white font-semibold text-sm">Choose a strong password</p>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setLocalError("") }}
            className={inputClass}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setLocalError("") }}
            className={inputClass}
          />

          {localError && (
            <p className="text-red-500 text-sm text-center">{localError}</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors px-6 py-2 rounded-full text-white font-bold"
        >
          {loading ? "Resetting…" : "Reset Password"}
        </button>

        <button
          onClick={() => navigate("/login")}
          className="text-blue-500 hover:underline text-sm"
        >
          Back to Login
        </button>

      </div>
    </div>
  )
}

export default ForgotPassword