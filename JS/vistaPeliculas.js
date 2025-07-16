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
      // <button class="favorito-cards"><i class="fa-solid fa-heart"></i></button>

    card.style.cursor = 'pointer';

    // card.querySelector('.favorito-cards').addEventListener('click', function (e) {
    //   e.stopPropagation(); //Detiene el clic que iría al .card

    //   // Aquí agregás la lógica para agregar a favoritos
    //    const btnFavorito = event.target.closest(".favorito-cards");
    //     if (btnFavorito) {
    //       const card = btnFavorito.closest(".card");
    //       if (!card) return;
    //       const img = card.querySelector("img");
    //       const enlace = card.querySelector("a") ? card.querySelector("a").getAttribute("href") : `vistaDetalle.html?id=${peli.id}`;
    //       const favorito = {
    //         nombre: card.dataset.nombre,
    //         tipo: card.dataset.tipo,
    //         categoria: card.dataset.categoria,
    //         imagen: img ? img.getAttribute("src") : "",
    //         enlace: enlace,
    //       };
    //       let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    //       const index = favoritos.findIndex((f) => f.nombre === favorito.nombre);
    //       if (index === -1) {
    //         favoritos.push(favorito);
    //         btnFavorito.querySelector("i").classList.add("favorito-activo");
    //       } else {
    //         favoritos.splice(index, 1);
    //         btnFavorito.querySelector("i").classList.remove("favorito-activo");
    //         if (window.location.pathname.includes("vistas_favoritos.html")) {
    //           card.remove();
    //           const favoritosRestantes = document.querySelectorAll(".card");
    //           if (favoritosRestantes.length === 0) {
    //             const container = card.parentElement;
    //             container.innerHTML = "<p>No hay favoritos guardados.</p>";
    //           }
    //         }
    //       }
    //       localStorage.setItem("favoritos", JSON.stringify(favoritos));
    //     }
    // });

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
