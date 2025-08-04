const fs = require("fs");

// sync...  blocking
fs.writeFileSync('./test.txt', "hey there" );

//async   non-blocking
fs.writeFile("./test.txt", "hello world", (err) => {});

const result = fs.readFileSync('./contact.txt', "utf-8");
console.log(result);


fs.readFile('./contact.txt', 'utf-8', (err, result) => {
    if(err){
        console.log(err);
    }
    else{
        console.log(result)
    }
} );
  
// append 
fs.appendFileSync('./test.txt', new Date().getDate().toLocaleString());

// copy
fs.copyFileSync('./test.txt', './copy.txt');

// delete
fs.unlinkSync('./copy.txt')

// stats
console.log(fs.statSync('./test.txt'));

// create folder

fs.mkdirSync("my-docs");
