const express = require("express");
const { handleGetAllUsers,
    handleGetUserById,
    UpdateUserById,
    CreateUser,
    DeleteUser
} = require('../controllers/user')

const router = express.Router();


router.get('/', handleGetAllUsers);

router.get('/:id', handleGetUserById);

router.post('/', CreateUser);

router.patch('/:id', UpdateUserById);

router.delete('/:id', DeleteUser);


module.exports = router;