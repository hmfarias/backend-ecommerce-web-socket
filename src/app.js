import express from 'express';

import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';

const app = express();
const PORT = 8080;

//Initalize express in the app variable
app.use(express.json());

//Middleware to analyze the body of applications
app.use(express.json()); //indicate that now we can receive JSON at the time of receiving requests
app.use(express.urlencoded({ extended: true })); //Allows information to also be sent from the URL

// Implement routes
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// Implement the test route for the application
app.get('/', (req, res) => {
	res.send('<h1 style= "color:blue">Hello from app!!</h1>');
});

// Initialize the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
