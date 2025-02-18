/**
 *Create a __dirname variable that gives us the route of our App.js file
 * so we can use it to import the files from the same folder
 * must be in the same place as the App.js file
 */
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
