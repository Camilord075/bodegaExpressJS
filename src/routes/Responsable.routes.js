import { Router } from "express";
import { ResponsableController } from "../controllers/ResponsableController.js";

const responsableRouter = Router()

responsableRouter.get('/responsable', async (req, res) => {
    const responsables = await ResponsableController.getResponsables()

    res.send(responsables)
})

responsableRouter.get('/responsable/:id', async (req, res) => {
    const responsable = await ResponsableController.findOne(req.params.id)

    if (!responsable) {
        res.status(404).send('This Responsable does not exists')
    }
    
    res.send(responsable)
})

responsableRouter.post('/responsable', async (req, res) => {
    const { id, nombre } = req.body

    try {
        const result = await ResponsableController.insertResponsable(id, nombre)

        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

responsableRouter.patch('/responsable/:id', async (req, res) => {
    const idResposable = req.params.id
    const { nombre } = req.body

    try {
        const result = await ResponsableController.updateResponsable(idResposable, nombre)

        res.send(result)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

responsableRouter.delete('/responsable/:id', async (req, res) => {
    const idResponsable = req.params.id

    try {
        const result = await ResponsableController.deleteResponsable(idResponsable)

        res.send(result)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

export default responsableRouter