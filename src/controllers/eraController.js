const Era = require('../models/Era');

// Get all eras
const getAllEras = async (req, res) => {
    try {
        const eras = await Era.findAll();
        res.json(eras);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get Era by ID
const getEraById = async (req, res) => {
    try {
        const era = await Era.findByPk(req.params.id);
        if (era) {
            res.json(era);
        } else {
            res.status(404).json({ message: 'Era not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new Era
const createEra = async (req, res) => {
    try {
        const newEra = await Era.create(req.body);
        res.status(201).json(newEra);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update an Era
const updateEra = async (req, res) => {
    try {
        const [updated] = await Era.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedEra = await Era.findByPk(req.params.id);
            res.status(200).json(updatedEra);
        } else {
            res.status(404).json({ message: 'Era not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an Era
const deleteEra = async (req, res) => {
    try {
        const deleted = await Era.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Era not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllEras,
    getEraById,
    createEra,
    updateEra,
    deleteEra
};