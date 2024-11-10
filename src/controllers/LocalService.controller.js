const LocalService = require('../models/LocalService.model');

// Method for registering a premises or services
exports.registerLocalService = async (req, res) => {
    const { id_user, type, photos, name, description, address, phone_number, opening_hours } = req.body;

    try {
        let local_service_create = new LocalService({ id_user, type, photos, name, description, address, phone_number, opening_hours });

        await local_service_create.save();
        
        res.status(201).json({ message: 'Local successfully registered' });
    } catch (err) {
        res.status(500).json({ message: 'Server error'});
    }
}

// Method for obtaining information about a location or service
exports.getInformationLocalService = async (req, res) => {
    const { id_local_service: _id } = req.params;

    try {
        const local_service = await LocalService.findOne({ _id: _id });
        res.status(200).json(local_service);
    } catch (err) {
        res.status(500).json({ message: 'Server error'});
    }

}
