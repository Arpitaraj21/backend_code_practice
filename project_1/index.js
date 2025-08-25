const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');

const app = express();
const PORT = 8000;

// middleware - Plugin
app.use(express.urlencoded({ extended: false}));

// routes

// get all users from the json

// this is json
app.get('/api/users', (req, res) => {
    res.json(users);
});

// this is html
app.get('/users', (req, res) => {
    const html =
    `
    <ul>
    ${users.map(user => 
        `
        <li>
        ${user.first_name}
        </li>
        `
    ).join('')}
    </ul>
    `;
    res.send(html);
});


// can also merge the routes if have same path

// app.route('/api/users/:id')
// .get((req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id);
//     return res.json(user);
// }).put((req, res) => {
//     return res.json('put request')
// }).delete((req, res) => {
//     return res.json('delete request');
// })

// dynamic path
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
});


// post - create new user

app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
      return  res.json({status: 'success', id: users.length})
    }  )
    console.log("body", body);
});


// patch - edit the user
app.patch('/api/users/:id', (req, res) => { 
    res.json({status: 'pending'})
});


// delete - delete the user
app.delete('/api/users/:id', (req, res) => {
    res.json({status: 'pending'})
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
} )