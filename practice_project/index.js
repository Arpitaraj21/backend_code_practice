const express = require('express');
const user = require('./MOCK_DATA.json');
const fs = require('fs');
const PORT = 8000;

const app = express();

// middleware

app.use(express.urlencoded({ extended: false }));
// routes

app.get('/users', (req, res) => {
    res.json({ user })
});


// html
app.get('/api/users', (req, res) => {
    const html = `
    <ul>
    ${user.map(user => `
        <li>
        ${user.first_name}
        </li>
        `).join('')}
    </ul>`

    return res.send(html)
})

// get single user details
app.get('/api/user/:id', (req, res) => {
    const id = Number(req.params.id);
    const userId = user.find(user => user.id === id);
    return res.send(userId);
})


// post

app.post('/api/user', (req, res) => {
    const body = req.body;
    user.push({ ...body, id: user.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err, data) => {
        return res.json({ status: 'success' });
    });
});


app.put('/api/user/:id', (req, res) => {
    const id = Number(req.params.id);
    const userId = user.find(user => user.id === id);
    user[userId] = { ...user[userId], ...req.body}
    res.json(user[userId])
})

app.listen(PORT, (req, res) => {
    console.log(`Server started at ${PORT}`)
})