import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../models/response/Product";
import { deleteProduct, getProducts } from "../services/ProductService";
import { Trash2 } from "lucide-react";

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

      // Actualizar la tabla sin recargar la página
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
    <div className="overflow-hidden rounded-3xl border border-cream-300 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cream-300 px-6 py-5">
        <h2 className="text-lg font-semibold text-forest-800">Lista de productos</h2>

        {!isLoading && (
          <span className="rounded-full bg-cream-200 px-3 py-1 text-xs font-medium text-ink-700">
            {products.length} {products.length === 1 ? "producto" : "productos"}
          </span>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="m-5 rounded-xl border border-clay-200 bg-clay-50 p-4 text-sm text-clay-700"
        >
          {error}
        </div>
      )}

      {isLoading ? (
        <p
          role="status"
          className="flex items-center justify-center gap-3 px-6 py-16 text-center text-sm text-ink-500"
        >
          <span
            aria-hidden="true"
            className="size-5 animate-spin rounded-full border-2 border-forest-200 border-t-forest-600"
          />
          Cargando productos...
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-forest-700 text-xs uppercase tracking-wider text-cream-100">
              <tr>
                <th scope="col" className="px-6 py-3.5 font-semibold">Product Resourse ID</th>
                <th scope="col" className="px-6 py-3.5 font-semibold">Nombre</th>
                <th scope="col" className="px-6 py-3.5 text-center font-semibold">Acciones</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-cream-200">
              {products.length === 0 && !error && (
                <tr>
                  <td colSpan={3} className="px-6 py-14 text-center text-sm text-ink-500">
                    Aún no hay productos en el catálogo.
                  </td>
                </tr>
              )}

              {products.map((product) => (
                <tr
                  key={product.productResourceId}
                  className="transition-colors odd:bg-white even:bg-cream-50 hover:bg-forest-50"
                >
                  <td className="px-6 py-4 font-mono text-xs text-ink-500">{product.productResourceId}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/products/${product.productResourceId}`}
                      className="rounded font-medium text-forest-700 underline-offset-4 hover:text-forest-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-600"
                    >
                      {product.name}
                    </Link>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleDelete(product.productResourceId)}
                      disabled={deletingId !== null}
                      title={`Eliminar ${product.name}`}
                      aria-label={`Eliminar ${product.name}`}
                      className="rounded-lg p-2.5 text-clay-600 transition-colors focus-visible:outline-2 focus-visible:outline-clay-600
                                 hover:bg-clay-50
                                 disabled:cursor-not-allowed
                                 disabled:opacity-50"
                    >
                      <Trash2 size={18} aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
