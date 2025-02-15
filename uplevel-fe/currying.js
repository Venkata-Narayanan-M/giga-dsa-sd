function add(a, b, c) {
  return a + b + c;
}

function addCurry(fn) {
  const numArgs = fn.length;

  const inner = (...args) => {
    console.log({ args });
    return args.length === numArgs
      ? fn(...args)
      : (...newArgs) => {
          console.log({ newArgs });
          return inner(...args.concat(newArgs));
        };
  };

  return inner;
}

const curriedAdd = addCurry(add);
console.log(curriedAdd);

console.log("Calling with 1 vars => ", curriedAdd(1)(2)(3));
console.log("Calling with 2 vars => ", curriedAdd(1, 2)(3));
console.log("Calling with 3 vars => ", curriedAdd(1, 2, 3));
