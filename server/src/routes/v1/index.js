const express = require('express');
const UserController = require('../../controllers/user-controllers');
const AdminController = require('../../controllers/admin-controller');
const AnnoucementController = require('../../controllers/annoucement-controller');
const slidelinkController = require('../../controllers/slidelink-controller');
const router = express.Router();
// authentication
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


///POlls
const { createPoll, addOption, voteOption, getPoll, deletePoll, deleteOption, getAllPolls } = require('../../controllers/poll-controller');

router.post('/polls', createPoll);
router.post('/polls/:pollId/options', addOption);
router.post('/polls/:pollId/options/:optionId/vote', voteOption);
router.get('/polls/:pollId', getPoll);
router.get('/polls', getAllPolls);
router.delete('/polls/:pollId', deletePoll); // New route for deleting a poll
router.delete('/polls/:pollId/options/:optionId', deleteOption); // New route for deleting an option

module.exports = router;