const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart-list');
const totalPrice = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const emptyCart = document.getElementById('empty-cart');
let cart = [];

const products = [
    { id: 1, name: "Product_1", price: 24.99 },
    { id: 2, name: "Product_2", price: 14.99 },
    { id: 3, name: "Product_3", price: 84.99 }
];

document.addEventListener('DOMContentLoaded', function () {
    if (products.length > 0) {
        productList.classList.remove('hidden');
    }

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            ${product.name} - $${product.price.toFixed(2)}
            <button>Add to cart</button>
        `;
        productList.appendChild(productDiv);

    
        const addToCartBtn = productDiv.querySelector('button');
        addToCartBtn.addEventListener('click', function () {
            cart.push(product);
            renderCart();
        });
    });
});


function renderCart() {
    // if(cart.length === 0) cartList.classList.add('hidden')
    cartList.classList.remove('hidden');
    cartList.innerHTML = ''; // Clear existing cart items

    let totalCartPrice = 0;

    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            ${product.name} - $${product.price.toFixed(2)}
            <button data-id="${product.id}" class="remove-btn">Remove</button>
        `;
        cartList.appendChild(cartItem);

        totalCartPrice += product.price;
    });

    if (cart.length > 0) {
        totalPrice.classList.remove('hidden');
        totalPrice.textContent = `Total: $${totalCartPrice.toFixed(2)}`;
    } else {
        totalPrice.classList.add('hidden');
    }

    cartList.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);
    renderCart(); 
    if(cart.length === 0) 
        cartList.classList.add('hidden')
}
