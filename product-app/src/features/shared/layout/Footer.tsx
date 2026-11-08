import { Link } from "react-router-dom";
import { ShoppingBasket } from "lucide-react";

const footerLinkClass =
  "text-sm text-cream-200 transition-colors hover:text-wheat-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wheat-400 rounded";

const Footer = () => {
  return (
    <footer className="mt-auto bg-forest-800 text-cream-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:flex-row sm:justify-between sm:px-6">

        <div className="max-w-xs">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-wheat-400 text-forest-800">
              <ShoppingBasket size={18} aria-hidden="true" />
            </span>
            <strong className="text-base font-semibold text-cream-50">Store Market</strong>
          </div>
          <p className="mt-3 text-sm text-cream-300">Tu catalogo, en un solo lugar.</p>
        </div>

        <nav aria-label="Enlaces del pie de página" className="flex flex-col gap-2">
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-wheat-300">
            Explorar
          </h3>

          <Link to="/products" className={footerLinkClass}>Productos</Link>

          <Link to="/products/new" className={footerLinkClass}>Nuevo producto</Link>
        </nav>

      </div>

      <p className="border-t border-forest-600 px-4 py-4 text-center text-xs text-cream-300">
        © {new Date().getFullYear()} StoreHub · Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
