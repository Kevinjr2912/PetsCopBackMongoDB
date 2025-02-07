const LocalService = require('../models/LocalService.model');
const authenticateJWT = require('../middlewares/authenticateJWT');

// Method for registering a premises or services
exports.registerLocalService = async (req, res) => {
    const { id_user, type, photo_profile, photos, name, description, address, phone_number, opening_hours } = req.body;

    try {
        let local_service_create;
        if(type === 'Local'){
            local_service_create = new LocalService({ id_user, photo_profile, photos, name, description, address, phone_number, opening_hours });
        } else {
            local_service_create = new LocalService({ id_user, photo_profile, photos, name, description, phone_number, opening_hours });
        }
        
        await local_service_create.save();
        
        res.status(201).json({ message: 'Local successfully registered' });
    } catch (err) {
        res.status(500).json({ message: 'Server error'});
    }
};

// Method for obtaining information about a location or service
exports.getInformationLocalService = [authenticateJWT,async (req, res) => {
    const { id_local_service: _id } = req.params;

    try {
        const local_service = await LocalService.findOne({ _id: _id });
        res.status(200).json(local_service);
    } catch (err) {
        res.status(500).json({ message: 'Server error'});
    }
}]

exports.getNameAndPhotoLocalService = [authenticateJWT,async (req, res) => {
    const { id_user } = req.params;

    try {
        const local_service = await LocalService.findOne(
            { id_user: id_user }
        );

        const nameAndPhoto = {
            'name': local_service.name,
            'photo_profile': local_service.photo_profile
        }

        res.status(200).json(nameAndPhoto);

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error'});
    }
}]


// Method for obtaining information on each of the premises and services
exports.getInformationAllLocalsAndServices = [authenticateJWT,async (req, res) => {
    try {
        const locals_services = await LocalService.aggregate([
            { $project : 
                { 
                    _id : 1,
                    id_user: 1, 
                    photo_profile: 1, 
                    photos : 1, 
                    name : 1, 
                    description: 1
                } 
            }
        ]);

        res.status(200).json(locals_services);

    } catch (err) {
        res.status(500).json({ message: 'Server error'});
    }
}]

exports.getLocalServicesByIdUser = [authenticateJWT,async (req, res) => {
    const id_user = req.params.id_user;

    try{
        const local_services = await LocalService.findOne({
            id_user: id_user
        })

        if(!local_services)
            return res.status(404).json({ message: "Local o servicio no encontrado" });

        res.status(200).json(local_services);
    }catch(err){
        res.status(500).json({ message: 'Error al obtener info', err })
    }
}];

exports.updateInformationLocalOrService = [authenticateJWT,async (req, res) => {
    const { id_local_service } = req.params;
    const data_local_service = req.body;
    try {
        await LocalService.findOneAndUpdate(
            { _id: id_local_service },
            { $set: data_local_service },
            { new: true }
        );

        res.status(200).json({ message: 'Updated post', data_local_service})
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}]

// Method to delete a local o service
exports.deleteLocalOrService = [authenticateJWT,async (req, res) => {
    const { id_local_service } = req.params;

    try {
        await LocalService.deleteOne({ id_user: id_local_service });

        res.status(200).json({message: 'Deleted local or service'});
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}]
