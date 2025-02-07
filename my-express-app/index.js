const express = require('express');
const app = express();
const port = 3000;

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Route for the home page
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Route for the about page
app.get('/about', (req, res) => {
    res.send('About Us');
});

// Route to handle POST requests to /submit
app.post('/submit', (req, res) => {
    const data = req.body;
    res.send(`Received: ${JSON.stringify(data)}`);
});

// Route to get a list of items
const items = ['Apple', 'Banana', 'Orange'];
app.get('/items', (req, res) => {
    res.json(items);
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Fixed typo: `err,stack` -> `err.stack`
    res.status(500).send('Something broke!');
});

app.post('/items', (req, res) => {
    const newItem = req.body.item;
    items.push (newItem);
    res.json(items);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});