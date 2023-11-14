// service.js
const API_BASE_URL = 'http://localhost:8080';

async function getAllProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/database/productos`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function updateDOM(lugar) {
    products = await getAllProducts()
  const productContainer = document.getElementById(`product${lugar + 1}`); 
  if (!productContainer) {
    console.error(`Product container for lugar ${lugar} not found.`);
    return;
  }

  const cardTitleElement = productContainer.querySelector('.card_title');
  const cardBodyElement = productContainer.querySelector('.dynamic_card_body');
  const cardPriceElement = productContainer.querySelector('.card_price');

  if (products.data.length > 0) {
    const product = products.data[lugar];
    cardTitleElement.textContent = product.Nombre;
    cardBodyElement.textContent = product.Marca;
    cardPriceElement.textContent = `$${product.Precio_Lista}`;

    const addToCartButton = productContainer.querySelector('.add_to_cart');
    if (addToCartButton) {
      addToCartButton.dataset.id = product.Id;
      addToCartButton.dataset.title = product.Nombre;
      addToCartButton.dataset.image = product.Imagen;
      addToCartButton.dataset.price = product.Precio_Lista;
    }

  } else {
    console.warn('No se encontraron productos.');
  }
}

