const express = require('express');
const router = express.Router();
const playerCardController = require('../controllers/playerCardController');

router.post('/', playerCardController.addCardToPlayer);
router.delete('/', playerCardController.removeCardFromPlayer);
router.get('/:id', playerCardController.getPlayerCards)

module.exports = router;

