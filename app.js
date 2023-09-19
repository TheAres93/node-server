const readline = require('readline');
const colors = require('colors');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tareas = [];
let nombreUsuario = '';

function bienvenida() {
  rl.question('Por favor, ingresa tu nombre: ', (nombre) => {
    nombreUsuario = nombre;
    console.log(colors.green(`Bienvenido, ${nombreUsuario}!`));
    mostrarMenu();
  });
}

function despedida() {
  console.log(colors.green(`Hasta luego, ${nombreUsuario}!`));
  rl.close();
}

function agregarTarea() {
  rl.question('Descripción de la tarea: ', (descripcion) => {
    tareas.push({
      id: tareas.length + 1,
      descripcion,
      completada: false
    });
    console.log(colors.blue('Tarea añadida con éxito.'));
    mostrarMenu();
  });
}

function eliminarTarea() {
  mostrarTareas();
  rl.question('Número de tarea a eliminar: ', (numeroTarea) => {
    const indice = parseInt(numeroTarea) - 1;
    if (indice >= 0 && indice < tareas.length) {
      tareas.splice(indice, 1);
      console.log(colors.blue('Tarea eliminada con éxito.'));
    } else {
      console.log(colors.red('Número de tarea no válido.'));
    }
    mostrarMenu();
  });
}

function completarTarea() {
  mostrarTareas();
  rl.question('Número de tarea a marcar como completada: ', (numeroTarea) => {
    const indice = parseInt(numeroTarea) - 1;
    if (indice >= 0 && indice < tareas.length) {
      tareas[indice].completada = true;
      console.log(colors.blue('Tarea marcada como completada.'));
    } else {
      console.log(colors.red('Número de tarea no válido.'));
    }
    mostrarMenu();
  });
}

function listarTareas() {
  mostrarTareas();
  mostrarMenu();
}

function mostrarTareas() {
  if (tareas.length === 0) {
    console.log(colors.yellow('No hay tareas registradas.'));
  } else {
    console.log('Lista de tareas:');
    tareas.forEach((tarea, index) => {
      const estado = tarea.completada ? colors.green('Completada') : colors.red('Pendiente');
      console.log(`${index + 1}. [${estado}] ${tarea.descripcion}`);
    });
  }
}

function mostrarMenu() {
  rl.question(
    `\nHola, ${nombreUsuario}! Por favor, selecciona una opción:\n1. Añadir tarea\n2. Eliminar tarea\n3. Completar tarea\n4. Listar tareas\n5. Salir\n`,
    (opcion) => {
      switch (opcion) {
        case '1':
          agregarTarea();
          break;
        case '2':
          eliminarTarea();
          break;
        case '3':
          completarTarea();
          break;
        case '4':
          listarTareas();
          break;
        case '5':
          despedida();
          break;
        default:
          console.log(colors.red('Opción no válida.'));
          mostrarMenu();
      }
    }
  );
}

bienvenida();
