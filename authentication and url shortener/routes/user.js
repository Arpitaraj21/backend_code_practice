const express = require('express');
const { handleCreateUser } = require('../controllers/user');

const router = express.Router();


router.post('/user', handleCreateUser)

module.exports = router;