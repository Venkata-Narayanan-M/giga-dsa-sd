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
console.log(newHello);
newHello(); // does nothing
newHello(); // does nothing
newHello = null;
newHello(); // logs 'hello'
newHello(); // logs 'hello's
