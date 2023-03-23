const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth');

router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);

router.use(authMiddleware);

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
