function adicionarTarea() {
    const nuevaTarea = document.getElementById("nueva-tarea");
    const texto = nuevaTarea.value.trim();
    const lista = document.getElementById("list-group");
    const li = document.createElement("li");
    li.className = "list-group-item";

    const textSpan = document.createElement("span");
    textSpan.textContent = texto;

    // Crear el botón de eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm btn-delete';
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.onclick = function() {
      deleteItem(this);
    };

    // Agregar el texto y el botón al <li>
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
            
    // Agregar el <li> a la lista
    lista.appendChild(li);

    // Mostrar alerta de éxito
    showAlert(`Tarea agregada exitosamente: "${texto}"`, 'success');
                
    // Limpiar el input
    nuevaTarea.value = '';
    nuevaTarea.focus();    
}
        
// Función para eliminar un item
function deleteItem(btn) {
    const li = btn.parentElement;
    li.style.opacity = '0';
    li.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        li.remove();
    }, 300);
}

function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alertContainer');

    // Crear la alerta
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        <strong>${type === 'success' ? '✓' : '!'}</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
            
    // Agregar la alerta al contenedor
    alertContainer.appendChild(alertDiv);
            
    // Auto-eliminar después de 3 segundos
    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => alertDiv.remove(), 150);
    }, 3000);
}

// Permitir agregar con la tecla Enter
document.getElementById("nueva-tarea").addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addItem();
    }
});
