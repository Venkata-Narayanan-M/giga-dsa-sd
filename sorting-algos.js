function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return result.concat(left.slice(leftIndex).concat(right.slice(rightIndex)));
}

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  let pivot = arr[Math.floor(arr.length / 2)];
  let left = arr.filter((ele) => ele < pivot);
  let right = arr.filter((ele) => ele > pivot);
  let middle = arr.filter((ele) => ele === pivot);

  return [...quickSort(left), ...middle, ...quickSort(right)];
}

function heapSort(arr) {
  function heapify(arr, n, i) {
    // console.log({ arr, n, i });
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      //   console.log("Recursive call");
      heapify(arr, n, largest);
    }
  }

  let n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    // console.log("First call");
    heapify(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    // console.log("Second call");
    heapify(arr, i, 0);
  }
  return arr;
}

console.time();
console.log(mergeSort([34, 54, 12, 5, 6, 0, 0, 7, 6, 3, 0.2, 9000, 212333]));
console.timeEnd();
console.time();
console.log(quickSort([34, 54, 12, 5, 6, 0, 0, 7, 6, 3, 0.2, 9000, 212333]));
console.timeEnd();
console.time();
console.log(heapSort([34, 54, 12, 5, 6, 0, 0, 7, 6, 3, 0.2, 9000, 212333]));
console.timeEnd();

function quickSortHoare(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSortHoare(arr, low, pi - 1);
    quickSortHoare(arr, pi + 1, high);
  }
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

let arr = [34, 54, 12, 5, 6, 0, 0, 7, 6, 3, 0.2, 9000, 212333];
console.time();
quickSortHoare(arr, 0, arr.length - 1);
console.log(arr);
console.timeEnd();
