// Cambios visibles en la página. Se usa textContent para no inyectar HTML.

export function mostrarMensaje(texto, tipo = 'error', selector = '#mensaje') {
  const el = document.querySelector(selector);
  el.textContent = texto;
  el.className = 'mensaje ' + (texto ? tipo : '');
}

export function renderTarjeta(ficha, mensaje = '') {
  document.querySelector('#tarjeta-nombre').textContent = ficha.nombre;
  document.querySelector('#tarjeta-programa').textContent = ficha.programa;
  document.querySelector('#tarjeta-correo').textContent = ficha.correo;
  document.querySelector('#tarjeta-frase').textContent = '“' + ficha.frase + '”';
  mostrarMensaje(mensaje, 'ok');
}

export function llenarFormulario(form, ficha) {
  for (const campo of ['nombre', 'programa', 'correo', 'frase']) {
    form.elements[campo].value = ficha[campo];
  }
}

export function aplicarTema(tema) {
  const oscuro = tema === 'oscuro';
  document.body.classList.toggle('oscuro', oscuro);
  const boton = document.querySelector('#btn-tema');
  boton.textContent = oscuro ? '☀️ Modo claro' : '🌙 Modo oscuro';
  boton.setAttribute('aria-pressed', String(oscuro));
}

export function marcarFiltro(filtro) {
  document.querySelectorAll('[data-filtro]').forEach((b) => {
    const activo = b.dataset.filtro === filtro;
    b.classList.toggle('activo', activo);
    b.setAttribute('aria-pressed', String(activo));
  });
}

function crearBoton(texto, accion, etiqueta) {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = texto;
  b.dataset.accion = accion;
  b.setAttribute('aria-label', etiqueta);
  return b;
}

export function renderTareas(tareas, filtro) {
  const lista = document.querySelector('#lista-tareas');
  lista.replaceChildren();

  const visibles = tareas.filter((t) => {
    if (filtro === 'pendientes') return !t.hecha;
    if (filtro === 'completadas') return t.hecha;
    return true;
  });

  if (visibles.length === 0) {
    const vacio = document.createElement('li');
    vacio.className = 'vacio';
    vacio.textContent = 'No hay tareas para mostrar.';
    lista.append(vacio);
  }

  visibles.forEach((t) => {
    const li = document.createElement('li');
    li.className = 'tarea' + (t.hecha ? ' hecha' : '');
    li.dataset.id = t.id;

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = t.hecha;
    check.dataset.accion = 'alternar';
    check.setAttribute('aria-label', 'Completar: ' + t.titulo);

    const texto = document.createElement('span');
    texto.textContent = t.titulo;

    li.append(
      check,
      texto,
      crearBoton('✏️', 'editar', 'Editar ' + t.titulo),
      crearBoton('🗑️', 'eliminar', 'Eliminar ' + t.titulo)
    );
    lista.append(li);
  });

  const pendientes = tareas.filter((t) => !t.hecha).length;
  document.querySelector('#contador').textContent =
    pendientes + ' pendiente(s) de ' + tareas.length + ' en total';
}

/* ---------- Navegación por materias ---------- */

export function renderMenu(materias) {
  const ul = document.querySelector('#menu-lista');
  ul.replaceChildren();
  [{ id: 'inicio', nombre: 'Inicio' }, ...materias].forEach((m) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + m.id;
    a.textContent = m.nombre;
    a.dataset.ruta = m.id;
    li.append(a);
    ul.append(li);
  });
}

// Muestra la vista de Inicio (materia = null) o la de una materia
export function mostrarVista(id, materia) {
  document.querySelector('#vista-inicio').hidden = materia !== null;
  document.querySelector('#vista-materia').hidden = materia === null;
  if (materia) document.querySelector('#t-materia').textContent = materia.nombre;
  document.title = (materia ? materia.nombre : 'Inicio') + ' · Agenda de tareas';

  document.querySelectorAll('#menu-lista a').forEach((a) => {
    if (a.dataset.ruta === id) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

export function renderResumen(materias, tareas) {
  const lista = document.querySelector('#lista-materias');
  lista.replaceChildren();
  materias.forEach((m) => {
    const propias = tareas.filter((t) => t.materia === m.id);
    const pendientes = propias.filter((t) => !t.hecha).length;

    const a = document.createElement('a');
    a.href = '#' + m.id;
    const nombre = document.createElement('strong');
    nombre.textContent = m.nombre;
    const info = document.createElement('span');
    info.textContent = pendientes + ' pendiente(s) de ' + propias.length + ' en total';
    a.append(nombre, info);

    const li = document.createElement('li');
    li.append(a);
    lista.append(li);
  });
}
