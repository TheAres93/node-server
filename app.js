const readline = require('readline');
const colors = require('colors');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let usuarioNombre = '';
let contadorIndicador = 1;

function solicitarNombreUsuario() {
  return new Promise((resolve, reject) => {
    rl.question('Por favor, ingresa tu nombre de usuario: '.yellow, (nombre) => {
      if (nombre.trim() === '') {
        reject('El nombre de usuario es obligatorio.'.red);
      } else {
        usuarioNombre = nombre;
        resolve();
      }
    });
  });
}

function agregarTarea(tareas, descripcion, estado) {
  return new Promise((resolve, reject) => {
    if (!descripcion || !estado) {
      reject('Todos los campos son obligatorios.'.red);
    } else {
      const tarea = { indicador: contadorIndicador++, descripcion, estado };
      tareas.push(tarea);
      resolve('Tarea agregada con éxito.'.blue);
    }
  });
}

function eliminarTarea(tareas, indicador) {
  return new Promise((resolve, reject) => {
    if (tareas.length === 0) {
      reject('No tienes tareas para eliminar.'.red);
      return;
    }

    console.log('Lista de tareas:');
    tareas.forEach((tarea, index) => {
      console.log(`${index + 1}. ${tarea.descripcion} - Estado: ${tarea.estado}`);
    });

    rl.question('Indicador de la tarea a eliminar: '.yellow, (input) => {
      const tareaIndex = parseInt(input) - 1;
      if (isNaN(tareaIndex) || tareaIndex < 0 || tareaIndex >= tareas.length) {
        reject('Número de tarea no válido.'.red);
      } else {
        const tareaEliminada = tareas.splice(tareaIndex, 1);
        resolve(`Tarea "${tareaEliminada[0].descripcion}" eliminada con éxito.`.blue);
      }
    });
  });
}

function completarTarea(tareas, indicador) {
  return new Promise((resolve, reject) => {
    if (tareas.length === 0) {
      reject('No tienes tareas para completar.'.red);
      return;
    }

    console.log('Lista de tareas:');
    tareas.forEach((tarea, index) => {
      console.log(`${index + 1}. ${tarea.descripcion} - Estado: ${tarea.estado}`);
    });

    rl.question('Indicador de la tarea a completar: '.yellow, (input) => {
      const tareaIndex = parseInt(input) - 1;
      if (isNaN(tareaIndex) || tareaIndex < 0 || tareaIndex >= tareas.length) {
        reject('Número de tarea no válido.'.red);
      } else {
        tareas[tareaIndex].estado = 'completada'.green;
        resolve(`Tarea "${tareas[tareaIndex].descripcion}" marcada como completada.`.blue);
      }
    });
  });
}

function listarTareas(tareas) {
  return new Promise((resolve) => {
    if (tareas.length === 0) {
      console.log('No tienes tareas pendientes.'.red);
    } else {
      console.log('Tareas pendientes:');
      tareas.forEach((tarea) => {
        const estadoColoreado = tarea.estado === 'pendiente' ? tarea.estado.red : tarea.estado.green;
        console.log(`${tarea.indicador}: ${tarea.descripcion} - Estado: ${estadoColoreado}`);
      });
    }
    resolve();
  });
}

function salir() {
  rl.close();
  console.log(`Gracias por usar la aplicación, ${usuarioNombre}.\n`.blue);
}

solicitarNombreUsuario()
  .then(() => {
    const tareas = [];

    function mostrarMenu() {
      console.log('\nOpciones:');
      console.log('1. Agregar tarea');
      console.log('2. Eliminar tarea');
      console.log('3. Completar tarea');
      console.log('4. Listar tareas');
      console.log('5. Salir');
      rl.question('Selecciona una opción: '.yellow, (opcion) => {
        switch (opcion) {
          case '1':
            rl.question('Descripción de la tarea: '.yellow, (descripcion) => {
              agregarTarea(tareas, descripcion, 'pendiente')
                .then((mensaje) => {
                  console.log(mensaje);
                  mostrarMenu();
                })
                .catch((error) => {
                  console.error(error);
                  mostrarMenu();
                });
            });
            break;
          case '2':
            eliminarTarea(tareas)
              .then((mensaje) => {
                console.log(mensaje);
                mostrarMenu();
              })
              .catch((error) => {
                console.error(error);
                mostrarMenu();
              });
            break;
          case '3':
            completarTarea(tareas)
              .then((mensaje) => {
                console.log(mensaje);
                mostrarMenu();
              })
              .catch((error) => {
                console.error(error);
                mostrarMenu();
              });
            break;
          case '4':
            listarTareas(tareas)
              .then(() => {
                mostrarMenu();
              });
            break;
          case '5':
            salir();
            break;
          default:
            console.log('Opción no válida.'.red);
            mostrarMenu();
            break;
        }
      });
    }

    mostrarMenu();
  })
  .catch((error) => {
    console.error(error);
    rl.close();
  });
