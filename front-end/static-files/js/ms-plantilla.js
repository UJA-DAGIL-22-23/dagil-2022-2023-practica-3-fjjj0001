/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

let jugadores = null;

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

// Plantilla de jugadores vacía
Plantilla.datosJugadoresNulos = {
    ref: {
        "@ref": {
            id: ""
        }
    },
    data: {
        nombre: "",
        apellidos: "",
        apodo: "",
        fecha_nacimiento: {
            dia: "",
            mes: "",
            año: ""
        },
        dorsal: "",
        posicion: "",
        equipos_jugados: ""
    }
};

Plantilla.vectorJugadoresNulos = [
    {
      ref: {
        "@ref": {
          id: ""
        }
      },
      data: {
        nombre: "",
        apellidos: "",
        apodo: "",
        fecha_nacimiento: {
          dia: "",
          mes: "",
          año: ""
        },
        dorsal: "",
        posicion: "",
        equipos_jugados: ""
      }
    }
  ];
  

// Tags que voy a usar para sustituir los campos
Plantilla.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "APODO": "### APODO ###",
    "DIA": "### DIA ###",
    "MES": "### MES ###",
    "ANIO": "### AÑO ###",
    "DORSAL": "### DORSAL ###",
    "POSICION": "### POSICION ###",
    "EQUIPOS_JUGADOS": "### EQUIPOS_JUGADOS ###"
}

/// Plantilla para poner los datos de un jugador en un tabla dentro de un formulario
Plantilla.plantillaFormularioJugador = {}

Plantilla.siguiente = function (i) {
    Plantilla.mostrar(i + 1)
}

// Cabecera del formulario para mostrar los datos de un jugador
Plantilla.plantillaFormularioJugador.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-personas">
        <thead>
            <th width="10%">Id</th><th width="20%">Nombre</th><th width="20%">Apellidos</th>
            <th width="20%">Apodo</th><th width="20%">Fecha de nacimiento</th><th width="20%">Dorsal</th>
            <th width="20%">Posición</th><th width="20%">Trayectoria</th><th width="20%">Opciones</th>
        </thead>
        <tbody>
            <tr title="${Plantilla.plantillaTags.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="form-jugador-id"
                        value="${Plantilla.plantillaTags.ID}" 
                        name="id_jugador"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-jugador-nombre" required value="${Plantilla.plantillaTags.NOMBRE}" 
                        name="nombre_jugador"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-jugador-apellidos" required value="${Plantilla.plantillaTags.APELLIDOS}" 
                        name="apellidos_jugador"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-jugador-apodo" required value="${Plantilla.plantillaTags.APODO}" 
                        name="apodo_jugador"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-jugador-dia" required value="${Plantilla.plantillaTags.DIA}"
                        name="dia_jugador"/>-
                    <input type="number" class="form-persona-elemento editable" disabled
                        id="form-jugador-mes" required value="${Plantilla.plantillaTags.MES}"
                        name="mes_jugador"/>-
                    <input type="number" class="form-persona-elemento editable" disabled
                        id="form-jugador-anio" required value="${Plantilla.plantillaTags.ANIO}"
                        name="año_jugador"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-jugador-dorsal" required value="${Plantilla.plantillaTags.DORSAL}" 
                        name="dorsal_jugador"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-jugador-posicion" required value="${Plantilla.plantillaTags.POSICION}" 
                        name="posicion_jugador"/></td>
                <td><p class="form-persona-elemento"
                        id="form-jugador-trayectoria" name="equipos-jugados-jugador">${Plantilla.plantillaTags.EQUIPOS_JUGADOS}</p></td>
                <td>
                    <div><a href="javascript:Plantilla.editar()" id="editar-btn" onclick="Plantilla.mostrarBotonesEdicion()" class="opcion-secundaria mostrar">Editar</a></div>
                    <div><a href="javascript:Plantilla.guardar()" id="guardar-btn" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Plantilla.mostrar('${Plantilla.plantillaTags.ID}')" id="cancelar-btn" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;

/**
 * Función para ocultar el botón de editar y mostrar los botones de guardar y cancelar
 */
Plantilla.mostrarBotonesEdicion = function () {
    // Cambiar la clase de los botones de ocultar a mostrar
    document.getElementById("guardar-btn").classList.remove("ocultar");
    document.getElementById("cancelar-btn").classList.remove("ocultar");
    document.getElementById("editar-btn").classList.remove("mostrar");
    document.getElementById("guardar-btn").classList.add("mostrar");
    document.getElementById("cancelar-btn").classList.add("mostrar");
    document.getElementById("editar-btn").classList.add("ocultar");

}

/**
 * Función para habilitar los campos que serán editables de un jugador y cambia la visibilidad de los botones
 */
Plantilla.editar = function () {
    document.getElementById("form-jugador-nombre").disabled = false;
    document.getElementById("form-jugador-apellidos").disabled = false;
    document.getElementById("form-jugador-apodo").disabled = false;
    document.getElementById("form-jugador-dia").disabled = false;
    document.getElementById("form-jugador-mes").disabled = false;
    document.getElementById("form-jugador-anio").disabled = false;
}

/**
 * Función para modificar los campos del formulario
 * @param {*} plantilla Plantilla del formulario
 * @param {*} jugador Datos del jugador que vamos a mostrar
 * @returns 
 */
Plantilla.sustituyeTags = function (plantilla, jugador) {
    // Si no se ha proporcionado valor para jugador
    jugador = jugador || this.datosJugadoresNulos

    // Si jugador NO es un objeto 
    if (typeof jugador !== "object") jugador = this.datosJugadoresNulos

    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), jugador.ref['@ref'].id)
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), jugador.data.nombre)
        .replace(new RegExp(Plantilla.plantillaTags.APELLIDOS, 'g'), jugador.data.apellidos)
        .replace(new RegExp(Plantilla.plantillaTags.APODO, 'g'), jugador.data.apodo)
        .replace(new RegExp(Plantilla.plantillaTags.DIA, 'g'), jugador.data.fecha_nacimiento.dia)
        .replace(new RegExp(Plantilla.plantillaTags.MES, 'g'), jugador.data.fecha_nacimiento.mes)
        .replace(new RegExp(Plantilla.plantillaTags.ANIO, 'g'), jugador.data.fecha_nacimiento.año)
        .replace(new RegExp(Plantilla.plantillaTags.DORSAL, 'g'), jugador.data.dorsal)
        .replace(new RegExp(Plantilla.plantillaTags.POSICION, 'g'), jugador.data.posicion)
        .replace(new RegExp(Plantilla.plantillaTags.EQUIPOS_JUGADOS, 'g'), jugador.data.equipos_jugados)
}

/**
 * Función para actualizar en el formulario los datos de un jugador
 * @param {*} jugador Datos del jugador que vamos a mostrar en la plantilla del formulario
 * @returns 
 */
Plantilla.plantillaFormularioJugador.actualiza = function (jugador) {
    // Si no se ha proporcionado valor para jugador
    jugador = jugador || this.datosJugadoresNulos

    // Si jugador NO es un objeto 
    if (typeof jugador !== "object") jugador = this.datosJugadoresNulos

    return Plantilla.sustituyeTags(this.formulario, jugador)
}

/**
 * Función para actualizar el frontend con los datos del jugador
 * @param {*} jugador Datos del jugador
 */
Plantilla.unJugador = function (jugador) {
    // Si no se ha proporcionado valor para jugador
    jugador = jugador || this.datosJugadoresNulos

    // Si jugador NO es un objeto 
    if (typeof jugador !== "object") jugador = this.datosJugadoresNulos

    let msj = Plantilla.plantillaFormularioJugador.actualiza(jugador)
    Frontend.Article.actualizar("Mostrar un jugador", msj)
    return msj;
}

/**
 * Función para recupar un jugador de la base de datos por su id
 * @param {*} idJugador ID del jugador que queremos recuperar de la base de datos
 * @param {*} callBackFn Función que se va a llamara cuando recuperemos al jugador
 */
Plantilla.recuperaJugador = async function (idJugador, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getPorId/" + idJugador
        const response = await fetch(url);
        if (response) {
            const jugador = await response.json()
            callBackFn(jugador)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}

/**
 * Función para mostrar los datos de un jugador
 * @param {*} idJugador ID del jugador que queremos mostrar los datos
 */
Plantilla.mostrar = function (idJugador) {
    this.recuperaJugador(idJugador, this.unJugador)
}

/**
 * Función para guardar los cambios realizados en un jugador
 */
Plantilla.guardar = async function () {
    try {
        let url = Frontend.API_GATEWAY + "/plantilla/set-cambios/"
        let id_jugador = document.getElementById("form-jugador-id").value
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "id_jugador": id_jugador,
                "nombre_jugador": document.getElementById("form-jugador-nombre").value,
                "apellidos_jugador": document.getElementById("form-jugador-apellidos").value,
                "apodo_jugador": document.getElementById("form-jugador-apodo").value,
                "dorsal_jugador": document.getElementById("form-jugador-dorsal").value,
                "posicion_jugador": document.getElementById("form-jugador-posicion").value,
                "fecha_nacimiento_jugador": {
                    "dia": document.getElementById("form-jugador-dia").value,
                    "mes": document.getElementById("form-jugador-mes").value,
                    "año": document.getElementById("form-jugador-anio").value,
                },
                "equipos_jugados_jugador": document.getElementById("form-jugador-trayectoria").value
            }), // body data type must match "Content-Type" header
        })
        /*
        Error: No procesa bien la respuesta devuelta
        if (response) {
            const persona = await response.json()
            alert(persona)
        }
        */
        Plantilla.mostrar(id_jugador)
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}

////////////////////////////////

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
        <th width="80%">Nombre de los jugadores</th>
    </thead>
    <tbody>`;

    // Si jugadores.data es un array, es decir, jugadores es distinto de datosJugadoresNulos, se muestra el nombre de todos
    if (Array.isArray(jugadores.data)) {
        for (let i = 0; i < jugadores.data.length; ++i) {
            mensajeAMostrar += `
            <tr>>
                <td>${jugadores.data[i].data.nombre}</td>
                <td>
                    <div><a href="javascript:Plantilla.mostrar('${jugadores.data[i].ref['@ref'].id}')" class="opcion-secundaria mostrar">Mostrar</a></div>
                </td>
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


// Plantilla para poner los datos de los jugadores en una tabla
Plantilla.plantillaTablaPersonas = {}


// Cabecera de la tabla
Plantilla.plantillaTablaPersonas.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                    <th width="10%">Id</th>
                    <th width="20%" id="columna-nombre">Nombre</th>
                    <th width="20%">Apellidos</th>
                    <th width="20%">Apodo</th>
                    <th width="20%">Fecha de nacimiento</th>
                    <th width="20%">Dorsal</th>
                    <th width="20%">Posición</th>
                    <th width="20%">Trayectoria</th>
                    <th width="20%">Opciones</th>
                    </thead>
                    <tbody>
    `;

// Elemento TR que muestra los datos de una persona
Plantilla.plantillaTablaPersonas.cuerpo = `
    <tr title="${Plantilla.plantillaTags.ID}">
        <td>${Plantilla.plantillaTags.ID}</td>
        <td>${Plantilla.plantillaTags.NOMBRE}</td>
        <td>${Plantilla.plantillaTags.APELLIDOS}</td>
        <td>${Plantilla.plantillaTags.APODO}</td>
        <td>${Plantilla.plantillaTags.DIA}/${Plantilla.plantillaTags.MES}/${Plantilla.plantillaTags.ANIO}</td>
        <td>${Plantilla.plantillaTags.DORSAL}</td>
        <td>${Plantilla.plantillaTags.POSICION}</td>
        <td>${Plantilla.plantillaTags.EQUIPOS_JUGADOS}</td>
        <td>
                    <div><a href="javascript:Plantilla.mostrar('${Plantilla.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
    `;

// Pie de la tabla
Plantilla.plantillaTablaPersonas.pie = `        </tbody>
             </table>
             `;

/** 
 * Función para actualizar los datos de la tabla con los del jugador que se le pasa 
 * @param jugador Datos del jugador
 */ 
Plantilla.plantillaTablaPersonas.actualiza = function (jugador) {
    return Plantilla.sustituyeTags(this.cuerpo, jugador)
}

/**
 * Función para recuperar los jugadores de la base de datos y devuelve vector.data
 * @param callBackFn Función que se va a llamar cuando se recuperen los datos 
 */
Plantilla.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/get-todos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorJugadores = null
    if (response) {
        vectorJugadores = await response.json()
        callBackFn(vectorJugadores.data)
    }
}

/**
 * Función para mostrar los datos de los jugadores en la tabla
 * @param {vector} vector Array con los datos de los jugadores
 */
Plantilla.imprimeJugadores = function (vector) {

    // Si no se ha proporcionado valor para datosDescargados
    vector = vector || this.vectorJugadoresNulos

    // Si datos descargados NO es un objeto 
    if (typeof vector !== "object") vector = this.vectorJugadoresNulos

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaPersonas.cabecera
    vector.forEach(e => msj += Plantilla.plantillaTablaPersonas.actualiza(e))
    msj += Plantilla.plantillaTablaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de jugadores", msj)
    return msj;
}

// Función para listar todos los jugadores de la base de datos
Plantilla.listar = function () {
    Plantilla.recupera(Plantilla.imprimeJugadores);
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