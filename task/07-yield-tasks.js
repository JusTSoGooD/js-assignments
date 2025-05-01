'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield        *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Returns the lines sequence of "99 Bottles of Beer" song:
 *
 *  ...
 *  See the full text at http://99-bottles-of-beer.net/lyrics.html
 *
 * @return {Iterable.<string>}
 *
 */
function* get99BottlesOfBeer() {
    for (let i = 99; i >= 1; i--) {
        yield `${i} bottle${i !== 1 ? 's' : ''} of beer on the wall, ${i} bottle${i !== 1 ? 's' : ''} of beer.`;
        if (i - 1 > 0) {
            yield `Take one down and pass it around, ${i - 1} bottle${i - 1 !== 1 ? 's' : ''} of beer on the wall.`;
        } else {
            yield 'Take one down and pass it around, no more bottles of beer on the wall.';
        }
    }
    yield 'No more bottles of beer on the wall, no more bottles of beer.';
    yield 'Go to the store and buy some more, 99 bottles of beer on the wall.';
}


/**
 * Returns the Fibonacci sequence:
 *
 * @return {Iterable.<number>}
 *
 */
function* getFibonacciSequence() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}


/**
 * Traverses a tree using the depth-first strategy
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in depth-first order
 */
function* depthTraversalTree(root) {
    const stack = [root];
    while (stack.length > 0) {
        const node = stack.pop();
        yield node;
        if (node.children) {
            for (let i = node.children.length - 1; i >= 0; i--) {
                stack.push(node.children[i]);
            }
        }
    }
}


/**
 * Traverses a tree using the breadth-first strategy
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in breadth-first order
 */
function* breadthTraversalTree(root) {
    const queue = [root];
    while (queue.length > 0) {
        const node = queue.shift();
        yield node;
        if (node.children) {
            for (let child of node.children) {
                queue.push(child);
            }
        }
    }
}


/**
 * Merges two yield-style sorted sequences into the one sorted sequence.
 *
 * @params {Iterable.<number>} source1
 * @params {Iterable.<number>} source2
 * @return {Iterable.<number>} the merged sorted sequence
 */
function* mergeSortedSequences(source1, source2) {
    const it1 = source1[Symbol.iterator]();
    const it2 = source2[Symbol.iterator]();

    let val1 = it1.next();
    let val2 = it2.next();

    while (!val1.done || !val2.done) {
        if (val1.done) {
            yield val2.value;
            val2 = it2.next();
        } else if (val2.done) {
            yield val1.value;
            val1 = it1.next();
        } else {
            if (val1.value <= val2.value) {
                yield val1.value;
                val1 = it1.next();
            } else {
                yield val2.value;
                val2 = it2.next();
            }
        }
    }
}


module.exports = {
    get99BottlesOfBeer: get99BottlesOfBeer,
    getFibonacciSequence: getFibonacciSequence,
    depthTraversalTree: depthTraversalTree,
    breadthTraversalTree: breadthTraversalTree,
    mergeSortedSequences: mergeSortedSequences
};
