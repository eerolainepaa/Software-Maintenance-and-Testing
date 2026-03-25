// src/hex.js
/**
 * Converts hex color (with or without #, 3 or 6 digits) to {r,g,b} object
 * @param {string} hex - e.g. "FF0000", "#00FF00", "F00"
 * @returns {{r: number, g: number, b: number}}
 * @throws {Error} on invalid input
 */
function hexToRgb(hex) {
  if (typeof hex !== "string") {
    throw new Error("Hex must be a string");
  }

  let cleanHex = hex.replace("#", "").trim();

  // Optional: support 3-digit shorthand (uncomment if you want)
  if (cleanHex.length === 3) {
    cleanHex = cleanHex[0] + cleanHex[0] + cleanHex[1] + cleanHex[1] + cleanHex[2] + cleanHex[2];
  }

  if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    throw new Error("Invalid hex color");
  }

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return { r, g, b };
}

/**
 * Converts RGB values to hex string (with #)
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {string} e.g. "#FF0000"
 * @throws {Error} on invalid input
 */
function rgbToHex(r, g, b) {
  if (
    typeof r !== "number" || typeof g !== "number" || typeof b !== "number" ||
    isNaN(r) || isNaN(g) || isNaN(b) ||
    r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255
  ) {
    throw new Error("RGB values must be numbers between 0 and 255");
  }

  const toHex = (n) => n.toString(16).padStart(2, "0").toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

module.exports = { hexToRgb, rgbToHex };