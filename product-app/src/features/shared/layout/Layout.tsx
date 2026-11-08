import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = () => {
  return (
    <div className="flex min-h-svh flex-col bg-cream-100">
      <Navbar/>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <Outlet/>
      </main>

      <Footer/>
    </div>
  )
}

export default Layout
