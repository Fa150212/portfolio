const Contact = require("../models/Contact");

exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Champs obligatoires manquants" });
    }

    const contact = await Contact.create({ name, email, subject, message });

    res.status(201).json({
      message: "Message envoyé avec succès",
      contact,
    });
  } catch (error) {
    console.error("CONTACT ERROR:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};