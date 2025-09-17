const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const URL = require('./models/url');
const { connectMongodb } = require('./connection');
const {restrictToLoggedInUserOnly} = require('./middleware/auth');
const URLRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const PORT = 8000;

connectMongodb('mongodb://localhost:27017/short-url')
.then(() => console.log(`connected to mongodb`))
.catch(() => console.log(`error`))

app.set("view engine", "ejs");
app.set("views",path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use("/url", restrictToLoggedInUserOnly, URLRoute);
app.use("/user", userRoute);
app.use('/', staticRoute)
// app.get('/url/:shortId', 
//    async (req, res) =>{
//     const allUrls = await URL.find({});
//         return res.render('home', {
//             urls: allUrls,
//         })
//     }
// )

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, { $push: {
        visitHistory:{
            timestamp: Date.now(),
        },
    }});
    res.redirect(entry.redirectURL)
});

app.listen(PORT, () => {
 console.log(`server started at port ${PORT}`
)});

