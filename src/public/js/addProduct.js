// List of categories
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

// Populate the category select field
const categorySelect = document.getElementById('category');
categoryList.forEach((category) => {
	const option = document.createElement('option');
	option.value = category;
	option.textContent = category.replace('-', ' '); // Format for better readability
	categorySelect.appendChild(option);
});

document.getElementById('productForm').addEventListener('submit', async (event) => {
	event.preventDefault();

	// Get form data
	const productData = {
		title: document.getElementById('title').value,
		description: document.getElementById('description').value,
		category: document.getElementById('category').value,
		price: parseFloat(document.getElementById('price').value),
		stock: parseInt(document.getElementById('stock').value, 10),
	};

	try {
		const response = await fetch('/api/products', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(productData),
		});

		const result = await response.json();

		if (!result.error) {
			Swal.fire({
				title: 'Success!',
				text: 'Product added successfully!',
				icon: 'success',
				confirmButtonText: 'OK',
			}).then(() => {
				document.getElementById('productForm').reset();
			});
		} else {
			Swal.fire({
				title: 'Error',
				text: result.message,
				icon: 'error',
				confirmButtonText: 'Try Again',
			});
		}
	} catch (error) {
		console.error('Error adding product:', error);
		Swal.fire({
			title: 'Error',
			text: 'Failed to add product. Please try again later.',
			icon: 'error',
			confirmButtonText: 'OK',
		});
	}
});
