const express = require('express');
const { connectToMongoDb } = require('./connect')

const urlRoute = require('./routes/url');
const URL = require('./models/url')
const app = express();
const PORT = 8000;

connectToMongoDb('mongodb://localhost:27017/url-shortener')
    .then(() => console.log('mongoDB connected'))
    .catch(() => console.log('error'));

app.use(express.json());

app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            },
        }
    });

    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`)
})