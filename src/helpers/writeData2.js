import fs from 'fs';

const file = './data/productsData.json';

async function procesarPackageJson(filePath) {
	try {
		//1. Leer el archivo package.json
		const fileString = await fs.promises.readFile(filePath, 'utf-8');
		// console.log('🛒 fileString:', fileString);

		//2. Convertir el contenido del archivo a un objeto JavaScript
		const fileObj = JSON.parse(fileString); // Test:
		// console.log('😽 fileObj:', fileObj);

		//3. Obtener el tamaño del archivo package.json
		const size = (await fs.promises.stat(filePath)).size;
		console.log('🇹🇴 size:', size);

		//4. Crear un nuevo producto

		fileObj.push(newProduct);

		//5. Mostrar el objeto con el nuevo producto

		console.log('Objeto newProduct: ', fileObj);
	} catch (error) {
		console.error('Error durante el procesamiento', error);
	}
}
