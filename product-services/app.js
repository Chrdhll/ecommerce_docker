const express = require('express');
const app = express();

//dummy data produk
const products = [
    { id: 1, name: 'mio karbu', price: 100, description: 'Description for Product A' },
    { id: 2, name: 'PS 5', price: 150, description: 'Description for Product B' },
    { id: 3, name: 'Xbox', price: 200, description: 'Description for Product C' },
];

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