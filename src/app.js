import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

//import routers
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';

// import the server constructor from socket.io
import { Server } from 'socket.io';

// create a new instance of the express application
const app = express();
const PORT = process.env.PORT || 8080;

//Initalize express in the app variable
app.use(express.json());

//Middleware to analyze the body of applications
app.use(express.json()); //indicate that now we can receive JSON at the time of receiving requests
app.use(express.urlencoded({ extended: true })); //Allows information to also be sent from the URL

//Configure the handlebars template engine
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//define the 'public' folder where static files are
app.use(express.static(`${__dirname}/public`));

//Middleware to make 'io' available in all routes - IT MUST BE BEFORE THE ROUTES IMPLEMENTATION
app.use((req, res, next) => {
	req.io = io; // inject IO in each request
	next();
});

// Implement routes
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

// Initialize the http server
const httpServer = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

// create the socket.io server inside the http server
const io = new Server(httpServer);

// START WORKING WITH SOCKET.IO ****************************************************
io.on('connection', (socket) => {
	console.log('New client connected');

	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});
