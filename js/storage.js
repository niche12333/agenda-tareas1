// Acceso a localStorage. Todo se guarda como texto JSON.
const CLAVE_FICHA = 'ficha';
const CLAVE_TAREAS = 'tareas';
const CLAVE_TEMA = 'tema';

function leer(clave, porDefecto) {
  try {
    const texto = localStorage.getItem(clave);
    return texto === null ? porDefecto : JSON.parse(texto);
  } catch (error) {
    return porDefecto; // JSON dañado o storage bloqueado
  }
}

function escribir(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch (error) {
    console.error('No se pudo guardar:', error);
  }
}

export function guardarFicha(ficha) {
  escribir(CLAVE_FICHA, ficha);
}

export function cargarFicha(base) {
  return { ...base, ...leer(CLAVE_FICHA, {}) };
}

export function guardarTareas(tareas) {
  escribir(CLAVE_TAREAS, tareas);
}

export function cargarTareas() {
  const tareas = leer(CLAVE_TAREAS, []);
  return Array.isArray(tareas) ? tareas : [];
}

export function guardarTema(tema) {
  escribir(CLAVE_TEMA, tema);
}

export function cargarTema() {
  return leer(CLAVE_TEMA, 'claro');
}
