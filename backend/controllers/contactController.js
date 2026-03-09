
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Champs obligatoires manquants" });
    }

    // ✅ 1. Enregistrer en base
    const contact = await Contact.create({ name, email, subject, message });

    // ✅ 2. Config email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ 3. Contenu du mail
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // tu reçois le mail
      subject: `📩 Nouveau message portfolio : ${subject || "Sans sujet"}`,
      html: `
        <h2>Nouveau message depuis ton portfolio</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${subject || "Non précisé"}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
        <hr/>
        <small>Envoyé depuis ton site portfolio</small>
      `,
    };

    // ✅ 4. Envoyer email
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Message envoyé avec succès",
      contact,
    });

  } catch (error) {
    console.error("CONTACT ERROR:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};