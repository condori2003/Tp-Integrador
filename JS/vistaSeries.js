const grid_series = document.querySelector('.contenedor-series');

if(Array.isArray(window.series)){
    window.series.forEach(function (serie) {
        // Crear la tarjeta
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.tipo = serie.tipo;
        card.dataset.nombre = serie.titulo;
        card.dataset.categoria = serie.categoria;

        if (serie.centrar) {
            card.classList.add('centrado');
        }

        // Crear contenido interno
        card.innerHTML = `
            <img src="${serie.img}" alt="${serie.titulo || 'Película'}">
            <h5>${serie.titulo || 'Sin título'}</h5>
            
        `;

        card.style.cursor = 'pointer';

        // Agregar evento de click
        card.addEventListener('click', function () {
            window.location.href = `vistaDetalleSerie.html?id=${serie.id}`;
        });

        // Agregar la tarjeta al contenedor
        grid_series.appendChild(card);
    });
} else {
    console.error("window.series no está definido o no es un array.");
}
