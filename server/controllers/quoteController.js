exports.createQuote = (req, res) => {
  const { name, email, phone, pestType, notes } = req.body;

  // You can add DB saving logic here if needed
  console.log("📥 New Quote Request:", req.body);

  return res.status(201).json({ message: "Quote received successfully!" });
};
