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
// console.log(
//   flattenArrayMain([
//     1,
//     2,
//     3,
//     4,
//     { a: 10, b: 20 },
//     [6, 7, [8, 9, undefined, [10, 11, 12, null], 13, null]],
//   ])
// );
