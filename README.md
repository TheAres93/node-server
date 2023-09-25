## Uso de `async/await` vs. `.then()`

En el código previamente proporcionado, se utilizan dos enfoques para manejar operaciones asincrónicas: `async/await` y el método `.then()`. Ambos son válidos y tienen sus diferencias:

### `async/await`

- **Simplicidad y Claridad:** Cuando usamos `async` y `await`, el código parece más síncrono y fácil de seguir. Por ejemplo, podemos usar `await` para esperar que se resuelva una promesa antes de continuar.

- **Ejemplo en el código:** En la función `agregarTarea`, usamos `async/await` para agregar una tarea y obtener un mensaje de éxito de manera más legible.

### `.then()`

- **Expresión explícita:** El método `.then()` se usa para manejar promesas de manera más explícita. Permite encadenar acciones que deben ejecutarse cuando una promesa se resuelve o rechaza.

- **Ejemplo en el código:** En las funciones `eliminarTarea` y `completarTarea`, utilizamos `.then()` para mostrar una lista de tareas antes de eliminar o completar una tarea específica.

### Elección entre ambos

La elección entre `async/await` y `.then()` depende de tu preferencia y el contexto del código. `async/await` se prefiere cuando deseas que el código se vea más síncrono y legible. `.then()` puede ser útil cuando necesitas un control más detallado sobre el flujo asincrónico o estás trabajando con múltiples promesas en secuencia.

Ambos enfoques son válidos y útiles en diferentes situaciones. La elección depende de cómo deseas estructurar tu código y qué te resulta más cómodo.
