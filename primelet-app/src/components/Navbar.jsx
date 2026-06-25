import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import ProfileMenu, { Avatar } from "./ProfileMenu"

const NAV_LINKS = [
  { to: "/",        label: "Home" },
  { to: "/about",   label: "About Us" },
  { to: "/house",   label: "Find House" },
  { to: "/recent",  label: "Recent Update" },
  { to: "/contact", label: "Get in Touch" },
]

const Navbar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { authUser, logout_user } = useAppContext()

  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const isLoginPage = pathname === "/login"

  const handleMobileLogout = async () => {
    setMenuOpen(false)
    await logout_user()
    navigate("/login")
  }

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-primary text-white shadow-2xl z-50">
      <div className="flex justify-between items-center h-full px-6 md:px-10">

        {/* Logo */}
        <h1
          className="text-lg font-bold cursor-pointer select-none"
          onClick={() => navigate("/")}
        >
          Primelet
        </h1>

        {/* Desktop nav links */}
        {!isLoginPage && (
          <nav className="hidden md:flex gap-6">
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className="navbar">{label}</Link>
            ))}
          </nav>
        )}

        {/* Desktop right slot */}
        <div className="hidden md:flex items-center">
          {authUser ? (
            <ProfileMenu
              open={dropdownOpen}
              onToggle={() => setDropdownOpen(v => !v)}
              onClose={() => setDropdownOpen(false)}
            />
          ) : (
            <button
              className="text-white px-5 rounded-full bg-blue-500 py-2 hover:bg-blue-600 transition-colors font-medium"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>

        {/* Hamburger — hidden on login page */}
        {!isLoginPage && (
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 p-2"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        )}

      </div>

      {/* Mobile drawer */}
      {!isLoginPage && (
        <div className={`md:hidden bg-primary overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-screen py-4 shadow-lg" : "max-h-0"}`}>

          <nav className="flex flex-col px-6">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="navbar py-3 border-b border-white/10"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="px-6 mt-4">
            {authUser ? (
              <div className="flex flex-col gap-1">
                {/* User info row */}
                <div className="flex items-center gap-3 py-3 border-b border-white/10">
                  <Avatar user={authUser} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{authUser.firstName} {authUser.lastName}</p>
                    <p className="text-xs text-white/60 truncate">{authUser.emailAddress}</p>
                  </div>
                </div>

                <Link to="/profile"    onClick={() => setMenuOpen(false)} className="py-2.5 text-sm text-white/80 hover:text-white transition-colors">My Profile</Link>
                <Link to="/dashboard"  onClick={() => setMenuOpen(false)} className="py-2.5 text-sm text-white/80 hover:text-white transition-colors">Dashboard</Link>
                <Link to="/settings"   onClick={() => setMenuOpen(false)} className="py-2.5 text-sm text-white/80 hover:text-white transition-colors">Settings</Link>

                <button
                  onClick={handleMobileLogout}
                  className="text-left py-2.5 text-sm text-red-400 hover:text-red-300 transition-colors mt-1 border-t border-white/10"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="w-full text-white px-4 rounded-full bg-blue-500 py-2 hover:bg-blue-600 transition-colors font-medium"
                onClick={() => { navigate("/login"); setMenuOpen(false) }}
              >
                Login
              </button>
            )}
          </div>

        </div>
      )}

    </header>
  )
}

export default Navbar