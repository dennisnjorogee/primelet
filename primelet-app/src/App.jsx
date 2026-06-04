import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />

      <main className="flex-1 pt-20">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

    </div>
  )
}

export default App