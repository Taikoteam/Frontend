const CartItems = document.querySelector(".cart-items");
const CartTotal = document.querySelector(".cart-total");

function displayCartItems() {
  const items = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(items)

  let cartTotal = 0; // Inicializar el total del carrito

  items.forEach((item) => {
    const cartItem = document.createElement("div");
    console.log(item)
    cartItem.className = "cart_item";
    cartItem.innerHTML = `
      <p class="cart_title">${item.title}</p>
      <p class="cart_price">$${item.price}</p>
      <p class="cart_delete">Delete</p>
    `;
    CartItems.appendChild(cartItem);

    // Sumar el precio del artículo al total del carrito
    cartTotal += parseFloat(item.price);
  });

  // Mostrar el total del carrito
  CartTotal.innerHTML = `Total: $${cartTotal.toFixed(2)}`;

  // Agregar evento de clic para eliminar el elemento del carrito
  const deleteButtons = document.querySelectorAll(".cart_delete");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => handleDeleteItem(index));
  });
}

function handleDeleteItem(index) {
  let items = JSON.parse(localStorage.getItem("cart")) || [];

  // Eliminar el artículo correspondiente al índice
  items.splice(index, 1);

  // Actualizar el local storage y volver a mostrar los elementos del carrito
  localStorage.setItem("cart", JSON.stringify(items));
  CartItems.innerHTML = ""; // Limpiar el contenido antes de volver a mostrar
  displayCartItems();
}

displayCartItems();
