import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Product } from "../models/response/Product";
import { getProductById } from "../services/ProductService";
 
export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
 
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  useEffect(() => {
    if (!id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError("Identificador de producto no válido");
      setIsLoading(false);
      return;
    }
 
    let active = true;
 
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
 
        const data = await getProductById(id);
 
        if (active) {
          setProduct(data);
        }
      } catch (error) {
        if (active) {
          setError(
            error instanceof Error
              ? error.message
              : "Error al obtener el producto",
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };
 
    loadProduct();
 
    return () => {
      active = false;
    };
  }, [id]);
 
  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-3xl border border-cream-300 bg-white shadow-sm">
        <div className="flex items-center gap-4 bg-forest-100 px-6 py-6 sm:px-8">
          <span
            aria-hidden="true"
            className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-cream-50 text-2xl font-bold text-forest-700"
          >
            {product?.name?.charAt(0).toUpperCase() ?? "?"}
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-forest-800">
            Detalle del producto
          </h2>
        </div>

        <div className="p-6 sm:p-8">
 
        {isLoading && <p role="status" className="text-sm text-ink-500">Cargando producto...</p>}
 
        {error && (
          <p role="alert" className="rounded-lg border border-clay-200 bg-clay-50 p-3 text-sm text-clay-700">
            {error}
          </p>
        )}
 
        {!isLoading && !error && product && (
          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-wheat-600">
                Product Resource ID
              </label>
 
              <p className="mt-1.5 break-all rounded-xl border border-cream-200 bg-cream-50 p-3 font-mono text-sm text-ink-700">
                {product.productResourceId}
              </p>
            </div>
 
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-wheat-600">
                Nombre del producto
              </label>
 
              <p className="mt-1.5 rounded-xl border border-cream-200 bg-cream-50 p-3 text-lg font-medium text-ink-900">
                {product.name}
              </p>
            </div>
          </div>
        )}
 
        <div className="mt-8 flex justify-end border-t border-cream-200 pt-6">
          <Link
            to="/products"
            className="rounded-xl bg-forest-700 px-5 py-2.5 text-sm font-medium text-cream-50 transition-colors hover:bg-forest-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-600"
          >
            Volver a productos
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}