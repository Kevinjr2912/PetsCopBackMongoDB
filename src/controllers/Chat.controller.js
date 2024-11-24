const Chat = require('../models/Chat.model');

exports.initChat = [async (req, res) => {
    const { id_user_1, id_user_2 } = req.body;
    console.log("Iniciando chat");

    try{
        const existing_chat = await Chat.findOne({
            $or: [{id_user_1: id_user_1}, {id_user_2: id_user_2}]
        })

        if(existing_chat){
            console.log("Ya hay un chat existente");
            return res.status(409).json({ message: "Ya hay un chat existente" });
        }

        console.log("No se ha encontrado chat existente");

        const new_chat = await new Chat({ id_user_1: id_user_1, id_user_2: id_user_2 });

        await new_chat.save();
        res.status(201).json({
            message: "Chat inicializado",
            id_chat: new_chat._id
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ message : "El chat no se pudo inicializar"});
    }
}];

exports.getChats = [async (req, res) => {
    let id_user = req.params.id_user;

    try{
        const projectFields = {
            _id: 1,
            id_user_1: 1,
            id_user_2: 1
        }

        id_user = parseInt(id_user);
        const chats = await Chat.find({
            $or: [{ id_user_1: id_user }, { id_user_2: id_user }]
        }, projectFields);

        res.status(200).json(chats);
    }catch(err){
        res.status(500).json({ message: "No se pudo obtener los chats" })
    }
}];

// Métodos del chat en vivo (Propensos a ser quitados de aquí)
exports.sendMessage = [async (req, res) => {
    const message = req.body;
    const id_chat = req.params.id;

    try{
        const chat = await Chat.findById(id_chat);
        if (!chat){
            console.log("No se encontró el chat");
            return res.status(404).json({ message: "Chat no encontrado" });
        }
        chat.messages.push(message);

        res.status(201).json({ message: "Mensaje enviado" });
        console.log("Error al enviar mensaje");
    }catch(err){
        res.status(500).json({ message: "Error al mandar mensaje" });
        console.log("Mensaje enviado")
    }
}];

exports.getMessages = [async (req, res) => {
    const id_chat = req.params.id_chat;

    try{
        const chat = await Chat.findById(id_chat);

        if(!chat){
            console.log("No se encontró el chat");
            return res.status(404).json({ message: "No se encontró el chat" });
        }

        res.status(200).json(chat.messages);
        return chat;
    }catch(err){
        res.status(500).json({ message: "Error al conseguir mensajes", err });
        console.log("Error");
    }
}];

exports.editMessage = [async (req, res) => {
    const id_chat = req.params.id_chat;
    const message = req.body;

    try{
        const updateChat = await Chat.updateOne(
            { _id: id_chat, "messages._id": message._id },
            { $set: { "messages.$": message } }
        );

        if(!updateChat){
            console.log("No se encontró el chat");
            res.status(404).json({ message: "Chat no encontrado" });
        }

        console.log("Mensaje editado");
        res.status(200).json({ message: "Mensaje editado" })
    }catch(err){
        // res.status(500).json({ message: "Error al editar mensaje", err });
        console.log("Error al editar mensaje");
    }
}];

exports.deleteMessage = [async (req, res) => {
    const id_chat = req.params.id_chat;
    const { id_message } = req.body;

    try{
        const chat = await Chat.updateOne(
            { _id: id_chat, "messages._id": id_message },
            { $pull: { messages: { _id: id_message } } },
        );

        if(!chat){
            console.log("No se encontró el chat");
            return res.status(404).json({ message: "No se encontró el chat" });
        }

        console.log("Mensaje eliminado");
        res.status(200).json({ message: "Mensaje eliminado" });
    }catch(err){
        res.status(500).json({ message: "Error al eliminar mensaje", err });
        console.log("Error al eliminar mensaje");
    }
}];