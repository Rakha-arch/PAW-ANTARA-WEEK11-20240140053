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
    Store.setState({ cartCount: current.cartCount + 1 });
    document.getElementById('cart-counter').innerText = Store.getState().cartCount;
}

Store.subscribe(renderProducts);
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(Store.getState());
});
