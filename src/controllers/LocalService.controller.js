const Local = require('../models/LocalService.model');

exports.registerLocal = async (req, res) => {
    const { id_user, photos, name, description, address, phone_number, opening_hours } = req.body;

    try {
        let local = new Local({ id_user, photos, name, description, address, phone_number, opening_hours });

        await local.save();
        
        res.status(201).json({ message: 'Local successfully registered' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error'});
    }
}