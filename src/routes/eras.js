const express = require('express');
const router = express.Router();
const erasController = require('../controllers/eraController');


// Define routes for cards
router.get('/', erasController.getAllEras);
router.get('/:id', erasController.getEraById);
router.post('/', erasController.createEra);
router.put('/:id', erasController.updateEra);
router.delete('/:id', erasController.deleteEra);

module.exports = router;