const Player = require('../models/Player');
const bcrypt = require('bcryptjs');

const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getPlayerById = async (req, res) => {
    try {
        const player = await Player.findByPk(req.params.id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.json(player);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createPlayer = async (req, res) => {   
    const { id, username, password, email, discord } = req.body;
    try {
        // Hash password
        const hashPassword = await bcrypt.hash(password, 15);

        const player = new Player({
            id,
            username,
            password: hashPassword,
            email,
            discord
        })
        const newPlayer = player.save();
        res.status(201).json(newPlayer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updatePlayer = async (req, res) => {
    try {
        const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.json(player);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deletePlayer = async (req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.json({ message: 'Player deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer
};
