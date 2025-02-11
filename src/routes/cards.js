const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() });


// Define routes for cards
router.get('/', cardController.getAllCards);
router.get('/:id', cardController.getCardById);
router.post('/', upload.single('image'), cardController.createCard);
router.put('/:id', cardController.updateCard);
router.delete('/:id', cardController.deleteCard);

module.exports = router;