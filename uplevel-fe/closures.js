// document.getElementById("app").innerHTML = `
//     <h1>Hello World</h1>
//     <div>
//         JavaScript is a funny language !!!
//     </div>
// `;
// console.log("executed above code");

function after(func, num) {
  let count = 0;

  return function () {
    count++;
    num--;
    if (count >= num) {
      func(count, num);
    }
  };
}

function hello(count, num) {
  console.log("hello", count, num);
}

const newHello = after(hello, 2);
// console.log(newHello);
// newHello(); // does nothing
// newHello(); // does nothing
// // newHello = null;
// newHello(); // logs 'hello'
// newHello(); // logs 'hello's

let suffix = ". How are you?";

function greet() {
  let greeting = "Hello ";

  return function (name) {
    console.log(greeting + name + suffix);
  };
}

let greetNow = greet();

// greetNow("Ryan"); // Hello Ryan. How are you?

void (function () {
  function log(message) {
    console.log(message);
  }

  log("This is another way to write IIFEs");
})();

let myconsole = (function () {
  // Anonymous function (as it does not have a name)

  function log(message = "undefineds") {
    console.log(message);
  }

  return {
    logIt: log,
  };
})(); // Invoked Immediately after declaration

// console.log(myconsole.logIt());
// myconsole.logIt("My custom logger");

(function () {
  var firstName = "Ryans";

  var lastName = "Williamses";

  function startGame() {
    // logic
    console.log("first console", firstName, lastName);
  }

  startGame();
})();

// console.log(firstName, lastName);

let ConsoleLogger = (function (console) {
  let instance;
  function createInstance() {
    return {
      log: function (message) {
        console.log(message);
      },
      clear: function () {
        console.clear();
      },
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})(console);

let logger = ConsoleLogger.getInstance();
logger.log("WE have an instance");
logger.clear();
logger.log("this is another instance");
