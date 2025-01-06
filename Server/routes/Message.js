const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message");

router.get("/chat/:roomName", messageController.getOldMessage);

module.exports = router;
