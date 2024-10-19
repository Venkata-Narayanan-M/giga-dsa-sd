// // ------------- Fetch - async - await and IIFE ----------- //
// //Asynchronous JS - Promises - Async Await - Array (page 1-3)

// // const URL = "https://jsonplaceholder.org/users";

// // const fetchUsersData = async (url) => {
// //   try {
// //     const response = await fetch(url);
// //     const data = await response.json();
// //     return data;
// //   } catch (err) {
// //     return err;
// //   }
// // };

// //IIFE to call the async function - this will avoid writing async functions unnecessarily

// // (async () => {
// //   try {
// //     const users = await fetchUsersData(URL);
// //     console.log(users);
// //   } catch (err) {
// //     return err;
// //   }
// // })();

// //ES 5 approach

// // fetchUsersData(URL)
// //   .then((val) => console.log(val))
// //   .catch((err) => console.log(err))
// //   .finally(() => console.log("All done"));

// /*const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => console.log("first"), 3000);
//   resolve("first resolved");
// });

// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => console.log("second"), 2000);
//   resolve("second resolved");
// });

// console.log("starting promises");
// p2.then((val) => {
//   console.log("first called => ", val);
//   return p1;
// }).then((val) => {
//   console.log("second called => ", val);
// });*/

// // --------- Factory Pattern ----------- //

// // class Product {
// //   constructor(name, price) {
// //     this.name = name;
// //     this.price = price;
// //   }
// //   getProductInfo() {
// //     console.log("Product Info Called");
// //   }
// // }

// // class ProductFactory {
// //   static getProductObject(name, price) {
// //     if (price < 100) return new Product(name, price);
// //     else throw new Error("Price above limit");
// //   }
// // }

// // // const product = new ProductFactory();

// // console.log(ProductFactory.getProductObject("pen", 199).getProductInfo());

// // --------- Promise.all / allSettled / race --------------- //

async function getAllPromiseData() {
  try {
    const [users, posts, third] = await Promise.allSettled([
      fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
      Promise.reject("done"),
    ]);
    console.log({ users, posts, third });
    users?.status === "fulfilled"
      ? console.log("user data => ", users.value[0])
      : console.log("users WIP");
    posts?.status === "fulfilled"
      ? console.log("post list => ", posts.value[0])
      : console.log("posts WIP");
    third?.status === "fulfilled"
      ? console.log("third => ", third.value)
      : console.log("third => pending / failed");
  } catch (error) {
    console.log(error);
  }
}

getAllPromiseData();

// // --------- setTimeOut inside promise ------------ //
// // const delay = (time) =>
// //   new Promise((resolve, reject) => {
// //     setTimeout(() => {
// //       console.log("print something here");
// //       resolve("Time out over and promise resolved");
// //     }, time);
// //     reject("get out of here");
// //   });

// // delay(1000)
// //   .then((res) => console.log(res))
// //   .catch((err) => console.log(err));

// const getData = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([1, 2, 3, 4, 5]);
//     }, 0);
//   });
// };

// console.log("before get data");
// getData().then((res) => {
//   console.log(res);
//   console.log("done processing data");
// });
// console.log("after get data");
