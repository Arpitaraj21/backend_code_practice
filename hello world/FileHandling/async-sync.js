const fs = require("fs");
const os = require("os");


// console.log(os.cpus().length);


// sync

// console.log("1")
// const result = fs.readFileSync('./contact.txt', 'utf-8');
// console.log(result);

// console.log("2")



// non-blocking

console.log("1")
fs.readFile('./contact.txt', 'utf-8', (err, result) => {
    console.log(result)
});
console.log("2")