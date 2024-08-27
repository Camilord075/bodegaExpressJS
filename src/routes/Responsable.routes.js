import { Router } from "express";
import { ResponsableController } from "../controllers/ResponsableController.js";
import { Respond } from "../controllers/responds/RespondController.js";
import { verifySession } from "./Usuario.routes.js";
import cookieParser from "cookie-parser";

const responsableRouter = Router()

responsableRouter.use(cookieParser())

responsableRouter.get('/responsable', async (req, res) => {
    const responsables = new Respond(1, await ResponsableController.getResponsables())

    res.send(responsables)
})

responsableRouter.get('/responsable/:id', async (req, res) => {
    const responsable = new Respond(1, await ResponsableController.findOne(req.params.id))

    if (!responsable.respond) {
        res.status(404).send(new Respond(0, 'This Responsable does not exists'))
    }
    
    res.send(responsable)
})

responsableRouter.post('/responsable', verifySession, async (req, res) => {
    const { user } = req.session

    if (!user) {    
        res.status(403).send(new Respond(0, 'Access not Authorized'))
    } else {
        const { id, nombre } = req.body
    
        try {
            const result = new Respond(1, await ResponsableController.insertResponsable(id, nombre))
    
            res.send(result)
        } catch (error) {
            res.status(500).send(new Respond(0, error.message))
        }
    }
})

responsableRouter.patch('/responsable/:id', verifySession, async (req, res) => {
    const { user } = req.session

    if (!user) {    
        res.status(403).send(new Respond(0, 'Access not Authorized'))
    } else {
        const idResposable = req.params.id
        const { nombre } = req.body
    
        try {
            const result = new Respond(1, await ResponsableController.updateResponsable(idResposable, nombre))
    
            res.send(result)
        } catch (error) {
            res.status(404).send(new Respond(0, error.message))
        }
    }
})

responsableRouter.delete('/responsable/:id', verifySession, async (req, res) => {
    const { user } = req.session

    if (!user) {    
        res.status(403).send(new Respond(0, 'Access not Authorized'))
    } else {
        const idResponsable = req.params.id
    
        try {
            const result = new Respond(1, await ResponsableController.deleteResponsable(idResponsable))
    
            res.send(result)
        } catch (error) {
            res.status(404).send(new Respond(0, error.message))
        }
    }
})

export default responsableRouter