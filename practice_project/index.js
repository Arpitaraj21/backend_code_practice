const express = require('express');
const user = require('./MOCK_DATA.json');
const fs = require('fs');
const PORT = 8000;

const app = express();

// middleware

app.use(express.urlencoded({ extended: false }));

app.use((req,res,next) => {
    console.log("hello from middleware 1")
})

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
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || body.job_title){
        return res.status(400).json({msg: "all fields are required"})
    }
    user.push({ ...body, id: user.length + 1 });
    fs.writeFile(". /MOCK_DATA.json", JSON.stringify(user), (err, data) => {
        return res.json({ status: 'success' });
    });
});


app.put('/api/user/:id', (req, res) => {
    const id = Number(req.params.id);
    const userId = user.find(user => user.id === id);
    user[userId] = { ...user[userId], ...req.body}
    res.json(user[userId])
})

app.delete('/api/user/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = user.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    const deletedUser = user.splice(index, 1); // remove from memory

    // Save updated array to file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(user, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Failed to update file' });
        }
        res.json({ status: 'success', deletedUser: deletedUser[0] });
    });
});


app.listen(PORT, (req, res) => {
    console.log(`Server started at ${PORT}`)
})