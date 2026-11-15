// Datos base de la ficha (se usan si aún no hay nada guardado)
export const estudianteBase = {
  nombre: 'Estudiante',
  programa: 'Técnico en manejo de herramientas para la codificación de software',
  correo: 'correo@ejemplo.com',
  frase: 'Aprender haciendo.'
};

// Materias de la barra de navegación. Para agregar, quitar o renombrar una materia
// basta con editar esta lista. El "id" va en la dirección (#id): solo minúsculas,
// números y guiones, sin tildes ni espacios, y no puede repetirse.
export const materias = [
  { id: 'desarrollo-web', nombre: 'Desarrollo Web I' },
  { id: 'programacion', nombre: 'Programación' },
  { id: 'bases-de-datos', nombre: 'Bases de datos' },
  { id: 'ingles', nombre: 'Inglés' }
];
