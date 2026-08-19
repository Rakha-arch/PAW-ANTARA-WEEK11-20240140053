const Store = {
    state: {
        products: [
            { id: 1, name: "Arabica Gayo", origin: "Aceh, Sumatra", price: 85000, stock: "Tersedia", notes: "Fruity, Floral, Medium Bodied" },
            { id: 2, name: "Robusta Dampit", origin: "Malang, Java", price: 55000, stock: "Tersedia", notes: "Nutty, Chocolate, Bold" },
            { id: 3, name: "Liberica Meranti", origin: "Riau, Sumatra", price: 95000, stock: "Habis", notes: "Jackfruit, Woody, Low Acidity" },
            { id: 4, name: "Arabica Kintamani", origin: "Bali", price: 90000, stock: "Tersedia", notes: "Citrus, Caramel, Clean Aftertaste" }
        ],
        cartCount: 0,
        cart: [],
        isCartOpen: false
    },
    listeners: [],
    getState() { return this.state; },
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
    },
    subscribe(listener) { this.listeners.push(listener); },
    notify() { this.listeners.forEach(listener => listener(this.state)); }
};