// Dependencias
import ClientSQL from "./sql.js";
import { options } from './options/SQLite3.js'

// Constantes
const sql = new ClientSQL(options)

try {
    
    await sql.crearTabla()
    console.log("Tabla creada")

    
    const articulosParaInsertar = [
        { nombre: 'Leche', codigo: 'AB-12', precio: 23.60, stock: 24},
        { nombre: 'Harina', codigo: 'CD-34', precio: 18.80, stock: 45},
        { nombre: 'DDL', codigo: 'EF-56', precio: 32.60, stock: 16},
        { nombre: 'Fideos', codigo: 'FG-44', precio: 42.70, stock: 34},
        { nombre: 'Crema', codigo: 'CR-77', precio: 68, stock: 24}
    ]
    await sql.insertarArticulos(articulosParaInsertar)
    console.log("Articulos insertados")

  
    const articulosLeidos = await sql.listarArticulos()
    console.log("Articulos listado")
    console.table(articulosLeidos)

    await sql.borrarArticulosPorId(3)
    console.log("Articulo con ID 3 borrado con exito")

    
    await sql.actualizarArticulosPorId(0, 2)
    console.log("Stock actualizado")

  
    const articuloFinal = await sql.listarArticulos()
    console.log("Resultado total")
    console.table(articuloFinal)
} catch (error) {
    console.log(error)
} finally {
    sql.close()
}



let socket = io.connect();

socket.on('mensajes', function(msjs) {
    console.log(msjs);
    document.querySelector('p').innerHTML = msjs.map( msj => `SocketId: ${msj.socketid} -> Mensaje: ${msj.mensaje}`).join('<br>')
});

let input = document.querySelector('input')
document.querySelector('button').addEventListener('click', () => {
    socket.emit('mensaje', input.value)
})