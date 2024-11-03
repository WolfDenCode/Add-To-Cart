const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-num');
const overlay = document.querySelector('.cart-overlay');
let cartItems = [];

function toggleOverlay() {
    cartIcon.classList.toggle('active');
    overlay.classList.toggle('active');
}

function addToCart(itemName, itemPrice, itemImg) {

    const existingItem = cartItems.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {

        cartItems.push({
            name: itemName,
            price: itemPrice,
            img: itemImg,
            quantity: 1
        });
    }

    updateCartOverlay();
    updateCartCount();
}

function updateCartCount() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartOverlay() {
    overlay.innerHTML = '';

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('item');

        cartItem.innerHTML = `
            <img src="${item.img}" class="cart-img">
            <div class="cart-details">
                <h2><span class="cart-name">${item.name}</span> <span class="cart-amount">x ${item.quantity}</span></h2>
                <p><span class="cart-price">${(item.price * item.quantity).toFixed(2)}</span> $</p>
            </div>
        `;

        overlay.appendChild(cartItem);
    });
}

document.querySelectorAll('.card').forEach(card => {
    const button = card.querySelector('button');
    const itemName = card.querySelector('.item-name').textContent;
    const itemPrice = parseFloat(card.querySelector('.price').textContent);
    const itemImg = card.querySelector('.food-img').src;

    button.addEventListener('click', () => {
        addToCart(itemName, itemPrice, itemImg);
    });
});