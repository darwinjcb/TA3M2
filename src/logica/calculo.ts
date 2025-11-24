// Capa de LÓGICA: aquí definimos las reglas del negocio

export interface ProductoEntrada {
  nombre: string;
  precioUnitario: number;
  cantidad: number;
}

export interface ProductoCalculado extends ProductoEntrada {
  subtotal: number;
  iva: number;
  total: number;
}

// Puedes cambiar el valor del IVA si tu país usa otro
const IVA_PORCENTAJE = 0.12; // 12%

export function calcularSubtotal(producto: ProductoEntrada): number {
  return producto.precioUnitario * producto.cantidad;
}

export function calcularIva(subtotal: number): number {
  return subtotal * IVA_PORCENTAJE;
}

export function calcularTotal(subtotal: number, iva: number): number {
  return subtotal + iva;
}

export function crearProductoCalculado(
  datos: ProductoEntrada
): ProductoCalculado {
  const subtotal = calcularSubtotal(datos);
  const iva = calcularIva(subtotal);
  const total = calcularTotal(subtotal, iva);

  return {
    ...datos,
    subtotal,
    iva,
    total,
  };
}
