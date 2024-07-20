const express = require('express');
const UserController = require('../../controllers/user-controllers');
const AdminController = require('../../controllers/admin-controller');
const router = express.Router();
router.post('/signup', UserController.signup);
router.get('/login', UserController.login);



router.get('/isadmin', AdminController.isAdmin);
router.post('/createadmin', AdminController.createAdmin);

module.exports = router;