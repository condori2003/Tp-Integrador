const grid_peliculas = document.querySelector('.contenedor-peliculas');

// Verifica que window.peliculas exista y sea un array
if (Array.isArray(window.peliculas)) {
  window.peliculas.forEach(function (peli) {
    // Crear la tarjeta
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.tipo = peli.tipo;
    card.dataset.nombre = peli.titulo;
    card.dataset.categoria = peli.categoria;

    if (peli.centrar) {
      card.classList.add('centrado');
    }

    // Crear contenido interno
    card.innerHTML = `
      <img src="${peli.img}" alt="${peli.titulo || 'Película'}">
      <h5>${peli.titulo || 'Sin título'}</h5>
      
    `;

    card.style.cursor = 'pointer';

    // Agregar evento de click
    card.addEventListener('click', function () {
      window.location.href = `vistaDetalle.html?id=${peli.id}`;
    });

    // Agregar la tarjeta al contenedor
    grid_peliculas.appendChild(card);
  });
} else {
  console.error("window.peliculas no está definido o no es un array.");
}
