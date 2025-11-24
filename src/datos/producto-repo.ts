// Capa de DATOS: aquí simulamos la "base de datos" en memoria
import { ProductoCalculado } from "../logica/calculo";

// Arreglo en memoria que simula una base de datos
const productos: ProductoCalculado[] = [];

export function guardarProducto(producto: ProductoCalculado): void {
  productos.push(producto);
}

export function obtenerProductos(): ProductoCalculado[] {
  // Devolvemos una copia para evitar modificaciones externas
  return [...productos];
}
