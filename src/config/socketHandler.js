const { default: mongoose } = require('mongoose');
const Chat = require('../models/Chat.model');

exports.socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("Se ha conectado un usuario", socket.id);

        socket.on("join_chat", async (id_chat, id_user) => {
            try{
                const chat = await Chat.findById(id_chat);

                if(!chat){
                    socket.emit("error", "No se encontró el chat");
                    socket.disconnect();
                    return;
                }

                if (chat.id_user_1 !== id_user && chat.id_user_2 !== id_user){
                    socket.emit("error", "Acceso denegado");
                    socket.disconnect();
                    return;
                }

                socket.join(id_chat);
                console.log("Usuario ingresado al chat");
            }catch(err){
                console.log("No se pudo unir al chat", err);
                socket.emit("error", "No se pudo conectar al chat", err);
                socket.disconnect();
            }
        });

        socket.on("load_messages", async (id_chat) => {
            try{
                const chat = await Chat.findById(id_chat);

                if(!chat){
                    console.log("No se encontró el chat");
                    return res.status(404).json({ message: "No se encontró el chat" });
                }

                console.log("Obteniendo chat");
                io.to(id_chat).emit("get_messages", chat.messages);
            }catch(err){
                console.log("Error al obtener mensajes", err);
                socket.emit("error", "Error al obtener mensajes");
            }
            
        });

        socket.on("send_new_message", async (id_chat, message) => {
            try{
                message._id = new mongoose.Types.ObjectId();

                const chat = await Chat.findOneAndUpdate(
                    { _id: id_chat }, 
                    { $push: { messages: { id_user: message.id_user, body_message: message.body_message } } }
                );
                if (!chat){
                    console.log("No se encontró el chat");
                    socket.emit("error", "No se encontró el chat");
                    return;
                }

                await chat.save();
                io.to(id_chat).emit("new_message", message);
                console.log("Nuevo mensaje enviado a la sala:", id_chat);
            }catch(err){
                console.log("Error al enviar mensaje", err)
                socket.emit("error", "Error al enviar mensaje:", err);
            }
        });

        socket.on("edit_messages", async (id_chat, message) => {
            try{
                console.log("Mensaje editado:", message);
                const updateChat = await Chat.updateOne(
                    { _id: id_chat, "messages._id": message._id },
                    { $set: { "messages.$": message } }
                );
        
                if(!updateChat){
                    console.log("No se encontró el chat");
                    socket.emit("error", "No se encontró el chat");
                }

                io.to(id_chat).emit("edited_message", message);
                console.log("Mensaje editado");
            }catch(err){
                console.log("Error al editar mensaje", err);
                socket.emit("error", "Error al editar mensaje", err);
            }
        });

        socket.on("delete_message", async (id_chat, id_message) => {
            try{
                const chat = await Chat.updateOne(
                    { _id: id_chat, "messages._id": id_message },
                    { $pull: { messages: { _id: id_message } } },
                );
        
                if(!chat){
                    console.log("No se encontró el chat");
                    socket.emit("error", "No se encontró el chat");
                    return;
                }

                io.to(id_chat).emit("deleted_message", id_message);
                console.log("Mensaje eliminado");
            }catch(err){
                console.log("Error al eliminar mensaje", err);
                socket.emit("error", "Error al eliminar mensaje", err);
            }
        });

        socket.on("disconnect", () => {
            console.log("Usuario desconectado del chat:", socket.id);
        });
    });
}