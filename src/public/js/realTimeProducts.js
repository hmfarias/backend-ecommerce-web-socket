// CLIENT SIDE
//document.addEventListener('DOMContentLoaded': Ensures that any modification in the DOM occurs when all the elements are already available.
document.addEventListener('DOMContentLoaded', async () => {
	const productList = document.getElementById('productList'); // Referencia al contenedor donde se mostrarán los productos

	try {
		const response = await fetch('/api/products'); // Llamada a la API para obtener los productos
		const data = await response.json(); // Transformar la respuesta en JSON

		if (!data.error) {
			const products = data.payload; // Extraer los productos de la respuesta

			products.forEach((product) => {
				// Create a container for each product
				const li = document.createElement('li');
				li.classList.add('product-item');

				// Create a thumbnail container
				const thumbnail = document.createElement('img');
				thumbnail.src = product.thumbnail; // Assign the src miniature of the product
				thumbnail.alt = `${product.title} thumbnail`; // Alternative text for the image
				thumbnail.classList.add('product-thumbnail'); // Class for image

				// Create the text with product information
				const productInfo = document.createElement('span');
				productInfo.textContent = `${product.id} - ${product.title}`;

				// Add the miniature and product information to the product container
				li.appendChild(thumbnail);
				li.appendChild(productInfo);

				// Add the product container to the list
				productList.appendChild(li);
			});
		} else {
			Swal.fire({
				title: 'Error',
				text: data.message,
				icon: 'error',
				confirmButtonText: 'Ok',
			});
		}
	} catch (error) {
		console.error('Error fetching products:', error);
	}
});

//instance the socket.io client and save it in a variable called io. This socket will be used to connect and send messages to the server from the client side
const socket = io();

// Function to add a product to the start of the list
const addProductToList = (product) => {
	const productList = document.getElementById('productList');

	const li = document.createElement('li');
	li.classList.add('product-item');

	// Create a thumbnail container
	const thumbnail = document.createElement('img');
	thumbnail.src = product.thumbnail; // Assign the src miniature of the product
	thumbnail.alt = `${product.title} thumbnail`; // Alternative text for the image
	thumbnail.classList.add('product-thumbnail'); // Class for image

	// Create the text with product information
	const productInfo = document.createElement('span');
	productInfo.textContent = `${product.id} - ${product.title}`;

	// Add the miniature and product information to the product container
	li.appendChild(thumbnail);
	li.appendChild(productInfo);

	// // Add the new product at the beginning of the list
	// productList.insertBefore(li, productList.firstChild);
	// Add the new product at the end of the list
	productList.appendChild(li);
};

// Function to remove a product from the list
const removeProductFromList = (id) => {
	const productList = document.getElementById('productList');
	const items = productList.getElementsByTagName('li');

	// Find and eliminate the corresponding product looking if in the text of the product list is the ID of the product followed by a script: xx -
	for (let i = 0; i < items.length; i++) {
		if (items[i].textContent.includes(`${id} - `)) {
			productList.removeChild(items[i]);
			break;
		}
	}
};

// LISTEN for the 'newProduct' event to update the product list
socket.on('newProduct', (product) => {
	addProductToList(product); // Add only the new product to the list
});

// LISTEN for the 'deletedProduct' event to update the product list
socket.on('deletedProduct', (product) => {
	removeProductFromList(product); // Eliminar el producto de la lista
});
