import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {

 const navigate = useNavigate()

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-white shadow-2xl z-50">

      <div className="flex justify-between items-center h-full px-10">

        <h1 className="text-lg text-blue-500">
          AutoSales
        </h1>

        <nav className="flex gap-6 w-[90vh]p-4">
          <Link to='/' className="navbar">Home</Link>
          <Link to='/browse-cars' className="navbar">Browse Cars</Link>
          <Link to='/dealership' className="navbar">Dealership</Link>
          <Link to='/about' className="navbar">About Us</Link>
          <Link to='/contact' className="navbar">Get in Touch</Link>
        </nav>

        <div className="flex ">
          <h1 className="text-white px-4 rounded-full bg-amber-500 py-2 hover:text-white mr-2">search</h1>
          <button className="text-white px-4 rounded-full bg-blue-500 py-2 hover:text-white" onClick={() => navigate('/login')}>Login</button>
        </div>

      </div>
    </header>
  )
}

export default Navbar