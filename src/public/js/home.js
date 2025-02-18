// CLIENT SIDE

//document.addEventListener('DOMContentLoaded': Ensures that any modification in the DOM occurs when all the elements are already available.
document.addEventListener('DOMContentLoaded', async () => {
	const productList = document.getElementById('productList'); // Referencia al contenedor donde se mostrarán los productos

	try {
		const response = await fetch('/api/products?limit=5'); // Llamada a la API para obtener los productos
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
