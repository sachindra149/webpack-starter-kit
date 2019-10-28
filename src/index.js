import './style.scss';
import Header from './app/header.js';

let header = new Header();
let firstHeading = header.getFirstHeading();

console.log(firstHeading);
console.log("This is a test index.js file");