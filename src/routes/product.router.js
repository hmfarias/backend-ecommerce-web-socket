/**
 * This file contains the routes for the product API.
 * It defines the routes for creating, retrieving, updating, and deleting products.
 * The routes are defined using the Express.js router.
 * The router is imported from the Express.js module.
 * The file reads the products data from a JSON file.
 */

import express from 'express';
// import { readData, writeData } from '../helpers/dataHandlerFromJSON.js';
import FileManagerJson from '../class/FileManagerJson.js';

const router = express.Router();

const fileProducts = './data/productsData.json';
// const products = await readData(file);
const fileManagerProducts = new FileManagerJson(fileProducts);

const categoryList = [
	'beauty',
	'fragrances',
	'furniture',
	'groceries',
	'home-decoration',
	'kitchen-accessories',
	'laptops',
	'mens-shirts',
	'mens-shoes',
	'mens-watches',
	'mobile-accessories',
	'motorcycle',
	'skin-care',
	'smartphones',
	'sports-accessories',
	'sunglasses',
	'tablets',
	'tops',
	'vehicle',
	'womens-bags',
	'womens-dresses',
	'womens-jewellery',
	'womens-shoes',
	'womens-watches',
];

//* GET ALL PRODUCTS **********************************************/
router.get('/', async (req, res) => {
	// read data from file
	const products = await fileManagerProducts.getData();

	const limit = parseInt(req.query.limit) || products.length; // If the limit is not passed, everything is returned.

	// Limit products according to the limit value
	const limitedProducts = products.slice(0, limit);

	return res.status(200).json({
		message: 'Products retrieved successfully',
		error: false,
		payload: limitedProducts,
	});
});

//* GET A PRODUCT BY ID *******************************************/
router.get('/:pid', async (req, res) => {
	// read data from file
	const products = await fileManagerProducts.getData();

	const productId = parseInt(req.params.pid); // Convert number
	const product = products.find((prod) => prod.id === productId); // Find the product

	if (!product) {
		return res.status(404).json({
			message: 'Product not found',
			error: true,
			payload: null,
		});
	}

	return res.status(200).json({
		message: 'Product retrieved successfully',
		error: false,
		payload: product,
	});
});

//* POST A NEW PRODUCT*********************************************/
router.post('/', async (req, res) => {
	const {
		title,
		description,
		code = 'RCH45Q1A',
		price,
		status = true,
		stock,
		category,
		thumbnail = 'https://prd.place/400?pading=80',
	} = req.body;

	// Validate that the title is not empty
	if (!title) {
		return res.status(400).json({
			message: 'title cannot be empty',
			error: true,
			payload: null,
		});
	}

	// Validate that the description is not empty
	if (!description) {
		return res.status(400).json({
			message: 'description cannot be empty',
			error: true,
			payload: null,
		});
	}

	// Validate that the barcode is not empty
	if (!code) {
		return res.status(400).json({
			message: 'code cannot be empty',
			error: true,
			payload: null,
		});
	}

	// Validate that the price is a positive number
	if (isNaN(price) || price <= 0 || !price) {
		return res.status(400).json({
			message: 'the price must be present and be a positive number',
			error: true,
			payload: null,
		});
	}

	// Validate that the status is a boolean
	const validStatus = typeof status === 'boolean' ? status : true;

	// Validate that the stock is a positive integer
	if (isNaN(stock) || stock <= 0 || !stock) {
		return res.status(400).json({
			message: 'stock must be a positive integer',
			error: true,
			payload: null,
		});
	}

	// Validate that the category is a valid category
	if (!categoryList.includes(category) || !category) {
		return res.status(400).json({
			message:
				'category must be present and be one of: beauty , fragrances , furniture , groceries , home-decoration , kitchen-accessories , laptops , mens-shirts , mens-shoes , mens-watches , mobile-accessories , motorcycle , skin-care , smartphones , sports-accessories , sunglasses , tablets , tops , vehicle , womens-bags , womens-dresses , womens-jewellery , womens-shoes , womens-watches',
			error: true,
			payload: null,
		});
	}

	// If Thumbnail is not received, it is left blank
	const validThumbnail = thumbnail ? thumbnail : '';

	// Validate that the thumbnail is a valid URL
	if (thumbnail && !thumbnail.match(/^https?:\/\//)) {
		return res.status(400).json({
			message: 'thumbnail must be a valid URL',
			error: true,
			payload: null,
		});
	}
	// read data from file
	const products = await fileManagerProducts.getData();
	//Generate correlative ID (the last ID + 1)
	const newId = products.length + 1;

	// Create the new product
	const newProduct = {
		id: newId,
		title,
		description,
		code,
		price,
		status: validStatus,
		stock,
		category,
		thumbnail: validThumbnail,
	};

	// Add the product to Array
	products.push(newProduct);

	// Save the updated array of products to the json file
	// writeData(file, products);
	await fileManagerProducts.saveData(products);
	req.io.emit('newProduct', newProduct); // acces the io instance and emit

	return res.status(201).json({
		message: 'product created successfully',
		error: false,
		payload: newProduct,
	});
});

//* PUT A PRODUCT *************************************************/
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { title, description, code, price, status, stock, category, thumbnail } =
		req.body;

	// read data from file
	const products = await fileManagerProducts.getData();
	// Search the product by ID
	const productIndex = products.findIndex((prod) => prod.id === parseInt(id));

	if (productIndex === -1) {
		return res.status(404).json({
			message: 'Product not found',
			error: true,
			payload: null,
		});
	}

	// Get the existing product
	const existingProduct = products[productIndex];

	// Validations (only update whether the field is present in the petition)
	if (title !== undefined && !title) {
		return res.status(400).json({
			message: 'title cannot be empty',
			error: true,
			payload: null,
		});
	}

	if (description !== undefined && !description) {
		return res.status(400).json({
			message: 'description cannot be empty',
			error: true,
			payload: null,
		});
	}

	if (code !== undefined && !code) {
		return res.status(400).json({
			message: 'code cannot be empty',
			error: true,
			payload: null,
		});
	}

	if (price !== undefined && (isNaN(price) || price <= 0)) {
		return res.status(400).json({
			message: 'price must be a positive number',
			error: true,
			payload: null,
		});
	}

	const validStatus =
		status === true || status === false ? status : existingProduct.status;

	if (stock !== undefined && (isNaN(stock) || stock <= 0)) {
		return res.status(400).json({
			message: 'stock must be a positive integer',
			error: true,
			payload: null,
		});
	}

	if (
		category !== undefined &&
		!['beauty', 'fashion', 'home', 'electronics', 'sports', 'toys'].includes(category)
	) {
		return res.status(400).json({
			message: 'Invalid category',
			error: true,
			payload: null,
		});
	}

	if (thumbnail && !thumbnail.match(/^https?:\/\//)) {
		return res.status(400).json({
			message: 'thumbnail must be a valid URL',
			error: true,
			payload: null,
		});
	}

	// Update the product only with the fields that are sent
	const updatedProduct = {
		...existingProduct,
		title: title !== undefined ? title : existingProduct.title,
		description: description !== undefined ? description : existingProduct.description,
		code: code !== undefined ? code : existingProduct.code,
		price: price !== undefined ? price : existingProduct.price,
		status: validStatus,
		stock: stock !== undefined ? stock : existingProduct.stock,
		category: category !== undefined ? category : existingProduct.category,
		thumbnail: thumbnail !== undefined ? thumbnail : existingProduct.thumbnail,
	};

	// Replace the product in the array
	products[productIndex] = updatedProduct;

	// Save changes in the JSON file
	// writeData(file, products);
	fileManagerProducts.saveData(products);

	return res.json({
		message: 'Product updated successfully',
		error: false,
		payload: updatedProduct,
	});
});

//* DELETE A PRODUCT *********************************************/
router.delete('/:id', async (req, res) => {
	const { id } = req.params;

	// read data from file
	const products = await fileManagerProducts.getData();
	// Find the product with the specified ID
	const productIndex = products.findIndex((product) => product.id === parseInt(id));

	// If the product is not found, return an error
	if (productIndex === -1) {
		return res.status(404).json({
			message: 'Product not found',
			error: true,
			payload: null,
		});
	}

	// Eliminate the product from the array
	products.splice(productIndex, 1);

	// Save the array updated in the JSON file
	// writeData(file, products);
	fileManagerProducts.saveData(products);

	req.io.emit('deletedProduct', id);

	// Answer with the successful message
	return res.status(200).json({
		message: 'Product deleted successfully',
		error: false,
		payload: null,
	});
});

export default router;
