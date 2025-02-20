let currentUser = null;
let cart = [];

// Auth Functions
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        currentUser = userCredential.user;
        checkUserRole();
    } catch (error) {
        alert('Login gagal: ' + error.message);
    }
}

async function checkUserRole() {
    const userDoc = await db.collection('users').doc(currentUser.uid).get();
    if (userDoc.exists) {
        const role = userDoc.data().role;
        if (role === 'admin') {
            showAdminPanel();
        } else {
            showBuyerPanel();
        }
    }
}

// Product Functions
async function addProduct() {
    const product = {
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value)
    };

    await db.collection('products').add(product);
    loadProducts();
}

async function loadProducts() {
    const snapshot = await db.collection('products').get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderProducts(products);
}

// Transaction Functions
async function checkout() {
    const transaction = {
        userId: currentUser.uid,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('transactions').add(transaction);
    cart = [];
    updateCartDisplay();
    alert('Transaksi berhasil!');
}

// Render Functions
function renderProducts(products) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = products.map(product => `
        <div class="card">
            <h3>${product.name}</h3>
            <p>Harga: Rp${product.price}</p>
            <p>Stok: ${product.stock}</p>
            <button onclick="addToCart('${product.id}')">Tambah ke Keranjang</button>
        </div>
    `).join('');
}

// Initialize
function showBuyerPanel() {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('buyerInterface').style.display = 'block';
    loadProducts();
}

function showAdminPanel() {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('adminInterface').style.display = 'block';
    loadProducts();
}