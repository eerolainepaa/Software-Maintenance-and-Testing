const express = require("express");
const cors = require("cors");
const { hexToRgb, rgbToHex } = require("./hex");  // ← updated import

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());  // ← add this to parse JSON bodies

app.get("/", (req, res) => {
  res.send("Hex ↔ RGB Color API");
});

// Existing: Hex → RGB
app.get("/hex-to-rgb", (req, res) => {
  try {
    const { hex } = req.query;
    if (!hex) throw new Error("Missing hex parameter");
    const rgb = hexToRgb(hex);
    res.json(rgb);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// New: RGB → Hex
app.post("/rgb-to-hex", (req, res) => {
  try {
    const { r, g, b } = req.body;
    if (r === undefined || g === undefined || b === undefined) {
      throw new Error("Missing r, g, or b values");
    }
    const hex = rgbToHex(Number(r), Number(g), Number(b));
    res.json({ hex });
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