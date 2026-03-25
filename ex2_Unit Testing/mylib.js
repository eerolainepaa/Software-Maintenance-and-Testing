// Add b to a
export function add(a, b) {
    return a + b;
}

// Subtract b from a
export function subtract(a, b) {
    return a - b;
}

// Multiply a by b
export function multiply(a, b) {
    return a * b;
}

// Divide a by b, throw error if b is zero
export function divide(a, b) {
    if (b == 0) {
        throw new Error("ZeroDivisionError: Cannot divide by zero");
    }
    return a / b;
}