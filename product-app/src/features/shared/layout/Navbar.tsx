import { NavLink } from "react-router-dom"
import { Plus, ShoppingBasket } from "lucide-react"

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors
   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wheat-400 ${
     isActive
       ? "bg-cream-100 text-forest-800"
       : "text-cream-100 ring-1 ring-cream-100/30 hover:bg-forest-600"
   }`

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-forest-700 shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <NavLink
          to="/products"
          aria-label="Store — Productos"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wheat-400"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-wheat-400 text-forest-800">
            <ShoppingBasket size={20} aria-hidden="true" />
          </span>
          <strong className="text-lg font-semibold tracking-tight text-cream-50">
            Store <span className="font-normal text-wheat-300">Market</span>
          </strong>
        </NavLink>

        <nav aria-label="Navegación principal" className="flex items-center gap-2">
          <NavLink to="/products" end className={navLinkClass}>
            Productos
          </NavLink>

          <NavLink to="/products/new" className={navLinkClass}>
            <Plus size={16} aria-hidden="true" />
            Nuevo producto
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
