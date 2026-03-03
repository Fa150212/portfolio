const Message = require("../models/Message");

exports.createMessage = async (req, res) => {
  const message = await Message.create(req.body);
  res.status(201).json(message);
};

exports.getMessages = async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
};