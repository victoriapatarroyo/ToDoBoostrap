// ================================================
//  ToDo App - Lógica principal
//  Autora: Victoria Eugenia Patarroyo Villamil
// ================================================

// ------------------------------------------------
// Agrega una nueva tarea a la lista
// Se llama al hacer clic en "Agregar" o presionar Enter
// ------------------------------------------------
function adicionarTarea() {
  const input = document.getElementById("nueva-tarea");
  const texto = input.value.trim(); // Elimina espacios al inicio y al final

  // Validación: no permite agregar una tarea vacía
  if (!texto) {
    showAlert("⚠️ Escribe una tarea primero", "danger");
    input.focus();
    return;
  }

  const lista = document.getElementById("list-group");

  // Crea el elemento <li> que representará la tarea
  const li = document.createElement("li");
  li.className = "list-group-item";

  // --- Checkbox para marcar la tarea como completada ---
  const check = document.createElement("div");
  check.className = "task-check";
  check.innerHTML = "✓";
  check.title = "Marcar como completada";
  check.onclick = function () {
    toggleDone(li);
  }; // Al hacer clic, alterna el estado

  // --- Texto de la tarea ---
  const textSpan = document.createElement("span");
  textSpan.className = "task-text";
  textSpan.textContent = texto;

  // --- Botón eliminar con ícono SVG de caneca ---
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn-delete";
  deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`;
  deleteBtn.title = "Eliminar tarea";
  deleteBtn.onclick = function () {
    deleteItem(li);
  }; // Al hacer clic, elimina la tarea

  // Ensambla los elementos dentro del <li>
  li.appendChild(check);
  li.appendChild(textSpan);
  li.appendChild(deleteBtn);

  // Agrega el <li> al final de la lista
  lista.appendChild(li);

  // Actualiza el estado vacío y el contador de tareas
  updateEmptyState();
  updateCount();

  // Muestra una alerta de confirmación
  showAlert(`✅ Tarea agregada: "${texto}"`, "success");

  // Limpia el input y devuelve el foco para agregar otra tarea
  input.value = "";
  input.focus();
}

// ------------------------------------------------
// Alterna una tarea entre completada y pendiente
// Agrega o quita la clase "done" del elemento <li>
// ------------------------------------------------
function toggleDone(li) {
  li.classList.toggle("done");
  updateCount(); // Recalcula el contador al cambiar el estado
}

// ------------------------------------------------
// Elimina una tarea de la lista con animación
// La tarea se desliza hacia la derecha antes de desaparecer
// ------------------------------------------------
function deleteItem(li) {
  // Aplica la animación de salida
  li.style.opacity = "0";
  li.style.transform = "translateX(30px)";
  li.style.transition = "opacity 0.25s ease, transform 0.25s ease";

  // Espera a que termine la animación antes de eliminar del DOM
  setTimeout(() => {
    li.remove();
    updateEmptyState(); // Verifica si la lista quedó vacía
    updateCount(); // Actualiza el contador
  }, 250);
}

// ------------------------------------------------
// Muestra u oculta el mensaje de "lista vacía"
// Se activa cada vez que se agrega o elimina una tarea
// ------------------------------------------------
function updateEmptyState() {
  const lista = document.getElementById("list-group");
  const empty = document.getElementById("empty-state");
  const isEmpty = lista.children.length === 0;

  // Agrega la clase "visible" si no hay tareas, la quita si hay al menos una
  empty.classList.toggle("visible", isEmpty);
}

// ------------------------------------------------
// Actualiza el contador de tareas pendientes
// Muestra un mensaje especial si todas están completadas
// ------------------------------------------------
function updateCount() {
  const items = document.querySelectorAll("#list-group .list-group-item");
  const done = document.querySelectorAll("#list-group .list-group-item.done");
  const pending = items.length - done.length; // Tareas sin completar
  const counter = document.getElementById("task-count");

  if (items.length === 0) {
    // No hay ninguna tarea en la lista
    counter.textContent = "0 tareas pendientes";
  } else if (pending === 0) {
    // Todas las tareas están completadas
    counter.textContent = `🎉 ¡Todas las tareas completadas!`;
  } else {
    // Muestra cuántas tareas faltan, con plural correcto
    counter.textContent = `${pending} tarea${pending !== 1 ? "s" : ""} pendiente${pending !== 1 ? "s" : ""}`;
  }
}

// ------------------------------------------------
// Muestra una alerta temporal en la esquina superior derecha
// type: "success" (verde) o "danger" (rojo)
// Se elimina automáticamente después de 3 segundos
// ------------------------------------------------
function showAlert(message, type = "success") {
  const container = document.getElementById("alertContainer");

  // Crea el elemento de alerta con el ícono y botón de cierre
  const div = document.createElement("div");
  div.className = `alert alert-${type}`;
  div.innerHTML = `
        <span class="alert-icon">${type === "success" ? "✅" : "⚠️"}</span>
        <span>${message}</span>
        <button class="alert-close" onclick="this.parentElement.remove()">✕</button>
    `;

  container.appendChild(div);

  // Desvanece y elimina la alerta después de 3 segundos
  setTimeout(() => {
    div.style.opacity = "0";
    div.style.transition = "opacity 0.3s ease";
    setTimeout(() => div.remove(), 300); // Espera el fade antes de quitar del DOM
  }, 3000);
}

// ------------------------------------------------
// Evento: permite agregar una tarea presionando Enter
// ------------------------------------------------
document
  .getElementById("nueva-tarea")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") adicionarTarea();
  });

// ------------------------------------------------
// Inicialización: establece el estado correcto al cargar la página
// ------------------------------------------------
updateEmptyState();
updateCount();
