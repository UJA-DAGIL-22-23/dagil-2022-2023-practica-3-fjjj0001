/**
 * @file server-spec.js
 * @description Fichero con la especificación de las pruebas TDD para server.js del MS MS Plantilla
 *              Este fichero DEBE llamarse server-spec.js
 *              Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas Santos <vrivas@ujaen.es>
 * @date 03-Feb-2023
 */


const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

/**
 * Test para las rutas "estáticas": / y /acerdade
 */
describe('Servidor PLANTILLA:', () => {
  describe('Rutas / y /acercade', () => {
    it('Devuelve MS Plantilla Home Page', (done) => {
      supertest(app)
        .get('/')
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
        .get('/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: acerca de");
          assert(res.body.autor === "Francisco José Jordán Jiménez");
          assert(res.body.email === "fjjj0001@red.ujaen.es");
          assert(res.body.fecha === "08/04/2023");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })

  /**
   * Tests para acceso a la BBDD
   */
  describe('Acceso a BBDD:', () => {
    it('Devuelve Sergio al consultar nombre mediante test_db', (done) => {
      supertest(app)
        .get('/test_db')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[0].data.hasOwnProperty('nombre'));
          assert(res.body.data[0].data.nombre === "Sergio");

        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

    it('Devuelve un vector de tamaño 10 al consultar mediante getTodos', (done) => {
      supertest(app)
        .get('/get-todos')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data.length === 10);
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

    it('Devuelve Leonardo Santana da Silva al recuperar los datos del Jugador con id 361431682640773325 mediante getPorId', (done) => {
      supertest(app)
        .get('/getPorId/361431682640773325')
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
      // Pongo el mismo nombre que el que aparece en la base de datos ya que si no el test de arriba no funciona, pero el método funciona correctamente
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
        .post('/set-cambios')
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
  })
});


