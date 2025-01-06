const socketIO = require("socket.io");
const formatMessage = require("../utils/formatMSG");
const { savedUser, getDisconnectUser, getSameRoomUsers } = require("../utils/user");
const Message = require("../models/Message");

const socketSetup = (server) => {
    const io = socketIO(server, {
        cors: "*", // Allow connections from anywhere
    });

    // Run when client-server connected
    io.on("connection", (socket) => {
        console.log("Client connected");
        const BOT = "ROOM MANAGER BOT";

        // fired when user joined room
        socket.on("joined_room", (data) => {
            const { username, room } = data;
            const user = savedUser(socket.id, username, room);

            socket.join(user.room);

            //send welcome message to joined room
            socket.emit("message", formatMessage(BOT, "Welcome to the room"));
            // send joined message to all users except joined user
            socket.broadcast.to(user.room).emit("message", formatMessage(BOT, `${user.username} joined the room`));

            // listen message from client
            socket.on("message_send", (data) => {

                // send back message to client
                // io => all include user
                io.to(user.room).emit("message", formatMessage(user.username, data));
                Message.create({
                    username: user.username,
                    message: data,
                    room: user.room,
                });
            });

            // send room users on joined room
            io.to(user.room).emit("room_users", getSameRoomUsers(user.room));
        });

        // send disconnect message to all users
        socket.on("disconnect", () => {
            const user = getDisconnectUser(socket.id);
            if (user) {
                io.to(user.room).emit("message", formatMessage(BOT, `${user.username} left the room`));

                // update room users when disconnect
                io.to(user.room).emit("room_users", getSameRoomUsers(user.room));
            }
        });
    });
};

module.exports = socketSetup;
