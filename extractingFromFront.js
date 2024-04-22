// extractShoeId.js
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current module's file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the contents of shoes.handlebars
const handlebarsFilePath = `${__dirname}/views/allshoes.handlebars`;
const handlebarsContent = readFileSync(handlebarsFilePath, 'utf8');

// Extract the shoeIdClick value (assuming it's a numeric value)
const matchResult = handlebarsContent.match(/shoeIdClick\s*=\s*(\d+)/);
const shoeIdClick = matchResult ? parseInt(matchResult[1], 10) : null;
// Export the extracted value
export default shoeIdClick;

console.log('ID yeshlangu' , shoeIdClick)