/**
 * Remove fields from an array of objects
 *
 */

import { readData, writeData } from './dataHandlerFromJSON.js';

// In this case, we're reading the products data from a JSON file

const file = './data/productsData.json'; // The path to the JSON file
const fileNew = './data/productsDataNew.json'; // The path to the new JSON file

// readData() is a function that reads data from a file and returns it as an array
const products = await readData(file);

// The fieldsToRemove array contains the names of the fields that we want to remove from the objects in the array
const fieldsToRemove = [
	'discountPercentage',
	'rating',
	'tags',
	'brand',
	'weight',
	'dimensions',
	'warrantyInformation',
	'shippingInformation',
	'availabilityStatus',
	'reviews',
	'returnPolicy',
	'minimumOrderQuantity',
	'meta',
	'images',
];

//
const productsNew = products.map((obj) => {
	return Object.keys(obj).reduce((newObj, key) => {
		if (!fieldsToRemove.includes(key)) {
			newObj[key] = obj[key];
		}
		return newObj;
	}, {});
});

console.log('👨‍👨‍👧‍👦 productsNew:', productsNew); // Print the modified array to the console

// writeData() is a function that writes data to a file
writeData(fileNew, productsNew);
