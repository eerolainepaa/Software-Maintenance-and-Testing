// hex.test.js

const { expect } = require("chai");
const { hexToRgb } = require("../src/hex");

/**
 * Unit tests for hex.js
 *
 * @module test/hex
 */
describe("hex.js", () => {
  /**
   * Tests for the hexToRgb() function
   */
  describe("hexToRgb()", () => {
    /** 
     * It should correctly convert hex to rgb with leading "#"
    */
    it("converts hex to RGB correctly", () => {
      const result = hexToRgb("#FFAABB");
      expect(result).to.deep.equal({ r: 255, g: 170, b: 187 });
    });
    /**
     * It should correctly convert hex to rgb without "#"
     */
    it("works without #", () => {
      const result = hexToRgb("00FF00");
      expect(result).to.deep.equal({ r: 0, g: 255, b: 0 });
    });
    /**
     * It should throw an error if input is invalid
     */
    it("throws error for invalid hex", () => {
      expect(() => hexToRgb("ZZZZZZ")).to.throw();
    });
  });
});
