import type { Product } from "../models/response/Product";
import { config } from "../../../config";
import type { NewProduct } from "../models/request/Product";

const API_URL = `${config.api.url}/api/products`;

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en productService:", error);
    throw error;
  }
}

export async function createProduct(product: NewProduct): Promise<void> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Error al crear el producto: ${response.status}`);
    }
  } catch (error) {
    console.error("Error en ProductService:", error);
    throw error;
  }
}

export async function deleteProduct(productResourceId: string): Promise<void> {
  try {
    const response = await fetch(
      `${API_URL}/${encodeURIComponent(productResourceId)}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error(`Error al eliminar el producto: ${response.status}`);
    }
  } catch (error) {
    console.error("Error en productService:", error);
    throw error;
  }
}

export async function getProductById(
  productResourceId: string,
): Promise<Product> {
  try {
    const response = await fetch(
      `${API_URL}/${encodeURIComponent(productResourceId)}`,
    );
 
    if (!response.ok) {
      throw new Error(`Error al obtener el producto: ${response.status}`);
    }
 
    return await response.json();
  } catch (error) {
    console.error("Error en ProductService:", error);
    throw error;
  }
}
