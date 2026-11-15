# Agenda de tareas Proyecto final

- **Nombre:** [santiago guiza]
- **Asignatura:** Desarrollo Web I
- **Idea elegida:** Agenda de tareas (nivel básico), con hoja de presentación (ficha del estudiante).

## Qué hace
- **Ficha:** guarda nombre, programa, correo y frase en `localStorage` y los muestra en una tarjeta. Valida que el nombre no esté vacío y que el correo tenga formato válido.
- **Tareas:** crear, completar, editar, eliminar y filtrar (todas, pendientes, completadas). Se conservan al recargar.
- **Modo oscuro:** la preferencia queda guardada.

## Estructura
```
index.html
css/estilos.css   -> variables de color, diseño adaptable y animaciones
js/datos.js       -> datos base de la ficha
js/storage.js     -> lectura y escritura en localStorage
js/ui.js          -> cambios visibles en la página
js/app.js         -> escucha eventos y conecta los módulos
```

## Cómo ejecutarlo
Los módulos de JavaScript (`import`/`export`) no funcionan abriendo el archivo con doble clic.
1. Abrir la carpeta en Visual Studio Code.
2. Clic derecho en `index.html` → **Open with Live Server**.
3. Se abre en el navegador (por ejemplo, http://127.0.0.1:5500).


## Navegación por materias
La barra de pestañas tiene **Inicio** (ficha y resumen de pendientes por materia) y una pestaña por materia. Cada materia tiene sus propias tareas, con su filtro y su contador, y su propia dirección (por ejemplo `#programacion`), así que se puede enlazar y funciona con los botones Atrás y Adelante del navegador.

Para agregar, quitar o renombrar materias se edita la lista `materias` en `js/datos.js`. El `id` solo lleva minúsculas, números y guiones. Las tareas que se guardaron antes de existir las materias pasan a la primera de la lista.

## Accesibilidad y buenas prácticas
Revisado con la lista de la guía "Buenas prácticas, accesibilidad y despliegue":
- Barra de navegación con `nav` etiquetado y `aria-current="page"` en la pestaña activa; el foco pasa al título de la vista al cambiar de pestaña.
- Enlace "Saltar al contenido" al inicio, `lang="es"`, un solo `h1` y encabezados en orden.
- Todos los campos con `label` conectado y mensajes de error en texto con `role="status"`.
- Contraste mínimo de 4.5:1 en modo claro y en modo oscuro.
- Foco visible, uso completo con teclado y el foco vuelve al control correcto al editar, completar o eliminar una tarea.
- Los filtros indican su estado con `aria-pressed` y el contador de tareas se anuncia a lectores de pantalla.
- Animaciones desactivadas con `prefers-reduced-motion`; diseño probado a 360 px; tamaños en `rem`.
- JavaScript con una responsabilidad por módulo, `textContent` en lugar de `innerHTML` y errores de `localStorage` capturados.

## Publicación
**Enlace público (GitHub Pages):** https://USUARIO.github.io/NOMBRE-REPO/  <!-- reemplazar con su enlace real -->

Para publicar: subir el contenido de esta carpeta a un repositorio público (con `index.html` en la raíz), ir a Settings → Pages → *Deploy from a branch* → `main` / `(root)`. Los datos se guardan en `localStorage`, por lo que cada dispositivo tiene los suyos.
