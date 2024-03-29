/**
 * @file server-spec.js 
 * @description Fichero con la especificación de pruebas para la aplicación API-gateway
 * Este fichero DEBE llamarse server-spec.js
 * Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

describe('API Gateway: rutas estáticas', () => {
  describe('Rutas estáticas de MS Plantilla', () => {
    it('Devuelve MS Plantilla Home Page', (done) => {
      supertest(app)
        .get('/plantilla/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve MS Plantilla Acerca De', (done) => {
      supertest(app)
        .get('/plantilla/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: acerca de");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve todos los jugadores de la base de datos, comprueba que se ha devuelto un array', (done) => {
      supertest(app)
        .get('/plantilla/get-todos')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(Array.isArray(res.body.data));
          assert(res.body.data[0].data.hasOwnProperty('nombre'));
          //console.log(res.body.data[0].data.nombre)
          assert(res.body.data[0].data.nombre === "Sergio");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });

    it('Devuelve Leonardo Santana da Silva al recuperar los datos del Jugador con id 361431682640773325 mediante getPorId', (done) => {
      supertest(app)
        .get('/plantilla/getPorId/361431682640773325')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data.hasOwnProperty('nombre'));
          assert(res.body.data.nombre === "Leonardo");
          assert(res.body.data.hasOwnProperty('apellidos'));
          assert(res.body.data.apellidos === "Santana Da Silva");
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

    it('Devuelve Luis al recuperar los datos de la Persona con id 361430845704110285 mediante setCambios', (done) => {
      const NOMBRE_TEST= 'Luis'
      const jugador = {
        id_jugador: '361430845704110285',
        nombre_jugador: NOMBRE_TEST,
        apellidos_jugador: 'Lozano Martínez',
        apodo_jugador: 'El búfalo',
        fecha_nacimiento_jugador: {
          dia: '9',
          mes: '11',
          año: '1988'
        },
        dorsal_jugador: 9,
        posicion_jugador: 'Ala',
        equipos_jugados_jugador: ''
      };
      supertest(app)
        .post('/plantilla/set-cambios')
        .send(jugador)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "Server-spec , /setTodo res.body", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data.hasOwnProperty('nombre'));
          assert(res.body.data.nombre == NOMBRE_TEST);
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );

    });

    it('Cambiamos de nuevo el nombre a Sergio y comprobamos que se cambia correctamente', (done) => {
      const NOMBRE_TEST= 'Sergio'
      const jugador = {
        id_jugador: '361430845704110285',
        nombre_jugador: NOMBRE_TEST,
        apellidos_jugador: 'Lozano Martínez',
        apodo_jugador: 'El búfalo',
        fecha_nacimiento_jugador: {
          dia: '9',
          mes: '11',
          año: '1988'
        },
        dorsal_jugador: 9,
        posicion_jugador: 'Ala',
        equipos_jugados_jugador: ''
      };
      supertest(app)
        .post('/plantilla/set-cambios')
        .send(jugador)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "Server-spec , /setTodo res.body", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data.hasOwnProperty('nombre'));
          assert(res.body.data.nombre == NOMBRE_TEST);
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

    it('Se añade el jugador a la base de datos y los datos son correctos', (done) => {
      const jugador = {
        nombre: "Marcos",
        apellidos: 'Dioney Schmidt',
        apodo: 'Marcao',
        fecha_nacimiento: {
          dia: '9',
          mes: '1',
          año: '1987'
        },
        dorsal: 29,
        posicion: 'Portero',
        equipos_jugados: [
          'Moitas',
          'Guarapauva',
          'Tubarao Futsal',
          'Jimbee Cartagena',
          'Jaén FS',
          'Ribera Navarra FS'
        ]
      };
      supertest(app)
        .post('/plantilla/add-jugador')
        .send(jugador)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "Server-spec , /add-jugador res.body", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data.hasOwnProperty('nombre'));
          assert(res.body.data.nombre === jugador.nombre);

          assert(res.body.data.hasOwnProperty('apellidos'));
          assert(res.body.data.apellidos === jugador.apellidos);

          assert(res.body.data.hasOwnProperty('apodo'));
          assert(res.body.data.apodo === jugador.apodo);

          assert(res.body.data.fecha_nacimiento.dia === jugador.fecha_nacimiento.dia);
          assert(res.body.data.fecha_nacimiento.mes === jugador.fecha_nacimiento.mes);
          assert(res.body.data.fecha_nacimiento.año === jugador.fecha_nacimiento.año);

          assert(res.body.data.hasOwnProperty('dorsal'));
          assert(res.body.data.dorsal === jugador.dorsal);

          assert(res.body.data.hasOwnProperty('posicion'));
          assert(res.body.data.posicion === jugador.posicion);

          //console.log("Lo que obtengo del res: " + res.body.data.equipos_jugados)
          //console.log("Los equipos del jugador: " + jugador.equipos_jugados)
          assert(res.body.data.hasOwnProperty('equipos_jugados'));
          assert(JSON.stringify(res.body.data.equipos_jugados) === JSON.stringify(jugador.equipos_jugados));

        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

    it('Devuelve Marcos (Marcao) al borrar al jugador con id 362643639561617613 con deleteJugador', (done) => {
      /**
       * IMPORTANTE: Para probar este expect, probar con la ID de este jugador porque este ya no está en la BBDD ;)
       */
      supertest(app)
        .delete('/plantilla/delete-jugador/362643639561617613')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data.hasOwnProperty('nombre'));
          assert(res.body.data.nombre === "Marcos");

          assert(res.body.data.hasOwnProperty('apodo'));
          assert(res.body.data.apodo === "Marcao");
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });
  })
});



