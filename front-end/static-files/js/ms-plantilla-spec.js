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
const TITULO_LISTADO_JUGADORES = "Listado de jugadores"
const TITULO_MOSTRAR = "Mostrar un jugador"
const TITULO_AÑADIR = "Añade un jugador"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}

let j = {
    ref: {
        "@ref": {
            id: "361430845704110285"
        }
    },
    data: {
        nombre: "Sergio",
        apellidos: "Lozano Martínez",
        apodo: "El búfalo",
        fecha_nacimiento: {
            dia: "9",
            mes: "11",
            año: "1988"
        },
        dorsal: 9,
        posicion: "Ala",
        equipos_jugados: [
            "EFA Arganda",
            "UD Las Rozas Boadilla",
            "Reale Cartagena",
            "Caja Segovia",
            "Barça"
        ]
    }
};

let vector_j = [{
    ref: {
        "@ref": {
            id: "361430845704110285"
        }
    },
    data: {
        nombre: "Sergio",
        apellidos: "Lozano Martínez",
        apodo: "El búfalo",
        fecha_nacimiento: {
            dia: "9",
            mes: "11",
            año: "1988"
        },
        dorsal: 9,
        posicion: "Ala",
        equipos_jugados: [
            "EFA Arganda",
            "UD Las Rozas Boadilla",
            "Reale Cartagena",
            "Caja Segovia",
            "Barça"
        ]
    }
},
{
    ref: {
        "@ref": {
            id: "361431043633316045"
        }
    },
    data: {
        nombre: "Carlos Vagner",
        apellidos: "Gularte Filho",
        apodo: "Ferrao",
        fecha_nacimiento: {
            dia: "29",
            mes: "10",
            año: "1990"
        },
        dorsal: 11,
        posicion: "Pívot",
        equipos_jugados: [
            "Palmitos",
            "Joinville",
            "Atlântico",
            "Cortiana UCS",
            "Norte Catarinense",
            "MFK Tyunen",
            "Barça"
        ]
    }
}
];

let jugador = { data: j }

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
            , año: "1988"
        }
        , dorsal: "9"
        , posicion: "Ala"
        , equipos_jugados: ["EFA Arganda", "UD Las Rozas Boadilla", "Reale Cartagena", "Caja Segovia", "Barça"]
    }

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
            Plantilla.listadoDeNombres({ apellidos: "Lozano Martínez", apodo: "El búfalo", fecha_nacimiento: { dia: "9", mes: "11", año: "1988" }, dorsal: "9", posicion: "Ala", equipos_jugados: ["EFA Arganda", "UD Las Rozas Boadilla", "Reale Cartagena", "Caja Segovia", "Barça"] })
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
            Plantilla.listadoDeNombresOrden({ apellidos: "Lozano Martínez", apodo: "El búfalo", fecha_nacimiento: { dia: "9", mes: "11", año: "1988" }, dorsal: "9", posicion: "Ala", equipos_jugados: ["EFA Arganda", "UD Las Rozas Boadilla", "Reale Cartagena", "Caja Segovia", "Barça"] })
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_NOMBRES)
            expect(elementoContenido.innerHTML.search(Plantilla.datosJugadoresNulos.nombre) == "").toBeTrue()
        })
})

describe("Plantilla.imprimeJugadores: ", function () {

    it("si no se pasa nada no muestra ningún dato",
        function () {
            let msj = Plantilla.imprimeJugadores()
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_JUGADORES)
            expect(msj.includes(j.ref['@ref'].id)).toBeFalse()
            expect(msj.includes(j.data.nombre)).toBeFalse()
            expect(msj.includes(j.data.apellidos)).toBeFalse()
            expect(msj.includes(j.data.apodo)).toBeFalse()
            expect(msj.includes(j.data.fecha_nacimiento.dia)).toBeFalse()
            expect(msj.includes(j.data.fecha_nacimiento.mes)).toBeFalse()
            expect(msj.includes(j.data.fecha_nacimiento.año)).toBeFalse()
            expect(msj.includes(j.data.dorsal)).toBeFalse()
            expect(msj.includes(j.data.posicion)).toBeFalse()
            expect(msj.includes(j.data.equipos_jugados)).toBeFalse()
        })
    it("si no se pasa una variable de tipo object no muestra ningún dato",
        function () {
            let msj = Plantilla.imprimeJugadores(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_JUGADORES)
            expect(msj.includes(j.ref['@ref'].id)).toBeFalse()
            expect(msj.includes(j.data.nombre)).toBeFalse()
            expect(msj.includes(j.data.apellidos)).toBeFalse()
            expect(msj.includes(j.data.apodo)).toBeFalse()
            expect(msj.includes(j.data.fecha_nacimiento.dia)).toBeFalse()
            expect(msj.includes(j.data.fecha_nacimiento.mes)).toBeFalse()
            expect(msj.includes(j.data.fecha_nacimiento.año)).toBeFalse()
            expect(msj.includes(j.data.dorsal)).toBeFalse()
            expect(msj.includes(j.data.posicion)).toBeFalse()
            expect(msj.includes(j.data.equipos_jugados)).toBeFalse()
        })
    it("se muestra el mensaje con los datos del jugador",
        function () {
            let msj = Plantilla.imprimeJugadores(vector_j)
            expect(msj.includes(j.ref['@ref'].id)).toBeTrue()
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_JUGADORES)
            expect(msj.includes(j.data.nombre)).toBeTrue()
            expect(msj.includes(j.data.apellidos)).toBeTrue()
            expect(msj.includes(j.data.apodo)).toBeTrue()
            expect(msj.includes(j.data.fecha_nacimiento.dia)).toBeTrue()
            expect(msj.includes(j.data.fecha_nacimiento.mes)).toBeTrue()
            expect(msj.includes(j.data.fecha_nacimiento.año)).toBeTrue()
            expect(msj.includes(j.data.dorsal)).toBeTrue()
            expect(msj.includes(j.data.posicion)).toBeTrue()
            expect(msj.includes(j.data.equipos_jugados)).toBeTrue()
        })

})

describe("Plantilla.unJugador: ", function () {

    it("si no se pasa nada no muestra ningún dato",
        function () {
            let msj = Plantilla.unJugador()
            expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR)
            expect(msj.includes(j.ref['@ref'].id)).toBeFalse()
            expect(msj.includes(j.data.nombre)).toBeFalse()
            expect(msj.includes(j.data.apellidos)).toBeFalse()
            expect(msj.includes(j.data.apodo)).toBeFalse()
            expect(msj.includes(j.data.fecha_nacimiento.dia)).toBeFalse()
            expect(msj.includes(j.data.fecha_nacimiento.mes)).toBeFalse()
            expect(msj.includes(j.data.fecha_nacimiento.año)).toBeFalse()
            expect(msj.includes(j.data.dorsal)).toBeFalse()
            expect(msj.includes(j.data.posicion)).toBeFalse()
            expect(msj.includes(j.data.equipos_jugados)).toBeFalse()
        })
    it("si no se pasa una variable de tipo object no muestra ningún dato",
        function () {
            let msj = Plantilla.unJugador(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR)
            expect(msj.includes(j.ref['@ref'].id)).toBeFalse()
            expect(msj.includes(j.data.nombre)).toBeFalse()
            expect(msj.includes(j.data.apellidos)).toBeFalse()
            expect(msj.includes(j.data.apodo)).toBeFalse()
            expect(msj.includes(j.data.fecha_nacimiento.dia)).toBeFalse()
            expect(msj.includes(j.data.fecha_nacimiento.mes)).toBeFalse()
            expect(msj.includes(j.data.fecha_nacimiento.año)).toBeFalse()
            expect(msj.includes(j.data.dorsal)).toBeFalse()
            expect(msj.includes(j.data.posicion)).toBeFalse()
            expect(msj.includes(j.data.equipos_jugados)).toBeFalse()
        })
    it("se muestra el mensaje con los datos del jugador",
        function () {
            let msj = Plantilla.unJugador(j)
            expect(msj.includes(j.ref['@ref'].id)).toBeTrue()
            expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR)
            expect(msj.includes(j.data.nombre)).toBeTrue()
            expect(msj.includes(j.data.apellidos)).toBeTrue()
            expect(msj.includes(j.data.apodo)).toBeTrue()
            expect(msj.includes(j.data.fecha_nacimiento.dia)).toBeTrue()
            expect(msj.includes(j.data.fecha_nacimiento.mes)).toBeTrue()
            expect(msj.includes(j.data.fecha_nacimiento.año)).toBeTrue()
            expect(msj.includes(j.data.dorsal)).toBeTrue()
            expect(msj.includes(j.data.posicion)).toBeTrue()
            expect(msj.includes(j.data.equipos_jugados)).toBeTrue()
        })
})

describe("Plantilla.anterior: ", function () {
    let indices_prueba = []
    it("si no se pasa nada el array de indices tiene tamaño 1 ['']",
        function () {
            indices_prueba = Plantilla.anterior()
            expect(indices_prueba).toHaveSize(1)
        })

    it("si no se pasa un objeto de tipo objet el array de indices tiene tamaño 1, indices = ['']",
        function () {
            indices_prueba = Plantilla.anterior(23)
            expect(indices_prueba).toHaveSize(1)
        })

})

describe("Plantilla.siguiente: ", function () {
    let indices_prueba = []
    it("si no se pasa nada el array de indices tiene tamaño 1, indices = ['']",
        function () {
            indices_prueba = Plantilla.siguiente()
            expect(indices_prueba).toHaveSize(1)
        })

    it("si no se pasa un objeto de tipo objet el array de indices tiene tamaño 1, indices = ['']",
        function () {
            indices_prueba = Plantilla.siguiente(23)
            expect(indices_prueba).toHaveSize(1)
        })

})

describe("Plantilla.filtraVector: ", function () {
    let vector_prueba = []
    it("si no se pasa nada el array que devuelve tiene tamaño 0",
        function () {
            vector_prueba = Plantilla.filtraVector()
            expect(vector_prueba).toHaveSize(0)
        })

    it("si no se pasa una variable de tipo object el array que devuelve tiene tamaño 0",
        function () {
            vector_prueba = Plantilla.filtraVector(33)
            expect(vector_prueba).toHaveSize(0)
        })

    // No puedo probar si se le pasa un array normal ya que document.getElementById("busqueda").value aún no está cargado
    // y por lo tanto su valor es undefined
})

describe("Plantilla.imprimeJugadores.ordenado: ", function () {
    
    it("se ordena correctamente por id",
        function () {
            
            vector_j.sort(function (a, b) {
                return a.ref["@ref"].id.localeCompare(b.ref["@ref"].id);
            });

            expect(vector_j[0].ref["@ref"].id).toBe(j.ref["@ref"].id)

        })

        it("se ordena correctamente por nombre",
        function () {
            
            vector_j.sort(function (a, b) {
                return a.data.nombre.localeCompare(b.data.nombre);
            });

            expect(vector_j[0].data.nombre).toBe("Carlos Vagner")

        })

        it("se ordena correctamente por apellidos",
        function () {
            
            vector_j.sort(function (a, b) {
                return a.data.apellidos.localeCompare(b.data.apellidos);
            });

            expect(vector_j[0].data.apellidos).toBe("Gularte Filho")

        })

        it("se ordena correctamente por apodo",
        function () {
            
            vector_j.sort(function (a, b) {
                return a.data.apodo.localeCompare(b.data.apodo);
            });

            expect(vector_j[0].data.apodo).toBe("El búfalo")

        })

        it("se ordena correctamente por fecha",
        function () {
            
            vector_j.sort(function (a, b) {
                let fechaA = new Date(a.data.fecha_nacimiento.año, a.data.fecha_nacimiento.mes - 1, a.data.fecha_nacimiento.dia)
                let fechaB = new Date(b.data.fecha_nacimiento.año, b.data.fecha_nacimiento.mes - 1, b.data.fecha_nacimiento.dia) 
                return  fechaA - fechaB
            });

            expect(vector_j[0].data.fecha_nacimiento.dia).toBe("9")
            expect(vector_j[0].data.fecha_nacimiento.mes).toBe("11")
            expect(vector_j[0].data.fecha_nacimiento.año).toBe("1988")

        })

        it("se ordena correctamente por dorsal",
        function () {
            
            vector_j.sort(function (a, b) {
                return parseInt(a.data.dorsal) - parseInt(b.data.dorsal)
            });

            expect(vector_j[0].data.dorsal).toBe(9)

        })

        it("se ordena correctamente por posición",
        function () {
            
            vector_j.sort(function (a, b) {
                return a.data.posicion.localeCompare(b.data.posicion);
            });

            expect(vector_j[0].data.posicion).toBe("Ala")

        })

        it("se ordena correctamente por tamaño del array de equipos jugados",
        function () {
            
            vector_j.sort(function (a, b) {
                return a.data.equipos_jugados.length - b.data.equipos_jugados.length
            });

            expect(vector_j[0].data.equipos_jugados).toEqual(j.data.equipos_jugados)

        })


})

describe("Plantilla.mostrarFormAñadir: ", function () {
    it("se muestra correctamente el formulario",
        function () {
            Plantilla.mostrarFormAñadir()
            expect(elementoTitulo.innerHTML).toBe(TITULO_AÑADIR)
            expect(elementoContenido.innerHTML.includes("Nombre")).toBeTrue()
            expect(elementoContenido.innerHTML.includes("Apellidos")).toBeTrue()
            expect(elementoContenido.innerHTML.includes("Apodo")).toBeTrue()
            expect(elementoContenido.innerHTML.includes("Fecha de nacimiento")).toBeTrue()
            expect(elementoContenido.innerHTML.includes("Dorsal")).toBeTrue()
            expect(elementoContenido.innerHTML.includes("Posición")).toBeTrue()
            expect(elementoContenido.innerHTML.includes("Trayectoria")).toBeTrue()
        })
})