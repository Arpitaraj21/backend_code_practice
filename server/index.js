// import http module

const http = require('http');
const fs = require('fs');
// using createServer method of http we create server
// const myServer = http.createServer((req, res) => {
//     console.log("req", req)
//     res.end('hello from server')
// });


// using createServer and fs module

// const myServer = http.createServer((req, res) => {
//     const log = `new req recived at ${Date.now()} `;
//     fs.appendFile("logs.txt", log, (err, data) => {
//         if(data) {
//             res.end("hello from server with logs")
//         }
//         else{
//             console.log(err)
//         }
//     })
// });


// creating http server using switch case and log the visited url

const myServer = http.createServer((req, res) => {
    // const url = http.url();
    // console.log(url);
    const log = `${Date.now()}: ${req.url} New request received\n`;
    fs.appendFile("log.txt", log, (err, data) => {
        switch(req.url){
            case  '/':  res.end("home page");
            break;
            case '/about' : res.end("about me");
            break;
            default: res.end("404 not found")
        }
    })
});

// port listen
myServer.listen(8000, (req, res) => {
    console.log('server started at port 8000');
    
})