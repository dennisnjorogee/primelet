import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const isLoginPage = location.pathname === '/login'

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-white shadow-2xl z-50">
      <div className="flex justify-between items-center h-full px-6 md:px-10">

        {/* Logo */}
         <h1 className="text-lg font-bold text-blue-500 cursor-pointer" onClick={() => navigate('/')}>Primelet</h1>

        {/* Desktop Nav — hidden on login page */}
        {!isLoginPage && (
          <nav className="hidden md:flex gap-6">
            <Link to='/' className="navbar">Home</Link>
            <Link to='/about' className="navbar">About Us</Link>
            <Link to='/house' className="navbar">Find House</Link>
            <Link to='/recent' className="navbar">Recent Update</Link>
            <Link to='/contact' className="navbar">Get in Touch</Link>
          </nav>
        )}

        {/* Desktop Login */}
        <div className="hidden md:flex">
          <button
            className="text-white px-4 rounded-full bg-blue-500 py-2 hover:bg-blue-600 transition-colors"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>

        {/* Hamburger — hidden on login page */}
        {!isLoginPage && (
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        )}

      </div>

      {/* Mobile Menu — hidden on login page */}
      {!isLoginPage && (
        <div className={`md:hidden bg-white shadow-lg overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-80 py-4' : 'max-h-0'}`}>
          <nav className="flex flex-col items-start gap-1 px-6">
            <Link to='/' className="navbar w-full py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to='/about' className="navbar w-full py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to='/house' className="navbar w-full py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>Find House</Link>
            <Link to='/recent' className="navbar w-full py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>Recent Update</Link>
            <Link to='/contact' className="navbar w-full py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>Get in Touch</Link>
          </nav>
          <div className="px-6 mt-4">
            <button
              className="w-full text-white px-4 rounded-full bg-blue-500 py-2 hover:bg-blue-600 transition-colors"
              onClick={() => { navigate('/login'); setIsOpen(false) }}
            >
              Login
            </button>
          </div>
        </div>
      )}

    </header>
  )
}

export default Navbar