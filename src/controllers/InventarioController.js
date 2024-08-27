import { ProductoController } from "./ProductoController.js"
import { Parser } from "json2csv"

export class InventarioController {
    static async exportInventario() {
        const jsonParser = new Parser()
        const date = Date.now()

        const productos = await ProductoController.getProductos()
        if (productos.length == 0) {
            throw new Error('No items to show')
        }

        const csvInfo = jsonParser.parse(productos).replaceAll(',', ';')

        return {
            date: date,
            csv: csvInfo
        }
    }
}