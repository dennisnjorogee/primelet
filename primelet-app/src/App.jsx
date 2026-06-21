import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login.jsx"
import Footer from "./components/Footer"
import House from "./pages/House.jsx"

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />

      <main className="flex-1 pt-20">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/house" element={<House />} />
        </Routes>
      </main>

      <Footer />

    </div>
  )
}

export default App