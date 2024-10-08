import express from 'express'
import { APP_PORT } from './configEnvExample.js'
import pedidoRouter from './src/routes/Pedido.routes.js'
import listaRouter from './src/routes/Lista.routes.js'
import productoRouter from './src/routes/Producto.routes.js'
import responsableRouter from './src/routes/Responsable.routes.js'
import usuarioRouter from './src/routes/Usuario.routes.js'
import inventarioRouter from './src/routes/Inventario.routes.js'

const app = express()
app.use(express.json())

app.use('/api', responsableRouter)
app.use('/api', productoRouter)
app.use('/api', listaRouter)
app.use('/api', pedidoRouter)
app.use('/api', usuarioRouter)
app.use('/api', inventarioRouter)

app.listen(APP_PORT, () => {
    console.log(`Listening on port ${APP_PORT}`)
})