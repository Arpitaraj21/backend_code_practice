const express = require('express');
const user = require('./MOCK_DATA.json');
const fs = require('fs');
const mongoose = require("mongoose");
const { type } = require('os');
const { log } = require('console');
const PORT = 8000;
 

// Connection
mongoose.connect('mongodb://localhost:27017/userSchemaPractice')
.then(() => console.log('successfully connected the database') )
.catch((err) => console.log("mongoDb error", err))
const app = express();


// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    jobTitle:{
        type: String,
    },
    gender: {
        type: String,
    }
}, {timestamps: true});

const User = mongoose.model('user', userSchema)

// middleware

app.use(express.urlencoded({ extended: false }));

// app.use((req,res,next) => {
//     console.log("hello from middleware 1")
// })

// routes

app.get('/users', async (req, res) => {
    // res.json({ user })

    const allDbUsers = await User.find({});
        const html = `
    <ul>
    ${allDbUsers.map(user => `
        <li>
        ${user.firstName } - ${user.email}
        </li>
        `).join('')}
    </ul>`

    return res.send(html)
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
app.get('/api/user/:id', async (req, res) => {
    // const id = Number(req.params.id);
    // const userId = user.find(user => user.id === id);
    // return res.send(userId);

    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error: "user not found"});
    return res.json(user);
})


// post

app.post('/api/user', async (req, res) => {
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg: "all fields are required"})
    }
    // user.push({ ...body, id: user.length + 1 });
    // fs.writeFile(". /MOCK_DATA.json", JSON.stringify(user), (err, data) => {
    //     return res.json({ status: 'success' });
    // });/

     result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    })

    console.log("result", result);
    
    return res.send(201).json({msg: "success"});
});

app.patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: 'singh'});
    return res.json({ status: "Success"});
})

app.delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json("success");
})

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