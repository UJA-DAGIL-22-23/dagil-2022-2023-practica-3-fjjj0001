/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

// Plantilla de jugadores vacía
Plantilla.datosJugadoresNulos = {
    nombre: "",
    apellidos: "",
    apodo: "",
    fecha_nacimiento: "",
    dorsal: "",
    posicion: "",
    equipos_jugados: ""
}

/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}

/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función para listar el nombre de todos los jugadores de la base de datos
 * @param {jugadores} jugadores Vector con todos los jugadores de la base de datos
 */
Plantilla.listadoDeNombres = function (jugadores) {
    // Si no se ha proporcionado valor para datosDescargados
    jugadores = jugadores || this.datosJugadoresNulos

    // Si datos descargados NO es un objeto 
    if (typeof jugadores !== "object") jugadores = this.datosJugadoresNulos


    // Si datos descargados NO contiene los campos
    if (Array.isArray(jugadores.data)) {
        for (let i = 0; i < jugadores.data.length && Array.isArray(jugadores.data); ++i) {
            if (typeof jugadores.data[i].data.nombre === "undefined" ||
                typeof jugadores.data[i].data.apellidos === "undefined" ||
                typeof jugadores.data[i].data.apodo === "undefined" ||
                typeof jugadores.data[i].data.fecha_nacimiento === "undefined" ||
                typeof jugadores.data[i].data.dorsal === "undefined" ||
                typeof jugadores.data[i].data.posicion === "undefined" ||
                typeof jugadores.data[i].data.equipos_jugados === "undefined"
            ) jugadores = this.datosJugadoresNulos
        }
    }

    //console.log(jugadores) Para mostrar el contenido de jugadores

    // Mensaje a mostrar 
    let mensajeAMostrar = `<table width="100%" class="listado-personas">
    <thead>
        <th width="20%">Nombre de los jugadores</th>
    </thead>
    <tbody>`;

    // Si jugadores.data es un array, es decir, jugadores es distinto de datosJugadoresNulos, se muestra el nombre de todos
    if (Array.isArray(jugadores.data)) {
        for (let i = 0; i < jugadores.data.length; ++i) {
            mensajeAMostrar += `
            <tr>
                <td>${jugadores.data[i].data.nombre}</td>
            </tr>`;
        }
    }


    mensajeAMostrar += `</tbody></table>`;
    Frontend.Article.actualizar("Listado de nombre de los jugadores", mensajeAMostrar)
    return mensajeAMostrar;
}

/**
 * Función para listar el nombre en orden alfabético de todos los jugadores de la base de datos
 * @param {jugadores} jugadores Vector con todos los jugadores de la base de datos
 */
Plantilla.listadoDeNombresOrden = function (jugadores) {
    // Si no se ha proporcionado valor para datosDescargados
    jugadores = jugadores || this.datosJugadoresNulos

    // Si datos descargados NO es un objeto 
    if (typeof jugadores !== "object") jugadores = this.datosJugadoresNulos

    // Si datos descargados NO contiene los campos
    if (Array.isArray(jugadores.data)) {
        for (let i = 0; i < jugadores.data.length && Array.isArray(jugadores.data); ++i) {
            if (typeof jugadores.data[i].data.nombre === "undefined" ||
                typeof jugadores.data[i].data.apellidos === "undefined" ||
                typeof jugadores.data[i].data.apodo === "undefined" ||
                typeof jugadores.data[i].data.fecha_nacimiento === "undefined" ||
                typeof jugadores.data[i].data.dorsal === "undefined" ||
                typeof jugadores.data[i].data.posicion === "undefined" ||
                typeof jugadores.data[i].data.equipos_jugados === "undefined"
            ) jugadores = this.datosJugadoresNulos
        }
    }


    let listanombres = [];
    if (Array.isArray(jugadores.data)) {

        for (let i = 0; i < jugadores.data.length; ++i) {
            listanombres.push(jugadores.data[i].data.nombre);
        }

        listanombres.sort();
    }

    //console.log(listanombres);

    let mensajeAMostrar = `<table width="100%" class="listado-personas">
    <thead>
        <th width="20%">Nombre de los jugadores</th>
    </thead>
    <tbody>`;

    for (let i = 0; i < listanombres.length; ++i) {
        mensajeAMostrar += `
            <tr>
                <td>${listanombres[i]}</td>
            </tr>`;
    }

    mensajeAMostrar += `</tbody></table>`;
    //console.log(mensajeAMostrar);
    Frontend.Article.actualizar("Listado de nombre de los jugadores", mensajeAMostrar)
}

/**
 * Función para listar todos los datos de los jugadores que haya en la base de datos
 * @param {jugadores} Jugadores Vector con todos los jugadores de la BBDD
 */
Plantilla.listadoJugadores = function (jugadores) {
    // Si no se ha proporcionado valor para datosDescargados
    jugadores = jugadores || this.datosJugadoresNulos

    // Si datos descargados NO es un objeto 
    if (typeof jugadores !== "object") jugadores = this.datosJugadoresNulos


    // Si datos descargados NO contiene los campos
    if (Array.isArray(jugadores.data)) {
        for (let i = 0; i < jugadores.data.length && Array.isArray(jugadores.data); ++i) {
            if (typeof jugadores.data[i].data.nombre === "undefined" ||
                typeof jugadores.data[i].data.apellidos === "undefined" ||
                typeof jugadores.data[i].data.apodo === "undefined" ||
                typeof jugadores.data[i].data.fecha_nacimiento === "undefined" ||
                typeof jugadores.data[i].data.dorsal === "undefined" ||
                typeof jugadores.data[i].data.posicion === "undefined" ||
                typeof jugadores.data[i].data.equipos_jugados === "undefined"
            ) jugadores = this.datosJugadoresNulos
        }
    }

    //console.log(jugadores) Para mostrar el contenido de jugadores

    // Mensaje a mostrar 
    let mensajeAMostrar = `<table width="100%" class="listado-personas">
    <thead>
        <th width="20%">Nombre</th>
        <th width="20%">Apellidos</th>
        <th width="20%">Apodo</th>
        <th width="20%">Fecha de nacimiento</th>
        <th width="20%">Dorsal</th>
        <th width="20%">Posición</th>
        <th width="20%">Trayectoria</th>
    </thead>
    <tbody>`;

    // Si jugadores.data es un array, es decir, jugadores es distinto de datosJugadoresNulos, se muestra el nombre de todos
    if (Array.isArray(jugadores.data)) {
        for (let i = 0; i < jugadores.data.length; ++i) {
            mensajeAMostrar += `
            <tr>
                <td>${jugadores.data[i].data.nombre}</td>
                <td>${jugadores.data[i].data.apellidos}</td>
                <td>${jugadores.data[i].data.apodo}</td>
                <td>${jugadores.data[i].data.fecha_nacimiento.dia}/${jugadores.data[i].data.fecha_nacimiento.mes}/${jugadores.data[i].data.fecha_nacimiento.año}</td>
                <td>${jugadores.data[i].data.dorsal}</td>
                <td>${jugadores.data[i].data.posicion}</td>
                <td>${jugadores.data[i].data.equipos_jugados}</td>              
            </tr>`;

        }
    }


    mensajeAMostrar += `</tbody></table>`;
    Frontend.Article.actualizar("Listado de los jugadores", mensajeAMostrar)
    return mensajeAMostrar;
}

/**
 * Función para listar los datos de un jugador de la base de datos
 * @param {jugadores} Jugadores Vector con todos los jugadores de la base de datos
 */
Plantilla.listadoAleatorio = function (jugadores) {
    // Si no se ha proporcionado valor para datosDescargados
    jugadores = jugadores || this.datosJugadoresNulos

    // Si datos descargados NO es un objeto 
    if (typeof jugadores !== "object") jugadores = this.datosJugadoresNulos


    // Si datos descargados NO contiene los campos
    if (Array.isArray(jugadores.data)) {
        for (let i = 0; i < jugadores.data.length && Array.isArray(jugadores.data); ++i) {
            if (typeof jugadores.data[i].data.nombre === "undefined" ||
                typeof jugadores.data[i].data.apellidos === "undefined" ||
                typeof jugadores.data[i].data.apodo === "undefined" ||
                typeof jugadores.data[i].data.fecha_nacimiento === "undefined" ||
                typeof jugadores.data[i].data.dorsal === "undefined" ||
                typeof jugadores.data[i].data.posicion === "undefined" ||
                typeof jugadores.data[i].data.equipos_jugados === "undefined"
            ) jugadores = this.datosJugadoresNulos
        }
    }

    //console.log(jugadores) Para mostrar el contenido de jugadores

    // Vamos a mostrar los datos de un jugador aleatorio de entre todos los que haya en la base de datos
    var i = 0
    if (Array.isArray(jugadores.data)) {
        i = Math.floor(Math.random() * jugadores.data.length-1) + 1;
    }

    // Mensaje a mostrar 
    let mensajeAMostrar = `<table width="100%" class="listado-personas">
    <thead>
        <th width="20%">Nombre</th>
        <th width="20%">Apellidos</th>
        <th width="20%">Apodo</th>
        <th width="20%">Fecha de nacimiento</th>
        <th width="20%">Dorsal</th>
        <th width="20%">Posición</th>
        <th width="20%">Trayectoria</th>
    </thead>
    <tbody>`;

    // Si jugadores no se ha pasado correctamente, no podría leer los datos, por lo tanto se dejaría la tabla en blanco
    if(Array.isArray(jugadores.data)){
    mensajeAMostrar += `
            <tr>
                <td>${jugadores.data[i].data.nombre}</td>
                <td>${jugadores.data[i].data.apellidos}</td>
                <td>${jugadores.data[i].data.apodo}</td>
                <td>${jugadores.data[i].data.fecha_nacimiento.dia}/${jugadores.data[i].data.fecha_nacimiento.mes}/${jugadores.data[i].data.fecha_nacimiento.año}</td>
                <td>${jugadores.data[i].data.dorsal}</td>
                <td>${jugadores.data[i].data.posicion}</td>
                <td>${jugadores.data[i].data.equipos_jugados}</td>              
            </tr>`;
    }
    mensajeAMostrar += `</tbody></table>`;
    Frontend.Article.actualizar("Datos de un jugador", mensajeAMostrar)
    return mensajeAMostrar;
}

/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}

/**
 * Función principal para responder al evento de elegir la opción "Listar jugadores solo nombre"
 */
Plantilla.procesarListadoDeNombres = function () {
    this.descargarRuta("/plantilla/get-todos", this.listadoDeNombres);
}

/**
 * Función principal para responder al evento de elegir la opción "Listar nombres ordenado"
 */
Plantilla.procesarListadoDeNombresOrden = function () {
    this.descargarRuta("/plantilla/get-todos", this.listadoDeNombresOrden);
}

/**
 * Función principal para responder al evento de elegir la opción "Listar jugadores"
 */
Plantilla.procesarListadoJugadores = function () {
    this.descargarRuta("/plantilla/get-todos", this.listadoJugadores)
}

/**
 * Función principal para responder al evento de elegir la opción "Datos de un jugador"
 */
Plantilla.procesarListadoAleatorio = function() {
    this.descargarRuta("/plantilla/get-todos", this.listadoAleatorio)
}

