const Card = require('../models/Card');
const { uploadFile, deleteFile } = require('../services/minioService');
const { getOrCreatePresignedUrl } = require('../services/redisService')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


const getAllCards = async (req, res) => {
    try {
      const cards = await Card.findAll();
      
      const cardsPresignedURL = await Promise.all(
        cards.map(async (card) => {
            const cacheKey = `presigned_url_${card.id}`;
            const objectName = card.image_url.split('/').pop();
            const presignedURL = getOrCreatePresignedUrl(objectName, cacheKey)
            return { ...card.toJSON(), image_url: presignedURL };
        })
      )

      res.json(cardsPresignedURL)

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

const getCardById = async (req, res) => {
    try {
        const card = await Card.findByPk(req.params.id);
        if (card) {
            const cacheKey = `presigned_url_${card.id}`;
            const objectName = card.image_url.split('/').pop();
            const presignedURL = await  getOrCreatePresignedUrl(objectName, cacheKey)
            console.log("============");
            console.log(presignedURL);
            

            res.json({ ...card.toJSON(), image_url: presignedURL })

        } else {
            res.status(404).json({ error: 'Card not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





















const createCard = async (req, res) => {
    const cardData = req.body;
    const file = req.file;
  
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const cardId = cardData.id; // Extract the ID from the request body

    if (!cardId) {
        return res.status(400).json({ message: 'Card ID is required' });
    }

    try {
        // Use the card ID as the file name
        const imageUrl = await uploadFile(file.buffer, `${cardId}.png`);

        // Create the card with the provided ID and image URL
        const card = await Card.create({ ...cardData, image_url: imageUrl });
        res.status(201).json(card);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateCard = async (req, res) => {
    try {
        const [updated] = await Card.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedCard = await Card.findByPk(req.params.id);
            res.status(200).json(updatedCard);
        } else {
            res.status(404).json({ error: 'Card not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteCard = async (req, res) => {
    try {
        // Find the card by ID
        const card = await Card.findByPk(req.params.id);
  
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }
  
        // Extract the image URL and parse the file name
        const imageUrl = card.image_url;
        const fileName = imageUrl.split('/').pop(); // Extract the file name from the URL
  
        // Delete the image from MinIO
        await deleteFile(fileName);
  
        // Delete the card from the database
        const deleted = await Card.destroy({ where: { id: req.params.id } });
        if (deleted == 1) {
            res.status(200).json({ message: 'Card deleted' });
        } else {
            res.status(404).json({ error: 'Card not found' });
        }
    } catch (err) {
        console.error('Error deleting card or image:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllCards,
    getCardById,
    createCard,
    updateCard,
    deleteCard
};