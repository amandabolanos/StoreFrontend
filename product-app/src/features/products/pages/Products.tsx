import { Link } from "react-router-dom"
import { Plus, ShoppingCart } from "lucide-react"
import ProductsTable from "../components/ProductsTable"

const Products = () => {
  return (
    <section aria-labelledby="products-title" className="space-y-8">
      {/* Banner */}
      <div className="flex items-center justify-between gap-6 rounded-3xl bg-green-900 px-6 py-8 text-white sm:px-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-green-200">
            Administración del catálogo
          </p>

          <h1 id="products-title" className="mt-1 text-3xl font-extrabold uppercase sm:text-4xl">
            Productos
          </h1>

          <p className="mt-2 max-w-lg text-sm leading-6 text-green-100">
            Consulta, agrega y administra los productos de tu catálogo.
          </p>

          <Link
            to="/products/new"
            className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-green-600 px-5 py-2.5 text-sm font-bold
                       transition-colors hover:bg-green-500
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Plus size={16} aria-hidden="true" />
            Nuevo producto
          </Link>
        </div>

        <span
          aria-hidden="true"
          className="hidden size-28 shrink-0 items-center justify-center rounded-full bg-green-600 sm:flex"
        >
          <ShoppingCart size={48} />
        </span>
      </div>

      <ProductsTable />
    </section>
  )
}

export default Products