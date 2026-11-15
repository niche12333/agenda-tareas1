// Conexión: escucha los eventos y llama a storage.js y ui.js
import { estudianteBase, materias } from './datos.js';
import {
  cargarFicha, guardarFicha,
  cargarTareas, guardarTareas,
  cargarTema, guardarTema
} from './storage.js';
import {
  renderTarjeta, mostrarMensaje, llenarFormulario,
  renderTareas, marcarFiltro, aplicarTema,
  renderMenu, mostrarVista, renderResumen
} from './ui.js';

/* ---------- Ficha ---------- */
const formFicha = document.querySelector('#form-ficha');
let ficha = cargarFicha(estudianteBase);

renderTarjeta(ficha);
llenarFormulario(formFicha, ficha);

formFicha.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const datos = new FormData(formFicha);
  const nombre = datos.get('nombre').trim();
  const correo = datos.get('correo').trim();

  if (nombre === '') {
    mostrarMensaje('El nombre no puede estar vacío.');
    return;
  }
  if (correo !== '' && !/^\S+@\S+\.\S+$/.test(correo)) {
    mostrarMensaje('Ingrese un correo válido.');
    return;
  }

  ficha = {
    ...ficha,
    nombre,
    programa: datos.get('programa').trim() || estudianteBase.programa,
    correo: correo || estudianteBase.correo,
    frase: datos.get('frase').trim() || estudianteBase.frase
  };
  guardarFicha(ficha);
  renderTarjeta(ficha, 'Ficha guardada.');
});

/* ---------- Tema ---------- */
let tema = cargarTema();
aplicarTema(tema);

document.querySelector('#btn-tema').addEventListener('click', () => {
  tema = tema === 'oscuro' ? 'claro' : 'oscuro';
  guardarTema(tema);
  aplicarTema(tema);
});

/* ---------- Tareas ---------- */
const formTarea = document.querySelector('#form-tarea');
const lista = document.querySelector('#lista-tareas');
// Las tareas guardadas antes de existir las materias pasan a la primera materia
let tareas = cargarTareas().map((t) => ({ ...t, materia: t.materia || materias[0].id }));
let filtro = 'todas';
let materiaActual = null;

const delaMateria = () => tareas.filter((t) => t.materia === materiaActual.id);

// Al redibujar la lista se pierde el foco; se devuelve al mismo control
// (o al campo "Nueva tarea" si el elemento ya no existe) para quien usa teclado.
function refrescar(id = null, accion = null) {
  guardarTareas(tareas);
  renderTareas(delaMateria(), filtro);
  if (id === null) return;
  const control = lista.querySelector(`[data-id="${id}"] [data-accion="${accion}"]`);
  (control || document.querySelector('#titulo-tarea')).focus();
}

formTarea.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const titulo = new FormData(formTarea).get('titulo').trim();

  if (titulo === '') {
    mostrarMensaje('Escriba el nombre de la tarea.', 'error', '#mensaje-tarea');
    return;
  }
  mostrarMensaje('', 'ok', '#mensaje-tarea');
  tareas.push({ id: Date.now().toString(36), titulo, hecha: false, materia: materiaActual.id });
  formTarea.reset();
  refrescar();
});

// Un solo escuchador para toda la lista (delegación de eventos)
lista.addEventListener('click', (evento) => {
  const boton = evento.target.closest('[data-accion]');
  if (!boton) return;
  const id = boton.closest('.tarea').dataset.id;
  const tarea = tareas.find((t) => t.id === id);

  if (boton.dataset.accion === 'eliminar') {
    tareas = tareas.filter((t) => t.id !== id);
  } else if (boton.dataset.accion === 'editar') {
    const nuevo = prompt('Editar tarea:', tarea.titulo);
    if (nuevo === null || nuevo.trim() === '') return;
    tarea.titulo = nuevo.trim();
  }
  refrescar(id, boton.dataset.accion);
});

lista.addEventListener('change', (evento) => {
  if (evento.target.dataset.accion !== 'alternar') return;
  const id = evento.target.closest('.tarea').dataset.id;
  const tarea = tareas.find((t) => t.id === id);
  tarea.hecha = evento.target.checked;
  refrescar(id, 'alternar');
});

document.querySelectorAll('[data-filtro]').forEach((boton) => {
  boton.addEventListener('click', () => {
    filtro = boton.dataset.filtro;
    marcarFiltro(filtro);
    renderTareas(delaMateria(), filtro);
  });
});

/* ---------- Navegación por materias ---------- */
// Cada pestaña es un enlace (#id): la dirección cambia y se muestra la vista correspondiente
let primeraCarga = true;

function mostrarRuta() {
  const idPedido = location.hash.slice(1);
  materiaActual = materias.find((m) => m.id === idPedido) || null;
  mostrarVista(materiaActual ? materiaActual.id : 'inicio', materiaActual);

  if (materiaActual) {
    filtro = 'todas';
    marcarFiltro(filtro);
    formTarea.reset();
    mostrarMensaje('', 'ok', '#mensaje-tarea');
    renderTareas(delaMateria(), filtro);
  } else {
    renderResumen(materias, tareas);
  }

  // Al cambiar de pestaña, el foco pasa al título de la vista (útil con teclado y lector de pantalla)
  if (!primeraCarga) {
    document.querySelector(materiaActual ? '#t-materia' : '#t-ficha').focus();
  }
  primeraCarga = false;
}

// El enlace "Saltar al contenido" no debe cambiar la dirección (#), porque la usan las pestañas
document.querySelector('.saltar').addEventListener('click', (evento) => {
  evento.preventDefault();
  document.querySelector('#contenido').focus();
});

renderMenu(materias);
window.addEventListener('hashchange', mostrarRuta);
mostrarRuta();
