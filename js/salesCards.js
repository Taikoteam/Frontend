// Datos de ejemplo para las tarjetas
const cardData = [
    {
      image: "./image/items/item-1.png",
      tag: "-40%",
      title: "HAVIT HV-G92 Gamepad",
      price: 120,
      ratings: 4,
      ratingNumbers: 88,
    },
    // Agrega más datos de tarjetas según sea necesario
  ];
  
  // Función para crear una tarjeta HTML basada en los datos proporcionados
  function createCard(data) {
    const cardSlide = document.createElement("div");
    cardSlide.className = "swiper-slide";
  
    const card = document.createElement("div");
    card.className = "card";
  
    const cardTop = document.createElement("div");
    cardTop.className = "card_top";
    cardTop.innerHTML = `
      <img src="${data.image}" alt="" class="card_img" />
      <div class="card_tag">${data.tag}</div>
      <div class="card_top_icons">
        <!-- Agrega tus iconos aquí -->
      </div>
    `;
    card.appendChild(cardTop);
  
    const cardBody = document.createElement("div");
    cardBody.className = "card_body";
    cardBody.innerHTML = `
      <h3 class="card_title">${data.title}</h3>
      <p class="card_price">$${data.price}</p>
      <div class="card_ratings">
        <div class="card_stars">
          ${createStarIcons(data.ratings)}
        </div>
        <p class="card_rating_numbers">(${data.ratingNumbers})</p>
      </div>
      <button class="add_to_cart" data-id="1" data-title="${data.title}" data-image="${data.image}" data-price="${data.price}">
        Add to Cart
      </button>
    `;
    card.appendChild(cardBody);
  
    cardSlide.appendChild(card);
  
    return cardSlide;
  }
  
  // Función para crear iconos de estrellas basados en la calificación
  function createStarIcons(ratings) {
    const starIcons = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">' +
      '<path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />' +
      '</svg>'.repeat(ratings);
  
    return starIcons;
  }
  
  // Función para agregar las tarjetas al contenedor del carrusel
  function displayCards() {
    const swiperWrapper = document.getElementById("swiperWrapper");
  
    cardData.forEach((data) => {
      const cardSlide = createCard(data);
      swiperWrapper.appendChild(cardSlide);
    });
  
    // Inicializar Swiper después de agregar todas las tarjetas
    const swiper = new Swiper('.mySwiper', {
      // Configuración de Swiper según sea necesario
    });
  }
  
  // Llama a la función para mostrar las tarjetas
  displayCards();
  