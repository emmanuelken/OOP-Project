// Product class
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// ShoppingCartItem class
class ShoppingCartItem {
    constructor(product, quantity = 1) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// ShoppingCart class
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalCost() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push(new ShoppingCartItem(product));
        }
        this.updateCartDisplay();
    }

    removeItem(productId) {
        const index = this.items.findIndex(item => item.product.id === productId);
        if (index !== -1) {
            if (this.items[index].quantity > 1) {
                this.items[index].quantity -= 1;
            } else {
                this.items.splice(index, 1);
            }
        }
        this.updateCartDisplay();
    }

    updateCartDisplay() {
        const totalItems = this.getTotalItems();
        const totalCost = this.getTotalCost();

        document.querySelector('#cart span').textContent = totalItems;
        document.getElementById('tp').textContent = totalCost;
    }
}

// Instantiate the shopping cart
const cart = new ShoppingCart();

// Create products
const products = [
    new Product(1, 'watch', 10),
    new Product(2, 'dress', 15),
    new Product(3, 'shoe', 20),
];

// Map product tags to product instances
const productTagMap = {
    'watch1': products[0],
    'dress1': products[1],
    'shoe1': products[2],
};

// Add event listeners to buttons
document.querySelectorAll('#addCart').forEach((button, index) => {
    button.addEventListener('click', () => {
        cart.addItem(products[index]);
    });
});

document.querySelectorAll('#rmCart').forEach(button => {
    button.addEventListener('click', () => {
        const productTag = button.getAttribute('data-product-tag');
        const product = productTagMap[productTag];
        cart.removeItem(product.id);
    });
});

// Like button 
let heartButtons = document.querySelectorAll('#like');

// Button event listener
heartButtons.forEach(button => {
    button.addEventListener('click', function() {
        let currentColor = this.style.color;
        this.style.color = currentColor === 'red' ? '' : 'red';
    });
});
