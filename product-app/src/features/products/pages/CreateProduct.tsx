import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { createProduct } from "../services/ProductService";
import type { NewProduct } from "../models/request/Product";
import { useForm } from "react-hook-form";

// Datos que maneja el formulario
type ProductFormValues = {
  name: string;
};

export default function CreateProduct() {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState<string | null>(null);

  // Configuración de React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
    },
  });

  // Se ejecuta cuando el usuario presiona Guardar
  const onSubmit = async (data: ProductFormValues) => {
    setServerError(null);

    // Construimos el request que espera el backend C#
    const request: NewProduct = {
      productResourceId: crypto.randomUUID(),
      name: data.name.trim(),
    };

    try {
      // Llamamos al servicio que ejecuta el POST
      await createProduct(request);

      // Regresamos al listado si se guardó correctamente
      navigate("/products");
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Error al registrar el producto",
      );
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <Link
        to="/products"
        className="mb-6 inline-flex rounded-md text-sm font-medium text-forest-600 hover:text-forest-800 focus-visible:outline-2 focus-visible:outline-forest-600"
      >
        ← Volver a productos
      </Link>
      <div className="rounded-3xl border border-cream-300 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight text-forest-800">
          Agregar producto
        </h1>
        <p className="mb-8 mt-2 text-sm leading-6 text-ink-500">
          Completa la información para agregar un producto al catálogo.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Nombre del producto */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-ink-700"
            >
              Nombre del producto
            </label>

            <input
              id="name"
              type="text"
              placeholder="Ejemplo: Frijoles"
              {...register("name", {
                required: "El nombre es obligatorio",
                validate: (value) =>
                  value.trim().length >= 2 ||
                  "El nombre debe tener al menos 2 caracteres",
              })}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="w-full rounded-xl border border-cream-300 bg-cream-50 text-ink-900 placeholder:text-ink-500/60
                         px-4 py-2.5 outline-none transition-colors
                         focus:border-forest-500 focus:bg-white focus:ring-2
                         focus:ring-forest-200
                         aria-invalid:border-clay-600 aria-invalid:ring-clay-200"
            />

            {/* Mensaje de validación */}
            {errors.name && (
              <p
                id="name-error"
                role="alert"
                className="mt-2 text-sm text-clay-600"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Error devuelto por el servicio */}
          {serverError && (
            <p
              role="alert"
              className="rounded-lg border border-clay-200 bg-clay-50 p-3 text-sm text-clay-700"
            >
              {serverError}
            </p>
          )}

          {/* Botones */}
          <div className="flex flex-col-reverse gap-3 border-t border-cream-200 pt-5 sm:flex-row sm:justify-end">
            <Link
              to="/products"
              className="rounded-xl border border-cream-300 text-center text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-forest-600
                         px-5 py-2.5 text-ink-700
                         hover:bg-cream-200"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-forest-700 px-5 py-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-600
                         font-medium text-cream-50
                         hover:bg-forest-800
                         disabled:cursor-not-allowed
                         disabled:opacity-50"
            >
              {isSubmitting ? "Guardando..." : "Guardar producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
