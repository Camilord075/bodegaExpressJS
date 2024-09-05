import { ProductoController } from "./ProductoController.js"
import { Parser } from "json2csv"
import { CSVParser } from "./parser/CSVParser.js"
import { pool } from "../database/database.js"
import * as fs from 'fs/promises'
import { ListaController } from "./ListaController.js"

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

        const fileDelete = await fs.unlink(file)

        return 'Inventario has been updated'
    }

    static async outputInventario(idPedido) {
        const lista = await ListaController.getLista(idPedido)

        for (let i = 0; i < lista.length; i += 1) {
            const producto = await ProductoController.findOne(lista[i].id_producto)

            if (!producto) {
                throw new Error('One item on Lista does not exists')
            }

            if (producto.cantidad_disponible <= lista[i].cantidad) {
                throw new Error(`The Producto ${producto.nombre} does not have the stock to complete this Pedido`)
            }
        }

        lista.forEach(async (element) => {
            const output = await pool.query('UPDATE producto set cantidad_disponible = cantidad_disponible - ? WHERE id = ?', [element.cantidad, element.id_producto])
        })

        return 'Output completed'
    }

    static async inputInventario(idProducto, cantidad) {
        const producto = await ProductoController.findOne(idProducto)

        if (!producto) {
            throw new Error('This Producto does not exists')
        } else  {
            const input = await ProductoController.updateProducto(idProducto, null, producto.cantidad_disponible + Number(cantidad))

            return input
        }
    }
}