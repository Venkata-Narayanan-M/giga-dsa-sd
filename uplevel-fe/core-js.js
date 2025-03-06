// this keyword examples

let personOne = {
  name: `Ryan`,
  age: 18,
  introduce: function () {
    console.log(
      `first - Hi! My name is ` +
        this.name +
        ` and I am ` +
        this.age +
        ` years old. \n`
    );
  },
};

let personTwo = {
  name: "Venkat",
  age: "25",
  introduce: function () {
    console.log(
      `second - Hi! My name is ` +
        this.name +
        ` and I am ` +
        this.age +
        ` years old. \n`
    );
  },
};

let personThree = {
  name: "Narayanan",
  age: "36",
  introduce: function () {
    return (value) => {
      console.log(
        `second - Hi! My name is ` +
          this.name +
          ` and I am ` +
          this.age +
          ` years old.` +
          value +
          ` \n`
      );
    };
  },
};

// personOne.introduce();
// personTwo.introduce();
// personOne.introduce.call(personThree);
// personThree.introduce()(25);

function Car(brand, owner) {
  this.brand = brand || "Tata";
  this.owner = owner || "Prakash";
  this.toString = () => {
    console.log(
      "This car is owned by " +
        this.owner +
        " and is of " +
        this.brand +
        " brand"
    );
  };
}

const car = new Car();
// car.toString = function () {
//   console.log("I have overridden car function !!!!");
// };
// car.toString();

const anotherCar = new Car("Honda", "Venkat");
// anotherCar.toString();

function add(a, b) {
  return this.name, a + b;
}
const object1 = { name: "venkat" };
// console.log(add.apply(object1, [10, 15]));

let personOnes = {
  age: 25,

  tellAge: function () {
    const age = 90;

    console.log(this.age);
  },
};

// setTimeout(personOnes.tellAge, 1000);

var age = 10;

function logAge() {
  console.log(this.age);
}

const person = {
  age: 5,
  logAge: function () {
    logAge();
  },
};

// person.logAge(logAge, 17, 21, 35);

let names = ["Ryan", "Tony"];

let prefix = "You are amazing ";

function log() {
  let config = {
    prefix: "You are my best friend ",
  };
  this.prefix = "Amazing";

  names.forEach(function (name) {
    console.log(this.prefix + " " + name);
  });
}

// log();

function log() {
  let config = {
    prefix: "You are my best friend ",
  };

  names.forEach(
    function (name) {
      console.log(this.prefix + name);
    }.bind(config)
  );
}

log();
