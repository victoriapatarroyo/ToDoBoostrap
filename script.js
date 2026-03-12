// ================================================
//  ToDo App - Lógica principal
//  Autora: Victoria Eugenia Patarroyo Villamil
// ================================================

// ------------------------------------------------
// Esta función se ejecuta cuando el usuario hace clic
// en "Agregar" o presiona Enter. Su trabajo es tomar
// lo que escribió, crear una tarjeta de tarea y
// añadirla a la lista.
// ------------------------------------------------
function adicionarTarea() {
  const input = document.getElementById("nueva-tarea");
  const texto = input.value.trim(); // Quitamos espacios en blanco al inicio y al final

  // Si el campo está vacío, avisamos y no hacemos nada más
  if (!texto) {
    showAlert("⚠️ Escribe una tarea primero", "danger");
    input.focus();
    return;
  }

  // Buscamos la lista donde viven todas las tareas
  const lista = document.getElementById("list-group");

  // Creamos una fila nueva para la tarea
  const li = document.createElement("li");
  li.className = "tarea-item";

  // Creamos el círculo de verificación (para marcar como hecha)
  const check = document.createElement("div");
  check.className = "task-check";
  check.innerHTML = "✓";
  check.title = "Marcar como completada";
  check.onclick = function () {
    toggleDone(li);
  }; // Al hacer clic llama a toggleDone

  // Creamos el texto que muestra el nombre de la tarea
  const textSpan = document.createElement("span");
  textSpan.className = "task-text";
  textSpan.textContent = texto;

  // Creamos el botón de eliminar con el ícono de caneca
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn-delete";
  deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`;
  deleteBtn.title = "Eliminar tarea";
  deleteBtn.onclick = function () {
    deleteItem(li);
  }; // Al hacer clic llama a deleteItem

  // Metemos el check, el texto y la caneca dentro de la fila
  li.appendChild(check);
  li.appendChild(textSpan);
  li.appendChild(deleteBtn);

  // Añadimos la fila al final de la lista visible
  lista.appendChild(li);

  // Revisamos si hay que ocultar el mensaje de "lista vacía"
  updateEmptyState();

  // Actualizamos el número de tareas pendientes
  updateCount();

  // Mostramos un mensaje de confirmación arriba a la derecha
  showAlert(`✅ Tarea agregada: "${texto}"`, "success");

  // Borramos el campo de texto y ponemos el cursor listo para la siguiente tarea
  input.value = "";
  input.focus();
}

// ------------------------------------------------
// Esta función marca o desmarca una tarea como completada.
// Si la tarea ya estaba hecha, la vuelve a poner pendiente.
// ------------------------------------------------
function toggleDone(li) {
  li.classList.toggle("done"); // Agrega "done" si no la tiene, o la quita si ya la tiene
  updateCount(); // Volvemos a contar cuántas tareas quedan pendientes
}

// ------------------------------------------------
// Esta función elimina una tarea de la lista.
// Primero la hace desaparecer con una pequeña animación,
// luego la borra del HTML por completo.
// ------------------------------------------------
function deleteItem(li) {
  // Hacemos que la tarea se vuelva transparente y se mueva hacia la derecha
  li.style.opacity = "0";
  li.style.transform = "translateX(30px)";
  li.style.transition = "opacity 0.25s ease, transform 0.25s ease";

  // Esperamos a que termine la animación (250ms) antes de borrarla del todo
  setTimeout(() => {
    li.remove();
    updateEmptyState(); // Revisamos si la lista quedó vacía
    updateCount(); // Actualizamos el contador
  }, 250);
}

// ------------------------------------------------
// Esta función decide si mostrar el mensaje "No hay tareas aún".
// Lo muestra cuando la lista está vacía, lo oculta cuando hay tareas.
// ------------------------------------------------
function updateEmptyState() {
  const lista = document.getElementById("list-group");
  const empty = document.getElementById("empty-state");
  const listaEstaVacia = lista.children.length === 0;

  // Si la lista está vacía mostramos el mensaje, si no, lo ocultamos
  empty.classList.toggle("visible", listaEstaVacia);
}

// ------------------------------------------------
// Esta función cuenta cuántas tareas siguen pendientes
// y actualiza el texto que aparece encima de la lista.
// ------------------------------------------------
function updateCount() {
  const todasLasTareas = document.querySelectorAll("#list-group .tarea-item");
  const tareasCompletadas = document.querySelectorAll(
    "#list-group .tarea-item.done",
  );
  const tareasPendientes = todasLasTareas.length - tareasCompletadas.length;
  const contador = document.getElementById("task-count");

  if (todasLasTareas.length === 0) {
    // No hay ninguna tarea todavía
    contador.textContent = "0 tareas pendientes";
  } else if (tareasPendientes === 0) {
    // Hay tareas pero todas están completadas, mostramos celebración
    contador.textContent = `🎉 ¡Todas las tareas completadas!`;
  } else {
    // Mostramos cuántas faltan, usando el plural correcto en español
    contador.textContent = `${tareasPendientes} tarea${tareasPendientes !== 1 ? "s" : ""} pendiente${tareasPendientes !== 1 ? "s" : ""}`;
  }
}

// ------------------------------------------------
// Esta función muestra un pequeño aviso en la esquina
// superior derecha de la pantalla.
// Desaparece solo después de 3 segundos.
// type "success" = verde  |  type "danger" = rojo
// ------------------------------------------------
function showAlert(message, type = "success") {
  const container = document.getElementById("alertContainer");

  // Creamos la cajita del aviso con su ícono y botón de cerrar
  const div = document.createElement("div");
  div.className = `alert alert-${type}`;
  div.innerHTML = `
        <span class="alert-icon">${type === "success" ? "✅" : "⚠️"}</span>
        <span>${message}</span>
        <button class="alert-close" onclick="this.parentElement.remove()">✕</button>
    `;

  // La añadimos a la pantalla
  container.appendChild(div);

  // A los 3 segundos la hacemos desaparecer suavemente
  setTimeout(() => {
    div.style.opacity = "0";
    div.style.transition = "opacity 0.3s ease";
    setTimeout(() => div.remove(), 300); // La borramos después del fundido
  }, 3000);
}

// ------------------------------------------------
// Escuchamos si el usuario presiona Enter en el campo de texto.
// Si lo hace, es igual a hacer clic en "Agregar".
// ------------------------------------------------
document
  .getElementById("nueva-tarea")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") adicionarTarea();
  });

// ------------------------------------------------
// Cuando la página carga por primera vez, dejamos todo
// en su estado correcto: mostramos el mensaje de vacío
// y ponemos el contador en cero.
// ------------------------------------------------
updateEmptyState();
updateCount();
