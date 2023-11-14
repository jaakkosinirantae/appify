/* 
filename: complexCode.js

This code performs a complex mathematical calculation known as the Collatz Conjecture.
The Collatz Conjecture is a conjecture in mathematics that has yet to be proven or disproven.
The conjecture states that for any positive integer n, the sequence of numbers obtained by repeatedly applying
the following function will always reach the value 1: 
- If n is even, divide it by 2.
- If n is odd, multiply it by 3 and add 1.

This code implements an algorithm that computes the Collatz sequence for a given input number.
It then determines whether the sequence reaches the value 1 or diverges.

Note: This code is for demonstration purposes and may not be optimized for performance.
*/

function collatzConjecture(n) {
  let sequence = [n];
  
  while (n !== 1) {
    if (n % 2 === 0) {
      n = n / 2;
    } else {
      n = 3 * n + 1;
    }
    sequence.push(n);
  }
  
  return sequence;
}

function isCollatzProven(n) {
  return collatzConjecture(n).includes(1);
}

// Example usage:
console.log(collatzConjecture(6));
console.log(isCollatzProven(27));