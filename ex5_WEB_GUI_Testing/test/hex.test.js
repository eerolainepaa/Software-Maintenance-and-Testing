// hex.test.js

const { expect } = require("chai");
const { hexToRgb, rgbToHex } = require("../src/hex"); // adjust path if needed

describe("hex.js", () => {
  describe("hexToRgb()", () => {
    it("converts hex to RGB correctly with #", () => {
      const result = hexToRgb("#FFAABB");
      expect(result).to.deep.equal({ r: 255, g: 170, b: 187 });
    });

    it("works without #", () => {
      const result = hexToRgb("00FF00");
      expect(result).to.deep.equal({ r: 0, g: 255, b: 0 });
    });

    it("handles uppercase and lowercase", () => {
      expect(hexToRgb("#aB12cD")).to.deep.equal({ r: 171, g: 18, b: 205 });
    });

    it("converts black and white", () => {
      expect(hexToRgb("#000000")).to.deep.equal({ r: 0, g: 0, b: 0 });
      expect(hexToRgb("FFFFFF")).to.deep.equal({ r: 255, g: 255, b: 255 });
    });

    it("throws error for invalid hex", () => {
      expect(() => hexToRgb("ZZZZZZ")).to.throw("Invalid hex color");
    });

    it("throws error for non-string input", () => {
      expect(() => hexToRgb(123)).to.throw("Hex must be a string");
      expect(() => hexToRgb(null)).to.throw("Hex must be a string");
    });
  });

  describe("rgbToHex()", () => {
    it("converts RGB to hex correctly", () => {
      expect(rgbToHex(255, 170, 187)).to.equal("#FFAABB");
      expect(rgbToHex(0, 255, 0)).to.equal("#00FF00");
      expect(rgbToHex(171, 18, 205)).to.equal("#AB12CD");
    });

    it("converts black and white", () => {
      expect(rgbToHex(0, 0, 0)).to.equal("#000000");
      expect(rgbToHex(255, 255, 255)).to.equal("#FFFFFF");
    });

    it("throws error for invalid RGB values", () => {
      expect(() => rgbToHex(256, 0, 0)).to.throw("RGB values must be numbers between 0 and 255");
      expect(() => rgbToHex(-1, 100, 100)).to.throw("RGB values must be numbers between 0 and 255");
      expect(() => rgbToHex(100, "abc", 50)).to.throw("RGB values must be numbers between 0 and 255");
    });

    it("throws error for missing or NaN values", () => {
      expect(() => rgbToHex(NaN, 100, 100)).to.throw("RGB values must be numbers between 0 and 255");
      expect(() => rgbToHex(100, undefined, 100)).to.throw("RGB values must be numbers between 0 and 255");
    });
  });
});