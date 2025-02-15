let arr = [3, 5, 2, 8, 10];

const findMissingNumbersSort = (arr) => {
  arr.sort((a, b) => a - b); //[1,2,3,5,8,10];
  let result = [];

  for (let i = 1; i < arr.length; i++) {
    let diff = arr[i] - arr[i - 1];
    if (diff > 1) {
      for (let j = 1; j < diff; j++) {
        result.push(arr[i - 1] + j);
      }
    }
  }
  return result;
};

const findMissingHash = (arr) => {
  let hash1 = {};
  let result = [];

  arr.forEach((num) => (hash1[num] = true));

  const minNum = Math.min(...arr);
  const maxNum = Math.max(...arr);

  for (let i = minNum; i <= maxNum; i++) {
    if (!hash1[i]) {
      result.push(i);
    }
  }

  return result;
};

// console.log(findMissingHash(arr));

// ----- Flattening an array ---------- //

let nestedArray = [[1, 2, 3], [4, 5, [6, 7]], 8, 9];

const flattenArrayReduce = (arr) => {
  return arr.reduce(
    (acc, cur) =>
      Array.isArray(cur)
        ? acc.concat(flattenArrayReduce(cur))
        : acc.concat(cur),
    []
  );
};

const flattenArraySpread = (arr) => {
  return arr.reduce(
    (acc, cur) =>
      Array.isArray(cur) ? [...acc, ...flattenArrayReduce(cur)] : [...acc, cur],
    []
  );
};

// console.log(flattenArraySpread(nestedArray));

// ---------- sorting numbers - quick, stable (duplicate), merge -------------//

const quickSort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  let pivot = arr[arr.length - 1];
  let left = [];
  let right = [];

  for (ele of arr) {
    if (ele < pivot) {
      left.push(ele);
    }
    if (ele > pivot) {
      right.push(ele);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
};

const stableSort = (arr, compare) => {
  let length = arr.length - 1;
  let aux = new Array(length);
  for (let i = 0; i <= length; i++) {
    aux[i] = { key: i, value: arr[i] };
  }

  aux.sort((a, b) => {
    let result = compare(a.value, b.value);
    return result !== 0 ? result : a.key - b.key;
  });

  for (let i = 0; i <= length; i++) {
    arr[i] = aux[i].value;
  }

  return arr;
};

const mergeSort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left, right) => {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    let leftEle = left[leftIndex],
      rightEle = right[rightIndex];
    if (leftEle <= rightEle) {
      result.push(leftEle);
      leftIndex++;
    } else {
      result.push(rightEle);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};
// console.time("merge");
// console.log(mergeSort([3, 5, 2, 9, 10, 1, 4, 6, 7, 8, 11, 13, 14, 18]));
// console.timeEnd("merge");
// console.time("quick");
// console.log(quickSort([3, 5, 2, 9, 10, 1, 4, 6, 7, 8, 11, 13, 14, 18]));
// console.timeEnd("quick");

// ------- spiral traversal of a matrix -------

let matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

const sprialTraverseES6 = (matrix) => {
  const result = [];

  while (matrix.length) {
    result.push(
      ...matrix.shift(),
      ...matrix.map((a) => a.pop()),
      ...(matrix.pop() || []).reverse(),
      ...matrix.map((a) => a.shift()).reverse()
    );
  }

  return result;
};

const spiralTraversal = (matrix) => {
  if (matrix.length === 0) {
    return [];
  }

  let result = [];

  let rowStart = 0;
  let rowEnd = matrix.length - 1;
  let colStart = 0;
  let colEnd = matrix[0].length - 1;

  while (rowStart <= rowEnd && colStart <= colEnd) {
    for (let i = colStart; i <= colEnd; i++) {
      result[result.length] = matrix[rowStart][i];
    }
    rowStart++;
    for (let i = rowStart; i <= rowEnd; i++) {
      result[result.length] = matrix[i][colEnd];
    }
    colEnd--;
    if (rowStart <= rowEnd) {
      for (let i = colEnd; i >= colStart; i--) {
        result[result.length] = matrix[rowEnd][i];
      }
      rowEnd--;
    }

    if (colStart <= colEnd) {
      for (let i = rowEnd; i >= rowStart; i--) {
        result[result.length] = matrix[i][colStart];
      }
      colStart++;
    }
  }
  return result;
};

// console.log(spiralTraversal(matrix));

// -------- sorting string ------- /

//quick sort

const sortStringQuick = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  let pivot = arr[Math.floor(Math.random() * arr.length)];
  let left = [];
  let right = [];
  let equal = [];

  for (let ele of arr) {
    if (ele < pivot) {
      left.push(ele);
    } else if (ele === pivot) {
      equal.push(ele);
    } else {
      right.push(ele);
    }
  }

  return [...sortStringQuick(left), ...equal, ...sortStringQuick(right)];
};

const stableSortString = (arr, compareFn) => {
  const mappedString = arr.map((el, idx) => [el, idx]);
  mappedString.sort((a, b) => {
    const result = compareFn(a[0], b[0]);
    return result !== 0 ? result : a[1] - b[1];
  });

  return mappedString.map((el) => el[0]);
};

let stringArray = ["venkat", "mohan", "prakash", "narayanan"];

// console.time("native");
// console.log(stringArray.sort());
// console.timeEnd("native");
// console.time("quick");
// console.log(sortStringQuick(stringArray));
// console.timeEnd("quick");
// console.time("stable");
// console.log(stableSortString(stringArray, (a, b) => a - b));
// console.timeEnd("stable");

const sortObjectByFields = (arr, fields) => {
  return arr.sort((a, b) => {
    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      if (a[field] < b[field]) {
        return -1;
      }
      if (a[field] > b[field]) {
        return 1;
      }
    }
    return 0;
  });
};

let arrayOfObjects = [
  { name: "venkat", age: 35, marks: 90 },
  { name: "mohan", age: 46, marks: 70 },
  { name: "prakash", age: 36, marks: 85 },
  { name: "narayanan", age: 35, marks: 80 },
];

// const objectSortByAge = (a, b) => a["age"] < b["age"];

// // console.log(sortObjectByFields(arrayOfObjects, ["age", "marks", "name"]));
// console.log(
//   arrayOfObjects.sort((a, b) => {
//     return a.name.localeCompare(b.name);
//   })
// );

// -------- merge 2 sorted arrays - in place - no extra space -----------

const mergeSortedArrays = (arr1, arr2) => {
  let i = arr1.length - 1;
  let j = arr2.length - 1;
  let k = arr1.length + arr2.length - 1;

  while (j >= 0) {
    if (i >= 0 && arr1[i] > arr2[j]) {
      arr1[k] = arr1[i];
      i--;
    } else {
      arr1[k] = arr2[j];
      j--;
    }
    k--;
  }
  return arr1;
};

let sort1 = [2, 4, 6, 7, 8];
let sort2 = [1, 5, 9, 10];

// console.log(mergeSortedArrays(sort1, sort2));

function fibonacci(n) {
  if (n < 0) throw RangeError("Negative arguments not implemented");
  return fib(n)[0];
}

// (Private) Returns the tuple (F(n), F(n+1)).
function fib(n) {
  if (n == 0) return [0n, 1n];
  else {
    const [a, b] = fib(Math.floor(n / 2));
    const c = a * (b * 2n - a);
    const d = a * a + b * b;
    if (n % 2 == 0) return [c, d];
    else return [d, c + d];
  }
}

const fibonacciDP = (n) => {
  const fib = [0n, 1n];
  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib[n - 1];
};

const fibonacciNoSpace = (n) => {
  let x = 0n;
  let y = 1n;
  let z;
  let i = 2;

  while (i < n) {
    z = x + y;
    x = y;
    y = z;
    i++;
  }
  return y;
};

// console.time("fast");
// console.log(fibonacci(90));
// console.timeEnd("fast");
// console.time("dp");
// console.log(fibonacciDP(90));
// console.timeEnd("dp");
// console.time("no space");
// console.log(fibonacciNoSpace(90));
// console.timeEnd("no space");

let a = [1, 2, 3, 4, 5, 1, 2, 1, 2, 3, 2, 3, 4, 3, 2, 2];

const sortArrayFrequency = (arr) => {
  let freq = {};

  for (let ele of a) {
    if (!freq[ele]) {
      freq[ele] = 1;
    } else freq[ele]++;
  }

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .map((ele) => +ele[0]);
};

// console.log(sortArrayFrequency(a));

const deepClone = (object) => {
  if (typeof object !== "object" || !object) {
    return object;
  }

  const clonedObject = Array.isArray(object) ? [] : {};

  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      clonedObject[key] = deepClone(object[key]);
    }
  }

  return clonedObject;
};

let object = {
  a: "1",
  b: "2",
  c: {
    d: "3",
    e: "4",
  },
};

let clonedObject = deepClone(object);
// console.log(clonedObject);
// console.log(clonedObject === object);

// -------- Return duplicate values in an array ---------//

const returnDuplicateElements = (arr) => {
  const freqMap = {};
  const result = [];

  for (let ele of arr) {
    if (!freqMap[ele]) {
      freqMap[ele] = 0;
    }
    freqMap[ele] += 1;
  }

  for (let key in freqMap) {
    freqMap.hasOwnProperty(key) && freqMap[key] > 1 && result.push(key);
  }

  return result;
};

console.log(returnDuplicateElements(["v", "e", "n", "k", "a", "t", "e"]));
