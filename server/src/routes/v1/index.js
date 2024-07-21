const express = require('express');
const UserController = require('../../controllers/user-controllers');
const AdminController = require('../../controllers/admin-controller');
const AnnoucementController = require('../../controllers/annoucement-controller');
const slidelinkController = require('../../controllers/slidelink-controller');
const router = express.Router();
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/createannoucement', AnnoucementController.create);
router.get('/showannoucements', AnnoucementController.viewAnnoucements);
router.delete('/delteannoucement/:id', AnnoucementController.deleteAnnoucement);
router.post('/isadmin', AdminController.isAdmin);
router.post('/createadmin', AdminController.createAdmin);
router.delete('/deleteslidelink', slidelinkController.deleteAll);
router.post('/createslidelink', slidelinkController.create);
router.get('/getslidelink', slidelinkController.viewLink);

module.exports = router;