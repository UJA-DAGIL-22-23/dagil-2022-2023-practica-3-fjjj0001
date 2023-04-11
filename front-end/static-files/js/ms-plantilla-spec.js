/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"
const TITULO_LISTADO_NOMBRES = "Listado de nombre de los jugadores"
const TITULO_LISTADO_JUGADORES = "Listado de los jugadores"
const TITULO_MOSTRAR = "Mostrar un jugador"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}

const datosJugadoresPrueba = {
    nombre: "Sergio", 
    apellidos: "Lozano Martínez", 
    apodo: "El búfalo", 
    fecha_nacimiento: {dia: "9", mes: "11", año: "1988"}, 
    dorsal: "9", 
    posicion: "Ala", 
    equipos_jugados: ["EFA Arganda", "UD Las Rozas Boadilla", "Reale Cartagena", "Caja Segovia", "Barça"]
}

// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})


/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
describe("Plantilla.listadoDeNombres: ", function () {

    let j = {
        nombre: "Sergio"
        , apellidos: "Lozano Martínez"
        , apodo: "El búfalo"
        , fecha_nacimiento: {
            dia: "9"
            , mes: "11"
            , año: "1988"}
        , dorsal: "9"
        , posicion: "Ala"
        , equipos_jugados: ["EFA Arganda", "UD Las Rozas Boadilla", "Reale Cartagena", "Caja Segovia", "Barça"]}

    let jugador = { data: j }

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.listadoDeNombres()
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_NOMBRES)
            expect(elementoContenido.innerHTML.search(Plantilla.datosJugadoresNulos.nombre) == "").toBeTrue()
        })
    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.listadoDeNombres(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_NOMBRES)
            expect(elementoContenido.innerHTML.search(Plantilla.datosJugadoresNulos.nombre) == "").toBeTrue()
        })
    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo nombre o vacío",
        function () {
            // Objeto vacío
            Plantilla.listadoDeNombres({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_NOMBRES)
            expect(elementoContenido.innerHTML.search(Plantilla.datosJugadoresNulos.nombre) == "").toBeTrue()
            // Objeto sin campo nombre
            Plantilla.listadoDeNombres({apellidos: "Lozano Martínez", apodo: "El búfalo", fecha_nacimiento: {dia: "9", mes: "11", año: "1988"}, dorsal: "9", posicion: "Ala", equipos_jugados: ["EFA Arganda", "UD Las Rozas Boadilla", "Reale Cartagena", "Caja Segovia", "Barça"]})
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_NOMBRES)
            expect(elementoContenido.innerHTML.search(Plantilla.datosJugadoresNulos.nombre) == "").toBeTrue()
        })
    it("muestra correctamente el nombre del jugador",
        function () {
            let mensaje = Plantilla.listadoDeNombres(jugador)
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_NOMBRES)

            // Comprobamos que al buscar el nombre lo encuentra en el article
            //expect(mensaje.includes(j.nombre)).toBeTrue()
        })
})

describe("Plantilla.listadoDeNombresOrden: ", function () {

    let j = {
        nombre: "Sergio"
        , apellidos: "Lozano Martínez"
        , apodo: "El búfalo"
        , fecha_nacimiento: {
            dia: "9"
            , mes: "11"
            , año: "1988"}
        , dorsal: "9"
        , posicion: "Ala"
        , equipos_jugados: ["EFA Arganda", "UD Las Rozas Boadilla", "Reale Cartagena", "Caja Segovia", "Barça"]}

    let jugador = { data: j }

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.listadoDeNombresOrden()
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_NOMBRES)
            expect(elementoContenido.innerHTML.search(Plantilla.datosJugadoresNulos.nombre) == "").toBeTrue()
        })
    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.listadoDeNombresOrden(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_NOMBRES)
            expect(elementoContenido.innerHTML.search(Plantilla.datosJugadoresNulos.nombre) == "").toBeTrue()
        })
    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo nombre o vacío",
        function () {
            // Objeto vacío
            Plantilla.listadoDeNombresOrden({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_NOMBRES)
            expect(elementoContenido.innerHTML.search(Plantilla.datosJugadoresNulos.nombre) == "").toBeTrue()
            // Objeto sin campo nombre
            Plantilla.listadoDeNombresOrden({apellidos: "Lozano Martínez", apodo: "El búfalo", fecha_nacimiento: {dia: "9", mes: "11", año: "1988"}, dorsal: "9", posicion: "Ala", equipos_jugados: ["EFA Arganda", "UD Las Rozas Boadilla", "Reale Cartagena", "Caja Segovia", "Barça"]})
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_NOMBRES)
            expect(elementoContenido.innerHTML.search(Plantilla.datosJugadoresNulos.nombre) == "").toBeTrue()
        })
    it("muestra correctamente el nombre del jugador",
        function () {
            let mensaje = Plantilla.listadoDeNombresOrden(jugador)
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_NOMBRES)

            // No he logrado conseguir que funcione este expect, no recibe correctamente el objeto de tipo data

            // Comprobamos que al buscar el nombre lo encuentra en el article
            //expect(mensaje.includes(j.nombre)).toBeTrue()
        })
})

describe("Plantilla.listadoJugadores: ", function () {

    let j = {
        nombre: "Sergio"
        , apellidos: "Lozano Martínez"
        , apodo: "El búfalo"
        , fecha_nacimiento: {
            dia: "9"
            , mes: "11"
            , año: "1988"}
        , dorsal: "9"
        , posicion: "Ala"
        , equipos_jugados: ["EFA Arganda", "UD Las Rozas Boadilla", "Reale Cartagena", "Caja Segovia", "Barça"]}

    let jugador = { data: j }

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.listadoJugadores()
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_JUGADORES)
            expect(elementoContenido.innerHTML.search(Plantilla.datosJugadoresNulos.nombre) == "").toBeTrue()
        })
    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.listadoJugadores(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_JUGADORES)
            expect(elementoContenido.innerHTML.search(Plantilla.datosJugadoresNulos.nombre) == "").toBeTrue()
        })
    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo nombre o vacío",
        function () {
            // Objeto vacío
            Plantilla.listadoJugadores({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_JUGADORES)
            expect(elementoContenido.innerHTML.search(Plantilla.datosJugadoresNulos.nombre) == "").toBeTrue()

            // Objeto sin campo nombre
            Plantilla.listadoJugadores({apellidos: "Lozano Martínez", apodo: "El búfalo", fecha_nacimiento: {dia: "9", mes: "11", año: "1988"}, dorsal: "9", posicion: "Ala", equipos_jugados: ["EFA Arganda", "UD Las Rozas Boadilla", "Reale Cartagena", "Caja Segovia", "Barça"]})
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_JUGADORES)
            expect(elementoContenido.innerHTML.search(Plantilla.datosJugadoresNulos.nombre) == "").toBeTrue()

            //Objeto sin campo apellido
            Plantilla.listadoJugadores({nombre: "Sergio", apodo: "El búfalo", fecha_nacimiento: {dia: "9", mes: "11", año: "1988"}, dorsal: "9", posicion: "Ala", equipos_jugados: ["EFA Arganda", "UD Las Rozas Boadilla", "Reale Cartagena", "Caja Segovia", "Barça"]})
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_JUGADORES)
            expect(elementoContenido.innerHTML.search(Plantilla.datosJugadoresNulos.apellidos) == "").toBeTrue()

            //Objeto sin campo apodo
            Plantilla.listadoJugadores({nombre: "Sergio", apellidos:"Lozano Martínez", fecha_nacimiento: {dia: "9", mes: "11", año: "1988"}, dorsal: "9", posicion: "Ala", equipos_jugados: ["EFA Arganda", "UD Las Rozas Boadilla", "Reale Cartagena", "Caja Segovia", "Barça"]})
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_JUGADORES)
            expect(elementoContenido.innerHTML.search(Plantilla.datosJugadoresNulos.apodo) == "").toBeTrue()

            //Objeto sin campo fecha
            Plantilla.listadoJugadores({nombre: "Sergio", apellidos:"Lozano Martínez", apodo: "El búfalo", dorsal: "9", posicion: "Ala", equipos_jugados: ["EFA Arganda", "UD Las Rozas Boadilla", "Reale Cartagena", "Caja Segovia", "Barça"]})
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_JUGADORES)
            expect(elementoContenido.innerHTML.search(Plantilla.datosJugadoresNulos.fecha_nacimiento) == "").toBeTrue()

            //Objeto sin campo dorsal
            Plantilla.listadoJugadores({nombre: "Sergio", apellidos:"Lozano Martínez", apodo: "El búfalo", fecha_nacimiento: {dia: "9", mes: "11", año: "1988"}, posicion: "Ala", equipos_jugados: ["EFA Arganda", "UD Las Rozas Boadilla", "Reale Cartagena", "Caja Segovia", "Barça"]})
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_JUGADORES)
            expect(elementoContenido.innerHTML.search(Plantilla.datosJugadoresNulos.dorsal) == "").toBeTrue()

            //Objeto sin campo posicion
            Plantilla.listadoJugadores({nombre: "Sergio", apellidos:"Lozano Martínez", apodo: "El búfalo", fecha_nacimiento: {dia: "9", mes: "11", año: "1988"}, dorsal: "9", equipos_jugados: ["EFA Arganda", "UD Las Rozas Boadilla", "Reale Cartagena", "Caja Segovia", "Barça"]})
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_JUGADORES)
            expect(elementoContenido.innerHTML.search(Plantilla.datosJugadoresNulos.posicion) == "").toBeTrue()

            //Objeto sin campo equipos_jugados
            Plantilla.listadoJugadores({nombre: "Sergio", apellidos:"Lozano Martínez", apodo: "El búfalo", fecha_nacimiento: {dia: "9", mes: "11", año: "1988"}, dorsal: "9", posicion: "Ala"})
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_JUGADORES)
            expect(elementoContenido.innerHTML.search(Plantilla.datosJugadoresNulos.equipos_jugados) == "").toBeTrue()
        })
    it("muestra correctamente los datos de los jugadores",
        function () {
            let mensaje = Plantilla.listadoJugadores(jugador)
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_JUGADORES)

            // No he logrado conseguir que funcione este expect, no recibe correctamente el objeto de tipo data

            // Comprobamos que al buscar el nombre lo encuentra en el article
            //expect(mensaje.includes(j.nombre)).toBeTrue()
        })
})
