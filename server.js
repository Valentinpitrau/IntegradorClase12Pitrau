
const express = require('express');

const app = express()

const Productos = require('./api/productos')

const server = require('http').Server(app)
const io = require('socket.io')(server)


let productos = new Productos()


app.use(express.static('public'))

const router = express.Router()
app.use('/api', router)

router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.get('/productos/listar', (req,res) => {
    res.json(productos.listarAll())
})

router.get('/productos/listar/:id', (req,res) => {
    let { id } = req.params
    res.json(productos.listar(id))
})

router.post('/productos/guardar', (req,res) => {
    let producto = req.body
    productos.guardar(producto)
    res.json(producto)
})

router.put('/productos/actualizar/:id', (req,res) => {
    let { id } = req.params
    let producto = req.body
    productos.actualizar(producto,id)
    res.json(producto)
})

router.delete('/productos/borrar/:id', (req,res) => {
    let { id } = req.params
    let producto = productos.borrar(id)
    res.json(producto)
})


const mensajes = []


app.use(express.static('public'));

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    socket.emit('mensajes', mensajes)

    socket.on('mensaje', data => {
        mensajes.push({socketid: socket.id, mensaje: data})
        io.sockets.emit('mensajes', mensajes)
    });
});


const PORT = 8080
const srv = server.listen(PORT, function() {
    console.log('Servidor HTTP con WebSockets escuchando en el puerto: ', PORT);
}) 
srv.on('error', error => console.log('Error en servidor: ', error))