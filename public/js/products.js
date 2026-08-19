function renderProducts(state) {
    const container = document.getElementById('product-container');
    if(!container) return;
    container.innerHTML = '';
    
    state.products.forEach(product => {
        const badgeClass = product.stock === "Tersedia" ? "badge-available" : "badge-empty";
        const btnState = product.stock === "Habis" ? "disabled" : "";
        const btnText = product.stock === "Habis" ? "Stok Habis" : "Tambah ke Keranjang";
        
        const card = `
            <div class="coffee-card">
                <div class="card-header">
                    <span class="badge ${badgeClass}">${product.stock}</span>
                </div>
                <div class="card-body">
                    <h3 class="coffee-title">${product.name}</h3>
                    <p class="coffee-origin">${product.origin}</p>
                    <p class="coffee-notes"><strong>Tasting Notes:</strong><br>${product.notes}</p>
                    <p class="coffee-price">Rp ${product.price.toLocaleString('id-ID')}</p>
                </div>
                <div class="card-footer">
                    <button class="btn-add-cart" onclick="addToCart(${product.id})" ${btnState}>
                        ${btnText}
                    </button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', card);
    });
}

function addToCart(id) {
    const current = Store.getState();
    const product = current.products.find(p => p.id === id);
    if (!product) return;

    const cart = [...current.cart];
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
    }

    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
    Store.setState({ cart, cartCount });
}

function removeFromCart(id) {
    const current = Store.getState();
    const cart = current.cart.filter(item => item.id !== id);
    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
    Store.setState({ cart, cartCount });
}

function toggleCart() {
    const current = Store.getState();
    Store.setState({ isCartOpen: !current.isCartOpen });
}

function checkout() {
    const current = Store.getState();
    if (current.cart.length === 0) return;

    Store.setState({ cart: [], cartCount: 0, isCartOpen: false });
    showCheckoutNotice();
}

function showCheckoutNotice() {
    const existing = document.getElementById('checkout-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'checkout-toast';
    toast.className = 'checkout-toast';
    toast.innerText = 'Pesanan Anda sudah di-checkout';
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

function renderCart(state) {
    const counter = document.getElementById('cart-counter');
    if (counter) counter.innerText = state.cartCount;

    const panel = document.getElementById('cart-panel');
    if (!panel) return;
    panel.classList.toggle('open', state.isCartOpen);

    const body = document.getElementById('cart-body');
    if (!body) return;

    if (state.cart.length === 0) {
        body.innerHTML = '<p class="cart-empty">Keranjang masih kosong.</p>';
        return;
    }

    const total = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    body.innerHTML = state.cart.map(item => `
        <div class="cart-item">
            <div>
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-sub">${item.qty} x Rp ${item.price.toLocaleString('id-ID')}</p>
            </div>
            <button class="btn-remove" onclick="removeFromCart(${item.id})">&times;</button>
        </div>
    `).join('')
        + `<div class="cart-total">Total: Rp ${total.toLocaleString('id-ID')}</div>`
        + `<button class="btn-checkout" onclick="checkout()">Checkout</button>`;
}

Store.subscribe(renderProducts);
Store.subscribe(renderCart);
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(Store.getState());
    renderCart(Store.getState());
});