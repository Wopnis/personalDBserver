const express = require('express');
const passport = require ('passport');
const router = express.Router();

const controller = require('../controllers/find');
const upload = require('../middleware/upload');


router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.delete('/:id',  controller.remove);
router.post('/', upload.single('image'), controller.create);
router.patch('/:id', upload.single('image'), controller.update);

// passport.authenticate('jwt', {session: false}),   -добавить после указания пути 2-м параметром

module.exports = router;
