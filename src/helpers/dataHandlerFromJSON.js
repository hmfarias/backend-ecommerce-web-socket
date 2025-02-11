//Import fs module
import fs from 'fs';

export async function readData(filePath) {
	try {
		//1. Read json file (it will return a string)
		const fileString = await fs.promises.readFile(filePath, 'utf-8');

		//2. Convert the content of the string file to a JavaScript object
		const fileObj = JSON.parse(fileString); // Test:

		//3. Return the data in object format
		return fileObj;
	} catch (error) {
		console.error('Error reading data', error);
	}
}

export async function writeData(filePath, data) {
	try {
		//1. Write the data to the json file
		const newDataIndented = JSON.stringify(data, null, 2); //Indented format
		await fs.promises.writeFile(filePath, newDataIndented);
	} catch (error) {
		console.error('Error writing data', error);
	}
}
