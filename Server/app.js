const express = require("express");
const cors = require("cors");
require("./config/db"); // Modularized DB connection

const app = express();

// Middleware
app.use(cors({ origin: "*" }));

// routes
const messageRoutes = require("./routes/Message");
app.use(messageRoutes); // Use the message routes

const server = app.listen(3000, () => {
    console.log("Server is running at port 3000");
});

// Socket setup
const socketSetup = require("./socket/socketHandler"); // Socket setup logic
socketSetup(server);
