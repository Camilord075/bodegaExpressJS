import { Router } from "express";
import { InventarioController } from "../controllers/InventarioController.js";
import { verifySession } from "./Usuario.routes.js";
import { Respond } from "../controllers/responds/RespondController.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const inventarioRouter = Router()

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb ("", Date.now() + file.originalname)
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

inventarioRouter.post('/inventario', verifySession, uploadFile.single('fileCsv'), async (req, res) => {
    const { user } = req.session

    if (!user) {    
        res.status(401).send(new Respond(0, 'Access not Authorized'))
    } else {
        try {
            const result = new Respond(1, await InventarioController.importInventario(req.file.path))
        
            res.send(result)
        } catch (error) {
            res.status(400).send(new Respond(0, error.message))
        }
    }
})

inventarioRouter.patch('/input/:id'/*, verifySession**/, async (req, res) => {
    /*const { user } = req.session

    if (!user) {    
        res.status(401).send(new Respond(0, 'Access not Authorized'))
    } else {
    }**/
    const idProducto = req.params.id
    const { cantidad } = req.body

   try {
    const input = new Respond(1, await InventarioController.inputInventario(idProducto, cantidad))

    res.send(input)
   } catch (error) {
    res.status(404).send(error.message)
   }
})

export default inventarioRouter