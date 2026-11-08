import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <section
      aria-labelledby="not-found-title"
      className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-cream-300 bg-cream-50 px-6 py-14 text-center shadow-sm"
    >
      <span aria-hidden="true" className="text-8xl font-bold tracking-tight text-forest-200">
        404
      </span>

      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-wheat-600">
        Error 404 · Fuera de ruta
      </p>

      <h1 id="not-found-title" className="mt-3 text-3xl font-bold tracking-tight text-forest-800">
        Esta página no existe
      </h1>

      <p className="mt-3 text-sm leading-6 text-ink-500">
        La dirección puede haber cambiado o estar escrita incorrectamente.
        Regresa al catálogo y encuentra tu próximo producto.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/products"
          className="rounded-xl border border-cream-300 bg-white px-5 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-cream-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-600"
        >
          Volver a productos
        </Link>

        <Link
          to="/products/new"
          className="rounded-xl bg-forest-700 px-5 py-2.5 text-sm font-medium text-cream-50 transition-colors hover:bg-forest-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-600"
        >
          Crear producto <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}

export default NotFound
