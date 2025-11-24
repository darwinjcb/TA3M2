// Capa de PRESENTACIÓN: interacción con el usuario por consola

import * as readlineSync from "readline-sync";
import {
    ProductoEntrada,
    crearProductoCalculado,
} from "../logica/calculo";
import {
    guardarProducto,
    obtenerProductos,
} from "../datos/producto-repo";

function mostrarMenu(): void {
    console.log("=====================================");
    console.log("S I S T E M A  D E  P R O D U C T O S");
    console.log("=====================================");
    console.log("1. Ingresar producto");
    console.log("2. Listar productos");
    console.log("3. Salir");
    console.log("=====================================");
}

function ingresarProducto(): void {
    console.log("\n--- Ingreso de producto ---");

    const nombre = readlineSync.question("Nombre del producto: ");

    const precioUnitario = Number(
        readlineSync.question("Precio unitario: ")
    );

    const cantidad = Number(
        readlineSync.question("Cantidad: ")
    );

    if (isNaN(precioUnitario) || isNaN(cantidad)) {
        console.log("⚠ Precio y cantidad deben ser números.");
        return;
    }

    const datosEntrada: ProductoEntrada = {
        nombre,
        precioUnitario,
        cantidad,
    };

    const productoCalculado = crearProductoCalculado(datosEntrada);
    guardarProducto(productoCalculado);

    console.log("\nProducto guardado con éxito:");
    console.log(`Nombre:   ${productoCalculado.nombre}`);
    console.log(`Subtotal: ${productoCalculado.subtotal.toFixed(2)}`);
    console.log(`IVA:      ${productoCalculado.iva.toFixed(2)}`);
    console.log(`Total:    ${productoCalculado.total.toFixed(2)}\n`);
}

function listarProductos(): void {
    console.log("\n------ Lista de Productos: ------");
    const productos = obtenerProductos();

    if (productos.length === 0) {
        console.log("No se encuentran productos registrados.\n");
        return;
    }

    productos.forEach((p, index) => {
        console.log(`Producto #${index + 1}`);
        console.log(`  Nombre:   ${p.nombre}`);
        console.log(`  Cantidad: ${p.cantidad}`);
        console.log(`  Precio Unitario: ${p.precioUnitario.toFixed(2)}`);
        console.log(`  Subtotal: ${p.subtotal.toFixed(2)}`);
        console.log(`  IVA:      ${p.iva.toFixed(2)}`);
        console.log(`  Total:    ${p.total.toFixed(2)}`);
        console.log("-------------------------------------");
    });

    console.log();
}

function main(): void {
    let salir = false;

    while (!salir) {
        mostrarMenu();
        const opcion = readlineSync.question("Elige una opción: ");

        switch (opcion) {
            case "1":
                ingresarProducto();
                break;
            case "2":
                listarProductos();
                break;
            case "3":
                salir = true;
                console.log("Saliendo del sistema...");
                break;
            default:
                console.log("Opción no válida. Intenta de nuevo.\n");
        }
    }
}

// Punto de entrada
main();
