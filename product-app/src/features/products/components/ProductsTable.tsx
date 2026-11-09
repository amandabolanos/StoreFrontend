import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../models/response/Product";
import { deleteProduct, getProducts } from "../services/ProductService";
import { Package, Trash2 } from "lucide-react";

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Error al obtener los productos",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleDelete = async (productResourceId: string) => {
    const confirmed = window.confirm(
      "¿Está seguro de que desea eliminar este producto?",
    );

    if (!confirmed) return;

    setDeletingId(productResourceId);
    setError(null);

    try {
      await deleteProduct(productResourceId);

      // Quitar la tarjeta sin recargar la página
      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.productResourceId !== productResourceId,
        ),
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el producto",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Título de la sección */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-extrabold text-ink-900">Nuestros productos</h2>

        {!isLoading && (
          <span className="text-sm text-ink-500">
            {products.length} {products.length === 1 ? "producto" : "productos"}
          </span>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {isLoading ? (
        <p
          role="status"
          className="flex items-center justify-center gap-3 py-16 text-sm text-ink-500"
        >
          <span
            aria-hidden="true"
            className="size-5 animate-spin rounded-full border-2 border-green-200 border-t-green-600"
          />
          Cargando productos...
        </p>
      ) : products.length === 0 && !error ? (
        <p className="rounded-2xl bg-white py-14 text-center text-sm text-ink-500">
          Aún no hay productos en el catálogo.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <li
              key={product.productResourceId}
              className="group relative flex flex-col rounded-2xl bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Espacio de la "foto" del producto */}
              <div className="flex aspect-square items-center justify-center rounded-xl bg-green-50 text-green-600">
                <Package size={44} strokeWidth={1.5} aria-hidden="true" />
              </div>

              {/* Botón eliminar en la esquina, como el "+" de la imagen */}
              <button
                type="button"
                onClick={() => handleDelete(product.productResourceId)}
                disabled={deletingId !== null}
                title={`Eliminar ${product.name}`}
                aria-label={`Eliminar ${product.name}`}
                className="absolute top-5 right-5 z-10 flex size-8 items-center justify-center rounded-full bg-white text-red-600 shadow
                           transition-colors hover:bg-red-600 hover:text-white
                           focus-visible:outline-2 focus-visible:outline-red-600
                           disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={16} aria-hidden="true" />
              </button>

              <Link
                to={`/products/${product.productResourceId}`}
                className="mt-3 rounded font-bold text-ink-900 after:absolute after:inset-0 after:content-[''] hover:text-green-700
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                {product.name}
              </Link>

              <span className="mt-1 truncate font-mono text-[11px] text-ink-500">
                {product.productResourceId.slice(0, 8)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
