const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json()); // Permite procesar JSON en el cuerpo de las peticiones

const SECRET_KEY = 'admin12'; // Cambia esto por una clave más segura
let items = [{ id: 1, name: 'Primer item' }];

// Middleware para verificar JWT
const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    // El token viene en formato "Bearer <token>"
    const tokenSinBearer = token.split(' ')[1];

    try {
        const decoded = jwt.verify(tokenSinBearer, SECRET_KEY);
        req.usuario = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Token inválido o expirado' });
    }
};

// Ruta para LOGIN: Obtener token JWT
app.post('/login', (req, res) => {
    const usuario = {
        id: 1,
        nombre: 'Usuario Prueba',
        email: 'usuario@example.com'
    };

    const token = jwt.sign(usuario, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, mensaje: 'Login exitoso' });
});

// Ruta GET: Obtener datos (PROTEGIDA)
app.get('/api/items', verificarToken, (req, res) => {
    res.json({ items, usuario: req.usuario });
});

// Ruta POST: Enviar datos (PROTEGIDA)
app.post('/api/items', verificarToken, (req, res) => {
    const newItem = { id: items.length + 1, name: req.body.name };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Ruta GET: Obtener muchos datos (genera 1000 items)
app.get('/api/items/many', verificarToken, (req, res) => {
    const manyItems = [];
    for (let i = 1; i <= 1000; i++) {
        manyItems.push({
            id: i,
            name: `Item ${i}`,
            description: `Descripción del item ${i}`,
            price: Math.random() * 100,
            category: `Categoría ${i % 5 + 1}`
        });
    }
    res.json({
        total: manyItems.length,
        items: manyItems
    });
});

// Ruta GET: Obtener datos con paginación
app.get('/api/items/paginated', verificarToken, (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    // Generar datos de ejemplo
    const allItems = [];
    for (let i = 1; i <= 500; i++) {
        allItems.push({
            id: i,
            name: `Item ${i}`,
            description: `Descripción del item ${i}`
        });
    }
    
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedItems = allItems.slice(start, end);
    
    res.json({
        total: allItems.length,
        page: page,
        limit: limit,
        totalPages: Math.ceil(allItems.length / limit),
        items: paginatedItems
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
