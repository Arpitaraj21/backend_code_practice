const http = require('http');
const fs = require('fs');
const url = require('url');

const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end()
    const log = `${Date.now()}  ${req.url} is the new request`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl)
    fs.appendFile("log.txt", log, (err, data) => {
        switch (myUrl.pathname) {
            case '/': res.end("HomePage");
                break;
            case '/about':
                const username = myUrl.query.myname;
                res.end(`Hi, welcome back ${username}`);
                break;
            case '/signup':
                if (req.method === 'GET') res.end('this is a signup form');
                else if (req.method === 'POST') {
                    // db query
                    res.end("success");
                }
                break;
            default: res.end('404 NOT FOUND');
        }
    })

})

myServer.listen(8000, () => {
    console.log("Server started!")
})