const express = require('express');
const cors = require("cors");
const app = express();

//dummy data produk
const products = [
    { id: 1, name: 'Laptop lenovo', price: 100, description: 'Description for Product A' },
    { id: 2, name: 'PS 5', price: 150, description: 'Description for Product B' },
    { id: 3, name: 'Xbox', price: 200, description: 'Description for Product C' },
    { id: 4, name: 'Smart TV', price: 250, description: 'Description for Product D' },
    { id: 5, name: 'Kulkas', price: 300, description: 'Description for Product E' },
    { id: 6, name: 'Gitar Listrik', price: 350, description: 'Description for Product F' },
    { id: 7, name: 'Drone', price: 400, description: 'Description for Product G' },
    { id: 8, name: 'Bass Guitar', price: 450, description: 'Description for Product H' },
    { id: 9, name: 'Electric Violin', price: 500, description: 'Description for Product I' },
    { id: 10, name: 'Piano', price: 550, description: 'Description for Product J' },
];

app.use(cors());
//endpoint untuk mendapatkan daftar produk
app.get('/products', (req, res) => {
    res.json(products);
});

//endpoint untuk mendapatkan detail produk berdasarkan id
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

//menjalankan server pada port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//cara kedua
// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });