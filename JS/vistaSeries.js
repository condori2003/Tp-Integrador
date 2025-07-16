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
            // <button class="favorito-cards"><i class="fa-solid fa-heart"></i></button>

        card.style.cursor = 'pointer';

        // card.querySelector('.favorito-cards').addEventListener('click', function (e) {
        //     e.stopPropagation(); //Detiene el clic que iría al .card

        //     // Aquí agregás la lógica para agregar a favoritos
        //     const btnFavorito = event.target.closest(".favorito-cards");
        //     if (btnFavorito) {
        //         const card = btnFavorito.closest(".card");
        //         if (!card) return;
        //         const img = card.querySelector("img");
        //         const enlace = card.querySelector("a") ? card.querySelector("a").getAttribute("href") : `vistaDetalleSerie.html?id=${serie.id}`;
        //         const favorito = {
        //             nombre: card.dataset.nombre,
        //             tipo: card.dataset.tipo,
        //             categoria: card.dataset.categoria,
        //             imagen: img ? img.getAttribute("src") : "",
        //             enlace: enlace,
        //         };
        //         let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        //         const index = favoritos.findIndex((f) => f.nombre === favorito.nombre);
        //         if (index === -1) {
        //             favoritos.push(favorito);
        //             btnFavorito.querySelector("i").classList.add("favorito-activo");
        //         } else {
        //             favoritos.splice(index, 1);
        //             btnFavorito.querySelector("i").classList.remove("favorito-activo");
        //             if (window.location.pathname.includes("vistas_favoritos.html")) {
        //             card.remove();
        //             const favoritosRestantes = document.querySelectorAll(".card");
        //             if (favoritosRestantes.length === 0) {
        //                 const container = card.parentElement;
        //                 container.innerHTML = "<p>No hay favoritos guardados.</p>";
        //             }
        //             }
        //         }
        //         localStorage.setItem("favoritos", JSON.stringify(favoritos));
        //     }
        // });

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
