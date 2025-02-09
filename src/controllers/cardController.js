const Card = require('../models/Card');

const getAllCards = async (req, res) => {
    try {
      const cards = await Card.findAll();
      res.json(cards);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

const getCardById = async (req, res) => {
    try {
        const card = await Card.findByPk(req.params.id);
        if (card) {
            res.json(card);
        } else {
            res.status(404).json({ error: 'Card not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createCard = async (req, res) => {
    try {
        const card = await Card.create(req.body);
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
        const deleted = await Card.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send("Card deleted");
        } else {
            res.status(404).json({ error: 'Card not found' });
        }
    } catch (err) {
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