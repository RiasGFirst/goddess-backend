const PlayerCard = require('../models/PlayerCard');


const getPlayerCards = async (req, res) => {
  const { player_id } = req.params;
  try {
    const playerCards = await PlayerCard.findAll({ where: { player_id } });
    res.status(200).json(playerCards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


const addCardToPlayer = async (req, res) => {
  const { player_id, card_id, quantity } = req.body;
  try {
    const playerCard = await PlayerCard.findOne({ where: { player_id, card_id } });
    if (playerCard) {
      playerCard.quantity += quantity;
      await playerCard.save();
    } else {
      await PlayerCard.create({ player_id, card_id, quantity });
    }
    res.status(200).json({ message: 'Card added to player' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

p
const removeCardFromPlayer = async (req, res) => {
  const { player_id, card_id, quantity } = req.body;
  try {
    const playerCard = await PlayerCard.findOne({ where: { player_id, card_id } });
    if (playerCard) {
      if (playerCard.quantity > quantity) {
        playerCard.quantity -= quantity;
        await playerCard.save();
        res.status(200).json({ message: 'Card quantity updated' });
      } else {
        await playerCard.destroy();
        res.status(200).json({ message: 'Card removed from player' });
      }
    } else {
      res.status(404).json({ error: 'Card not found for player' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getPlayerCards,
    addCardToPlayer,
    removeCardFromPlayer,
};