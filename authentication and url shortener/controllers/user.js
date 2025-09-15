const USER = require("../models/user");

async function handleCreateUser(req, res) {
    const {name, email, password} = req.body;
    await USER.create({
        name, email, password
    });
    return res.render("home");
}

module.exports = {
    handleCreateUser
};