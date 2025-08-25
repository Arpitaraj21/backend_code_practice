const http = require('http');
const express = require('express');

// initialized the app
const app = express();

app.get('/', (req, res) => {
    return res.send("hello from home page")
})

app.get('/about', (req, res) => {
    return res.send('hello form about page ' + ' hey ' + req.query.name + ' you are' + req.query.age)
})


app.post('./')

// const myServer = http.createServer(app);

// myServer.listen(8000, () => console.log(`Server started at port 8000`))

app.listen(8000, () => console.log("server started!")) 