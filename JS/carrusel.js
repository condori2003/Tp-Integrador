const  carrusel= document.querySelector('.carrusel');

if (Array.isArray(window.peliculas)) {
    window.peliculas.forEach(function (peli) {
        // Crear la tarjeta
        if(!window.location.search.split("=")[peli.id]){
            const item = document.createElement('div');
            item.classList.add('item');
            item.dataset.tipo = peli.tipo;
            item.dataset.nombre = peli.titulo;
            item.dataset.categoria = peli.categoria;

            
            item.innerHTML =  
            `<img src="${peli.img}" alt="${peli.titulo || 'Película'}">
                <h5>${peli.titulo || 'Sin título'}</h5>
            `;

            item.style.cursor = 'pointer';

            // Agregar evento de click
            item.addEventListener('click', function () {
                window.location.href = `vistaDetalle.html?id=${peli.id}`;
            });

            carrusel.appendChild(item);
        }
    });
}else if(Array.isArray(window.series)){
    window.series.forEach(function (serie) {
        // Crear la tarjeta
        if(!window.location.search.split("=")[serie.id]){
            const item = document.createElement('div');
            item.classList.add('item');
            item.dataset.tipo = serie.tipo;
            item.dataset.nombre = serie.titulo;
            item.dataset.categoria = serie.categoria;

            
            item.innerHTML =  
            `<img src="${serie.img}" alt="${serie.titulo || 'Serie'}">
                <h5>${serie.titulo || 'Sin título'}</h5>
            `;

            item.style.cursor = 'pointer';

            // Agregar evento de click
            item.addEventListener('click', function () {
                window.location.href = `vistaDetalleSerie.html?id=${serie.id}`;
            });

            carrusel.appendChild(item);
        }
    });

} 
else {
    console.error("window.peliculas no está definido o no es un array.");
}

const btnIzquierda = document.getElementById('btn-izquierda');
const btnDerecha = document.getElementById('btn-derecha');
const scrollStep = 220; // ajustá según el ancho real de tus .item

btnIzquierda.addEventListener('click', () => {
  carrusel.scrollBy({
    left: -scrollStep,
    behavior: 'smooth'
  });
});

btnDerecha.addEventListener('click', () => {
  carrusel.scrollBy({
    left: scrollStep,
    behavior: 'smooth'
  });
});

// Auto-scroll infinito cada 3 segundos
setInterval(() => {
  const maxScrollLeft = carrusel.scrollWidth - carrusel.clientWidth;

  if (carrusel.scrollLeft >= maxScrollLeft - scrollStep) {
    carrusel.scrollTo({ left: 0, behavior: 'smooth' }); // vuelve al inicio
  } else {
    carrusel.scrollBy({ left: scrollStep, behavior: 'smooth' });
  }
}, 3000);
