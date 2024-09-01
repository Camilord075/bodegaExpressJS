import { ProductoController } from "./ProductoController.js"
import { Parser } from "json2csv"
import * as fs from 'fs/promises'
import { CSVParser } from "./parser/CSVParser.js"

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

    static async importInventario(file) {
        const productos = await ProductoController.getProductos()
        if (productos.length == 0) {
            throw new Error('No items to show')
        }

        const fileContent = await fs.readFile(file, 'utf-8')
        const csvContent = CSVParser.parse(fileContent)

        if (csvContent.length != productos.length) {
            throw new Error('This document is not updated or incorrect, please download the new Version')
        } else {
            for (let i = 0; i < csvContent.length; i += 1) {
                if (csvContent[i].id != productos[i].id) {
                    throw new Error('This document is not updated or incorrect, please download the new Version')
                }
            }
        }

        csvContent.forEach(async (element) => {
            const insert = await ProductoController.updateProducto(element.id, null, element.cantidad_disponible)
        })

        return 'Inventario has been updated'
    }
}