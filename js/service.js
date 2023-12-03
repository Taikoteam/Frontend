// service.js

/**
 * URL base de la API.
 * @constant {string}
 */
const API_BASE_URL = 'http://54.85.57.172:8080';

/**
 * Obtiene todos los productos de la base de datos mediante una solicitud HTTP.
 * @async
 * @function
 * @returns {Promise<Object>} - Resuelve con los datos de los productos o rechaza con un error.
 * @throws {Error} - Propaga cualquier error que ocurra durante la solicitud.
 */
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

/**
 * Actualiza el DOM con la información de un producto en un contenedor específico.
 * @async
 * @function
 * @param {number} lugar - Número que identifica el contenedor específico.
 * @returns {void}
 */
async function updateDOM(lugar) {
    /**
     * Datos de productos obtenidos de la función {@link getAllProducts}.
     * @type {Object}
     */
    let products;

    try {
        products = await getAllProducts();
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return;
    }

    /**
     * Elemento del contenedor del producto.
     * @type {HTMLElement}
     */
    const productContainer = document.getElementById(`product${lugar + 1}`);

    if (!productContainer) {
        console.error(`Product container for lugar ${lugar} not found.`);
        return;
    }

    /**
     * Elemento del título de la tarjeta del producto.
     * @type {HTMLElement}
     */
    const cardTitleElement = productContainer.querySelector('.card_title');

    /**
     * Elemento del cuerpo dinámico de la tarjeta del producto.
     * @type {HTMLElement}
     */
    const cardBodyElement = productContainer.querySelector('.dynamic_card_body');

    /**
     * Elemento del precio de la tarjeta del producto.
     * @type {HTMLElement}
     */
    const cardPriceElement = productContainer.querySelector('.card_price');

    if (products.data.length > 0) {
        const product = products.data[lugar];
        cardTitleElement.textContent = product.Nombre;
        cardBodyElement.textContent = product.Marca;
        cardPriceElement.textContent = `$${product.Precio_Lista}`;

        /**
         * Botón para agregar al carrito de compras.
         * @type {HTMLElement}
         */
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
