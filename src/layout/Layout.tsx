import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"


const Layout = () => {
  return (
    <div className="bg-[#F3F4F6] min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout