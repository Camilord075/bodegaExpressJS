# BodegaExpress API

BodegaExpress es una API diseñada para gestionar la creación, edición, búsqueda y eliminación de productos, responsables y pedidos en una base de datos relacional.

## Tabla de Contenidos

- [Diagramación](#diagramación)
- [Herramientas Utilizadas](#herramientas-utilizadas)
- [Clases y Funciones](#clases-y-funciones)
- [Rutas de Acceso y Funcionalidad](#rutas-de-acceso-y-funcionalidad)
- [Conexión y Revisión del Código](#conexión-y-revisión-del-código)
- [Proyección Futura](#proyección-futura)

## Diagramación

La API se basa en una base de datos relacional diseñada de acuerdo con el siguiente diagrama:

(Insertar aquí el diagrama de la base de datos)

## Herramientas Utilizadas

Esta API fue desarrollada utilizando:

- **NodeJS**: Interfaz para desarrollo de aplicaciones web.
- **ExpressJS**: Framework para el desarrollo de la lógica de la API.
- **MySQL2**: Herramienta para las peticiones de datos a la base de datos en MySQL.

## Clases y Funciones

Cada entidad de la base de datos se gestiona mediante clases controladoras, asegurando una programación modular y limpia.

### ResponsableController

- **getResponsables()**: Devuelve la lista completa de responsables registrados.
- **findOne(id)**: Devuelve el responsable solicitado según el `id` recibido.
- **insertResponsable(id, nombre)**: Inserta un nuevo responsable en la base de datos.
- **updateResponsable(id, nombre)**: Actualiza el nombre de un responsable existente.
- **deleteResponsable(id)**: Elimina un responsable de la base de datos.

### ProductoController

- **getProductos()**: Devuelve la lista completa de productos registrados.
- **findOne(id)**: Devuelve el producto solicitado según el `id` recibido.
- **insertProducto(nombre, cantidadDisponible)**: Inserta un nuevo producto en la base de datos.
- **updateProducto(id, nombre, cantidadDisponible)**: Actualiza un producto existente.
- **deleteProducto(id)**: Elimina un producto de la base de datos.

### PedidoController

- **getPedidos()**: Devuelve la lista completa de pedidos registrados.
- **findOne(id)**: Devuelve el pedido solicitado según el `id` recibido.
- **newPedido(idResponsable, lista)**: Inserta un nuevo pedido en la base de datos.
- **updatePedido(idPedido, lista)**: Actualiza un pedido existente.
- **deletePedido(idPedido)**: Elimina un pedido de la base de datos.
- **checkPedido(idPedido)**: Marca un pedido como completado.

### ListaController

- **getLista(id)**: Devuelve la lista de productos de un pedido específico.
- **insertLista(idPedido, idProducto, cantidad)**: Inserta una nueva relación de producto y pedido.
- **updateLista(idPedido, idProducto, cantidad)**: Actualiza una relación existente entre producto y pedido.
- **deleteLista(idPedido)**: Elimina una relación entre producto y pedido.

### RespondController

- **Constructor(status, respond)**: Crea una respuesta con formato, asignando un estado (`0` para error, `1` para éxito).

## Rutas de Acceso y Funcionalidad

Las rutas se han creado de manera modular para facilitar la ejecución de las tareas.

### Responsable

- **GET /api/responsable**: Devuelve la lista completa de responsables.
- **GET /api/responsable/:id**: Devuelve un responsable específico.
- **POST /api/responsable**: Inserta un nuevo responsable.
- **PATCH /api/responsable/:id**: Actualiza un responsable existente.
- **DELETE /api/responsable/:id**: Elimina un responsable.

### Producto

- **GET /api/producto**: Devuelve la lista completa de productos.
- **GET /api/producto/:id**: Devuelve un producto específico.
- **POST /api/producto**: Inserta un nuevo producto.
- **PATCH /api/producto/:id**: Actualiza un producto existente.
- **DELETE /api/producto/:id**: Elimina un producto.

### Pedido

- **GET /api/pedidos**: Devuelve la lista completa de pedidos.
- **GET /api/pedidos/:id**: Devuelve un pedido específico.
- **POST /api/pedidos**: Inserta un nuevo pedido.
- **PATCH /api/pedidos/:id**: Actualiza un pedido existente.
- **DELETE /api/pedidos/:id**: Elimina un pedido.
- **PATCH /api/pedidos/checking/:id**: Marca un pedido como completado.

### Lista

- **GET /api/lista/:id**: Devuelve la lista de productos de un pedido específico.

## Conexión y Revisión del Código

Para consumir la API, utiliza la siguiente URL:

[https://bodegaexpressjs-production.up.railway.app](https://bodegaexpressjs-production.up.railway.app)

El código fuente está disponible en el siguiente repositorio de GitHub:

[Repositorio de GitHub](https://github.com/Camilord075/bodegaExpressJS)

## Proyección Futura

Próximamente se desarrollará un módulo para la gestión de usuarios, incluyendo registro e inicio de sesión, con roles específicos y seguridad mejorada mediante JWT, encriptación de contraseñas y manejo de sesiones con cookies. Además, se planea integrar el Front-End usando React.

