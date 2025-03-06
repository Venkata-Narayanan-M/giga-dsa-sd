const someFunction = (arg1, arg2, callback) => {
  setTimeout(() => {
    const word = arg1 + arg2;
    if (word.length > 15) {
      callback("Length exceeds limit", null);
    } else {
      console.log("Calling CB with Word");
      callback(null, word);
    }
  }, 10);
};

function promisify(originalFunction) {
  console.log("Calling promisify");
  return function promised(...args) {
    console.log("inside promised");
    return new Promise((resolve, reject) => {
      console.log("Inside promise");
      const callback = (error, data) => {
        console.log("inside callback");
        return error ? reject(error) : resolve(data);
      };
      console.log("about to run original function");
      originalFunction(...[...args, callback]);
    });
  };
}

const promised = promisify(someFunction);

promised("abcasdasdaasdasda", "def")
  .then((result) => {
    console.log("Success =>", result);
  })
  .catch((error) => {
    console.log("Error =>", error);
  });
