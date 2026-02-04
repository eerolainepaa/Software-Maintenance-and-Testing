import { add, subtract, multiply, divide } from "./mylib.js"

console.log("--- mylib demo ---\n")

console.log("5 + 3 =", add(5, 3));
console.log("5 - 3 =", subtract(5, 3));
console.log("5 * 3 =", multiply(5, 3));
console.log("5 / 3 =", divide(5, 3));

// test 0 division
try {
    console.log("5 / 0 =", divide(5, 0));
} catch(error) {
    console.log(error.message);
}