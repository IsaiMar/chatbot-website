const express = require("express");
const router = express.Router();
const ProspectiveUser = require("../models/ProspectiveUser"); // adjust path as needed

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, pestType, message } = req.body;

    const newProspect = new ProspectiveUser({
      name,
      email,
      phone,
      pestType,
      message,
    });

    await newProspect.save();

    res.status(201).json({ message: "Quote submitted successfully", prospect: newProspect });
  } catch (err) {
    console.error("Error saving prospect:", err);
    res.status(500).json({ error: "Server error while saving quote." });
  }
});

module.exports = router;
