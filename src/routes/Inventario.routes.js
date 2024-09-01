import { Router } from "express";
import { InventarioController } from "../controllers/InventarioController.js";
import { verifySession } from "./Usuario.routes.js";
import { Respond } from "../controllers/responds/RespondController.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const inventarioRouter = Router()

let filename = ""

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        filename = "" + Date.now() + file.originalname
        cb ("", filename)
    }
})

const uploadFile = multer({
    storage: storage
})

inventarioRouter.use(cookieParser())

inventarioRouter.get('/inventario', verifySession, async (req, res) => {
    const { user } = req.session

    if (!user) {    
        res.status(401).send(new Respond(0, 'Access not Authorized'))
    } else {
        try {
            const result = await InventarioController.exportInventario()
        
            res.attachment(`InventarioExport${result.date}.csv`)
            res.send(result.csv)
        } catch (error) {
            res.status(404).send(new Respond(0, error.message))
        }
    }
})

inventarioRouter.post('/inventario', uploadFile.single('fileCsv'), async (req, res) => {
    try {
        const result = new Respond(1, await InventarioController.importInventario(`./uploads/${filename}`))
    
        res.send(result)
    } catch (error) {
        res.status(400).send(new Respond(0, error.message))
    }
})

export default inventarioRouter