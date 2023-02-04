// Products data
const products = [  { id: 1, name: 'Product 1', price: 10 },  { id: 2, name: 'Product 2', price: 20 },  { id: 3, name: 'Product 3', price: 30 },];

// Cart data
let cart = [];

// Add products to the product list
const productList = document.getElementById('product-list');
for (let i = 0; i < products.length; i++) {
  const product = products[i];
  productList.innerHTML += `
    <div class="product">
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    </div>
  `;
}

// Add products to the cart
const addToCartButtons = document.querySelectorAll('.add-to-cart');
for (let i = 0; i < addToCartButtons.length; i++) {
  const button = addToCartButtons[i];
  button.addEventListener('click', () => {
    const productId = button.dataset.id;
    const product = products.find(p => p.id === Number(productId));
    const existingProductIndex = cart.findIndex(p => p.id === product.id);
    if (existingProductIndex === -1) {
      // Add new product to the cart
      cart.push({ ...product, quantity: 1 });
    } else {
      // Increase the quantity of the existing product
      cart[existingProductIndex].quantity++;
    }
    updateCartTable();
  });
}

// Update the cart table
function updateCartTable() {
  const cartTable = document.getElementById('cart-table');
  cartTable.innerHTML = '';
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    const subtotal = product.price * product.quantity;
    total += subtotal;
    cartTable.innerHTML += `
      <tr>
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>$${subtotal}</td>
        <td><button class="remove-from-cart" data-index="${i}">Remove</button></td>
      </tr>
    `;
  }
  cartTable.innerHTML += `
    <tr>
      <td colspan="2">Total</td>
      <td colspan="2">$${total}</td>
    </tr>
  `;
  
}