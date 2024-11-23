const Chat = require('../models/Chat.model');

exports.initChat = [async (req, res) => {
    const { first_message, id_user_1, id_user_2 } = req.body;
    console.log("Iniciando chat");

    try{
        const new_chat = new Chat({ id_user_1, id_user_2 });
        new_chat.messages.push(first_message);

        await new_chat.save();
        res.status(201).json({
            message: "Chat inicializado",
            id_chat: new_chat._id
        })
    }catch(err){
        res.status(500).json({ message : "El chat no se pudo inicializar"});
    }
}];

exports.getChats = [async (req, res) => {
    let id_user = req.params.id_user;

    try{
        id_user = parseInt(id_user);
        const chats = await Chat.aggregate([
            { $match: { id_user_1: id_user } },
        ]);
        const other_chats = await Chat.aggregate([
            { $match: { id_user_2: id_user } },
        ]);
        const all_chats = chats.concat(other_chats);

        res.status(200).json({ 
            message: "Chats retornados",
            chats : all_chats
         });
    }catch(err){
        res.status(500).json({ message: "No se pudo obtener los chats" })
    }
}];

exports.deleteChat = [async (req, res) => {
    const id = req-params.id;

    try{
        const chat = Chat.findByIdAndDelete(id);

        res.status(200).json({ message: "Error al eliminar chat" });
    }catch(err){
        res.status(500).json({ message: "Error al borrar chat" });
    }
}];

exports.sendMessage = [async (req, res) => {
    const message = req.body;
    const id_chat = req.params.id;

    try{
        const chat = await Chat.findById(id_chat);
        if (!chat)
            return res.status(404).json({ message: "Chat no encontrado" });

        chat.messages.push(message);

        res.status(201).json({ message: "Mensaje enviado" });
    }catch(err){
        res.status(500).json({ message: "Error al mandar mensaje" });
    }
}];

exports.getMessages = [async (req, res) => {
    const id_chat = req.params.id_chat;

    try{
        const chat = await Chat.findById(id_chat);
        if(!chat)
            return res.status(404).json({ message: "No se encontró el chat" });
    }catch(err){
        res.status(500).json({ message: "Error al conseguir mensajes", err });
    }
}];

exports.editMessage = [async (req, res) => {
    const id_chat = req.params.id_chat;
    const message = req.body;

    try{
        const chat = await Chat.findById(id_chat);

        for(let i = 0; i < chat.messages.length; i++){
            if(chat.messages[i]._id === message._id){
                chat.messages[i] = message;
                i = chat.messages.length + 10;
            }
        }
    }catch(err){
        res.status(500).json({ message: "Error al editar mensaje", err });
    }
}];

exports.deleteMessage = [async (req, res) => {
    const id_chat = req.params.id_chat;
    const { id_message } = req.body;

    try{
        const chat = await Chat.findById(id_chat);

        if(!chat)
            return res.status(404).json({ message: "No se encontró el chat" });

        for(let i = 0; i < chat.messages.length; i++){
            if(chat.messages._id == id_message){
                chat.messages.splice(i, 1);
                i = chat.messages.length + 10;
            }
        }

        res.status(200).json({ message: "Mensaje eliminado" });
    }catch(err){
        res.status(500).json({ message: "Error al eliminar mensaje", err });
    }
}];