const express = require("express");
const { hexToRgb } = require("./hex");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hex to RGB API");
});

app.get("/hex-to-rgb", (req, res) => {
  try {
    const { hex } = req.query;
    const rgb = hexToRgb(hex);
    res.json(rgb);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

module.exports = app;
