import { expect } from "chai";
import {
    add,
    subtract,
    multiply,
    divide
} from "../mylib.js"

describe("mylib Arithmetic Operations", function () {

    before(function() {
        console.log("Starting mylib tests");
    });

    after(function () {
        console.log("Finished mylib tests");
    });

    describe("add()", function () {
        it("should add two numbers", function () {
            expect(add(5, 3)).to.equal(8);
            expect(add(12.5, -2)).to.equal(10.5)
        });
    });

    describe("subtract()", function () {
        it("should subtract two numbers", function () {
            expect(subtract(5, 3)).to.equal(2);
            expect(subtract(12.5, -2)).to.equal(14.5);
        });
    });

    describe("multiply()", function () {
        it("should multiply two numbers", function () {
            expect(multiply(5, 3)).to.equal(15);
            expect(multiply(12.5, -2)).to.equal(-25);
            expect(multiply(123, 0)).to.equal(0);
        });
    });

    describe("divide()", function () {
        it("should divide two numbers", function () {
            expect(divide(10, 2)).to.equal(5);
            expect(divide(12.5, -2)).to.equal(-6.25);
        });

        it("should throw an error when dividing by zero", function () {
            expect(() => divide(10, 0)).to.throw(Error);
        });
    });

});
