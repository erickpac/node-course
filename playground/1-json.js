const fs = require('fs');
const book = {
    title: 'Ego is the enemy',
    author: 'Ryan Holiday',
    date: ''
};

const dataBuffer = fs.readFileSync('1-json.json');
const data = dataBuffer.toString();
const json = JSON.parse(data);

console.log(json);

json.name = 'Josué';
json.age = 20;

const newString = JSON.stringify(json);
fs.writeFileSync('1-json.json', newString);

console.log(json);
