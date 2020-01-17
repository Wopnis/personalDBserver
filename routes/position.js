const express = require('express');
const router = express.Router();
const controller = require('../controllers/position');


router.get('/:cityId', controller.getByCityName);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);



module.exports = router;
