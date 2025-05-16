// Flattening a nested array

function flattenArrayMain(array) {
  let result = [];
  function flattenArray(array) {
    if (!Array.isArray(array)) {
      return array;
    }
    array.map((ele) => {
      if (Array.isArray(ele)) {
        flattenArray(ele);
      } else if (ele) {
        result.push(ele);
      }
    });
  }
  flattenArray(array);
  return result;
}
/*console.log(
  flattenArrayMain([
    1,
    2,
    3,
    4,
    { a: 10, b: 20 },
    [6, 7, [8, 9, undefined, [10, 11, 12, null], 13, null]],
  ])
);*/

// Implementing Operations function
// Implement Operation function such that it allows method chaining to achieve the functionality given below -
// let ops = Operation(1).add(2).subtract(1).multiply(10).divide(2);

function Operation(num) {
  if (this === globalThis) {
    return new Operation(num);
  }
  this.num = num;
}

Operation.prototype.add = function (someNum) {
  this.num = this.num + someNum;
  return this;
};

Operation.prototype.subtract = function (someNum) {
  this.num = this.num - someNum;
  return this;
};

Operation.prototype.multiply = function (someNum) {
  this.num = this.num * someNum;
  return this;
};

Operation.prototype.divide = function (someNum) {
  this.num = this.num / someNum;
  return this;
};

let ops = Operation(1).add(2).subtract(1).multiply(10).divide(2);
// console.log(ops);

//You are given an array of 100 Urls, and you have to fetch their content
// and save it in localStorage. There is a constraint that only 3
//requests can be active at any point in time. As soon as one,
//two or three requests gets over; you have to make more requests such
//that the active request count goes back to 3.

let urlArray = new Array(25).fill("https://jsonplaceholder.typicode.com/users");
const MAX_REQUEST_LIMIT = 3;
let currentCount = 0;

function processor() {
  let url = "";
  while (currentCount < MAX_REQUEST_LIMIT && urlArray.length) {
    currentCount++;
    url = urlArray.pop();
    fetchContent(url);
  }
}

async function fetchContent(url) {
  const response = await fetch(url);
  const data = await response.json();

  if (currentCount > 0) {
    currentCount--;
    console.log(data[Math.floor(Math.random() * 22)]?.name);
    processor();
  }
}

// processor();

// ======== Given a callback based API - asyncMultiply, convert it into a promise
// ======== based api by implementing ikPromisify function and using it.

const asyncMultiply = (a, b, callback) => {
  if (!a || !b) {
    return callback(new Error("Bad input"));
  }
  return callback(null, a * b);
};

const promisifyFn = function (fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function customCallback(err, ...results) {
        if (err) {
          return reject(err);
        }
        return resolve(results.length === 1 ? results[0] : results);
      }
      args.push(customCallback);
      fn.call(this, ...args);
    });
  };
};

//Implement a curry function such that curriedSum(1)(2)(3)(4) will return 10.
function sum(a, b, c, d) {
  return a + b + c + d;
}

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      console.log("arg1 ", args.length);
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        console.log("arg2 ", args2.length);
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

let curriedSum = curry(sum);
// console.log(curriedSum(1)(2)(3)(4)); // 10
// console.log(curriedSum(1, 2)(3)(4)); // 10
// console.log(curriedSum(1, 2)(3, 4)); // 10

// classnames is a commonly-used utility in modern front end applications to
// conditionally join CSS class names together.
// If you've written React applications, you likely have used a similar library.

function classNames(...args) {
  let result = [];

  for (let arg of args) {
    if (arg && typeof arg === "object") {
      if (Array.isArray(arg)) {
        result = result.concat(classNames(...arg));
      } else {
        for (let [key, value] of Object.entries(arg)) {
          if (value) {
            result.push(key);
          }
        }
      }
    } else {
      if (arg) result.push(arg);
    }
  }
  return result.length > 0 ? result.join(" ") : "";
}

// console.log(classNames("foo", "bar", ["foobar", "base", ["color"]])); // 'foo bar'
// console.log(
//   classNames("foo", { bar: true, "foo-bar": true }, [
//     "foobar",
//     "base",
//     ["color"],
//   ])
//); // 'foo bar'
// console.log(classNames(""));
// classNames({ 'foo-bar': true }); // 'foo-bar'
// classNames({ 'foo-bar': false }); // ''
// classNames({ foo: true }, { bar: true }); // 'foo bar'
// classNames({ foo: true, bar: true }); // 'foo bar'
// classNames({ foo: true, bar: false, qux: true }); // 'foo qux'

//Flatten an array

function flatten(value) {
  let result = [];

  for (let ele of value) {
    if (Array.isArray(ele)) {
      result.push(...flatten(ele));
    } else {
      result.push(ele);
    }
  }
  return result;
}

// console.log(flatten([1, [2, [3, [4, [5]]]]]));

// DOM Tree Nodes
// Given two identical DOM trees with root nodes X and Y,
// given a node target in X’s tree, find the equivalent
// node in Y’s tree (the node at the same depth and position in Y’s tree).
// Node C in X’s tree would correspond with node L in Y’s tree.
// Given a target C, you need to find node L.

// Hint: Ideally, use DOM APIs to traverse the trees, but if you are not familiar
// with the DOM, you may assume the nodes have the following type:

// type Node = {
//   children: Element[];
//   parentElement: Element;
// };

function getCorrespondingNode(X, Y, target) {
  let node = target;
  let path = [];

  while (node !== X) {
    const parent = node.parentElement;
    const index = Array.from(parent.children).indexOf(node);
    path.unshift(index);
    node = parent;
  }

  let corresponding = Y;

  for (let idx of path) {
    corresponding = corresponding.children[idx];
  }

  return corresponding;
}

function deepCloneObject(obj, visited = new WeakMap()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (visited.has(obj)) {
    return visited.get(obj);
  }

  let cloned;

  if (Array.isArray(obj)) {
    cloned = [];
    visited.set(obj, cloned);
    for (let i = 0; i < obj.length; i++) {
      cloned[i] = deepCloneObject(obj[i], visited);
    }
    return cloned;
  }

  if (Object.prototype.toString.call(obj) === "[object Object]") {
    cloned = {};
    visited.set(obj, cloned);
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepCloneObject(obj[key], visited);
      }
    }
    return cloned;
  }
  return obj;
}

const original = {
  name: "Alice",
  details: {
    age: 30,
    hobbies: ["reading", "gaming"],
    address: { city: "NY", zip: 10001 },
  },
  meta: new Map([["key", "value"]]),
  created: new Date(),
};

const cloned = deepCloneObject(original);

// console.log({ original, cloned });
// console.log(cloned === original);

async function fetchWithConcurrencyLimit(urls, concurrencyLimit = 3) {
  let activeCount = 0;
  let index = 0;
  console.log("Called main function");
  return new Promise((resolve) => {
    const results = [];

    function next() {
      console.log("called next");
      if (index === urls.length && activeCount === 0) {
        resolve(results);
        return;
      }

      while (activeCount < concurrencyLimit && index < urls.length) {
        const currIndex = index++;
        const url = urls[currIndex];
        console.log("Fetching => ", url);
        activeCount++;

        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            console.log("data => ", data);
            localStorage.setItem(`url_${currIndex}`, data);
            results[currIndex] = data;
          })
          .catch((err) => {
            console.error(`Error Fetching ${url} `, err);
            results[currIndex] = null;
          })
          .finally(() => {
            activeCount--;
            next();
          });
      }
    }
    next();
  });
}

const baseUrl = "https://jsonplaceholder.typicode.com/posts/";
const urls = Array.from({ length: 100 }, (_, i) => `${baseUrl}${i}`);
// fetchWithConcurrencyLimit(urls, 3).then(() => {
//   console.log("All Urls Fetched and Saved");
// });
// console.log(localStorage.getItem(`url_1`));

// IIn languages like Java and Python, a sleep function is
//available to suspend execution of the calling thread. However,
// unlike other languages, JavaScript is single-threaded and blocking
//the main thread is not a good idea. Hence lets implement an
//asynchronous version of the sleep function that works similarly
//but does not block the main thread.

function sleep(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

let i = 0;
sleep(0).then(() => {
  i++;
  // console.log("incremented i => ", i);
});
i++;

// console.log("Outside i => ", i);

// Implement function chaining in JS.
// sample output chainable.add(10).subtract(5).multiply(2).divide(2).getResult() => 5

// ======= 1. object method ============

const chainable = {
  value: 0,
  add(num) {
    this.value += num;
    return this;
  },
  subtract(num) {
    this.value -= num;
    return this;
  },
  divide(num) {
    this.value /= num;
    return this;
  },
  multiply(num) {
    this.value *= num;
    return this;
  },
  getResult() {
    return this.value;
  },
};

// console.log(chainable.add(10).subtract(5).multiply(2).divide(2).getResult());

// ======= 2. class method ============

class Chainable {
  constructor(value = 0) {
    this.value = value;
  }
  add(num) {
    this.value += num;
    return this;
  }
  subtract(num) {
    this.value -= num;
    return this;
  }
  multiply(num) {
    this.value *= num;
    return this;
  }
  divide(num) {
    this.value /= num;
    return this;
  }
  getResult() {
    return this.value;
  }
}

const chainObject = new Chainable(10);
// console.log(chainObject.add(10).subtract(5).multiply(2).divide(4).getResult());

// ======= 3. Prototype method ============

function ChainableFunction(value = 0) {
  this.value = value;
}

ChainableFunction.prototype.add = function (num) {
  this.value += num;
  return this;
};

ChainableFunction.prototype.getResult = function () {
  return this.value;
};

// const chainFunction = new ChainableFunction(10);
// console.log(chainFunction.add(10).getResult());

Array.prototype.square = function () {
  return this.map((ele) => ele * ele);
};

let array1 = [1, 2, 3, 4, 5];

// console.log(array1.square());

function setCancellableInterval(callback, delay, ...args) {
  const timerId = setInterval(callback, delay, ...args);

  return () => clearInterval(timerId);
}

const clearCancellableInterval = setCancellableInterval(
  () => console.log("called interval"),
  500
);

setTimeout(() => clearCancellableInterval(), 2000);

i = 0;
let timer;

function consoleLog() {
  console.log("Calling console", i++);

  if (i > 5) {
    clearInterval(timer);
  }
}

timer = setInterval(consoleLog, 2000);
