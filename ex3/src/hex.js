// src/hex.js
/**
 * Converts hex color (with or without #, 3 or 6 digits) to "r,g,b" string
 * @param {string} hex - e.g. "FF0000", "#00FF00", "F00"
 * @returns {string} e.g. "255,0,0"
 * @throws {Error} on invalid input
 */

function hexToRgb(hex) {
  if (typeof hex !== "string") {
    throw new Error("Hex must be a string");
  }

  // Allow formats: "#FFAABB" or "FFAABB"
  const cleanHex = hex.replace("#", "");

  if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    throw new Error("Invalid hex color");
  }

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return { r, g, b };
}

module.exports = { hexToRgb };