const express = require('express');
const URL = require('../models/url');

const router = express.Router();

router.get('/', async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls,
    })
    // res.render("home")
});

router.get('/signup', (res, req) => {
    return res.render("signup");
})

module.exports = router;