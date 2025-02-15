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

// console.time();
// console.log(mergeSort([34, 54, 12, 5, 6, 0, 0, 7, 6, 3, 0.2, 9000, 212333]));
// console.timeEnd();
// console.time();
// console.log(quickSort([34, 54, 12, 5, 6, 0, 0, 7, 6, 3, 0.2, 9000, 212333]));
// console.timeEnd();
// console.time();
// console.log(heapSort([34, 54, 12, 5, 6, 0, 0, 7, 6, 3, 0.2, 9000, 212333]));
// console.timeEnd();

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
// console.time();
// quickSortHoare(arr, 0, arr.length - 1);
// console.log(arr);
// console.timeEnd();

class MinHeap {
  constructor() {
    this.heap = [];
  }
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  getLeftChildIndex(index) {
    return 2 * index + 1;
  }
  getRightChildIndex(index) {
    return 2 * index + 2;
  }
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }
  insertValue(value) {
    this.heap.push(value);
    this.heapifyUp();
  }
  heapifyUp() {
    let index = this.heap.length - 1;
    while (
      index > 0 &&
      this.heap[index] < this.heap[this.getParentIndex(index)]
    ) {
      this.swap(index, this.getParentIndex(index));
      index = this.getParentIndex(index);
    }
  }
  removeMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }
  peek() {
    return this.heap.length === 0 ? null : this.heap[0];
  }
  size() {
    return this.heap.length;
  }
  heapifyDown() {
    let index = 0;
    while (this.getLeftChildIndex(index) < this.heap.length) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (
        this.getRightChildIndex(index) < this.heap.length &&
        this.heap[this.getRightChildIndex(index)] < this.heap[smallerChildIndex]
      ) {
        smallerChildIndex = this.getRightChildIndex(index);
      }
      if (this.heap[index] < this.heap[smallerChildIndex]) break;
      this.swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }
}

function kth_largest(k, initial_stream, append_stream) {
  let result = [];
  let minHeap = new MinHeap();
  for (let ele of initial_stream) {
    minHeap.insertValue(ele);
    if (minHeap.size() > k) {
      minHeap.removeMin();
    }
  }

  for (let ele of append_stream) {
    minHeap.insertValue(ele);
    if (minHeap.size() > k) {
      minHeap.removeMin();
    }
    result.push(minHeap.peek());
  }

  return result;
}

// console.log(kth_largest(3, [3, 2, 1], [4, 4, 4]));

function kth_largest_in_an_array(numbers, k) {
  // Write your code here.
  if (k > numbers.length) return null;
  numbers.sort((a, b) => a - b);
  return numbers[numbers.length - k];
}

// console.log(kth_largest_in_an_array([5, 1, 10, 3, 2], 2));

function kth_largest_in_an_array_heap(numbers, k) {
  const top_k = new MinHeap();
  for (let i = 0; i < k; i++) {
    top_k.insertValue(numbers[i]);
  }
  console.log(top_k);
  for (let i = k; i < numbers.length; i++) {
    if (numbers[i] > top_k.peek()) {
      top_k.removeMin();
      top_k.insertValue(numbers[i]);
      console.log(top_k);
    }
  }
  console.log(top_k);

  return top_k.peek();
}

// console.log(kth_largest_in_an_array_heap([4, 1, 2, 2, 3], 4));

class MinPriorityQueue {
  constructor() {
    this.heap = [];
  }
  enqueue(value) {
    this.heap.push(value);
    this.bubbleUp();
  }
  dequeue() {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown();
    }
    return min;
  }
  bubbleUp() {
    let index = this.heap.length - 1;
    let node = this.heap[index];
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];
      if (node >= parent) break;
      this.heap[parentIndex] = node;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }
  bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    const node = this.heap[0];

    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;

      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.heap[leftChildIdx];
        if (leftChild < node) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.heap[rightChildIdx];
        if (
          (swap === null && rightChild < node) ||
          (swap !== null && rightChild < leftChild)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = node;
      index = swap;
    }
  }
  get size() {
    return this.heap.length;
  }
  get top() {
    return this.heap[0];
  }
}

class MaxPriorityQueue extends MinPriorityQueue {
  bubbleUp() {
    let index = this.heap.length - 1;
    const node = this.heap[index];
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];
      if (node <= parent) break;
      this.heap[parentIndex] = node;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    const node = this.heap[0];
    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;
      if (leftChildIdx < length) {
        leftChild = this.heap[leftChildIdx];
        if (leftChild > node) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.heap[rightChildIdx];
        if (
          (swap === null && rightChild > node) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = node;
      index = swap;
    }
  }
}

function onlineMedian(stream) {
  const minHeap = new MinPriorityQueue();
  const maxHeap = new MaxPriorityQueue();
  const medians = [];

  function addNewElement(num) {
    maxHeap.enqueue(num);
    minHeap.enqueue(maxHeap.top);
    maxHeap.dequeue();
    if (minHeap.size > maxHeap.size) {
      maxHeap.enqueue(minHeap.top);
      minHeap.dequeue();
    }
  }

  function getCurrentStreamMedian() {
    if (maxHeap.size === minHeap.size) {
      return Math.floor((maxHeap.top + minHeap.top) / 2);
    }
    return maxHeap.top;
  }
  for (let i = 0; i < stream.length; i++) {
    addNewElement(stream[i]);
    medians.push(getCurrentStreamMedian());
  }
  return medians;
}

// console.log(onlineMedian([3, 8, 5, 2]));

var MaxStack = function () {
  this.stack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MaxStack.prototype.push = function (x) {
  return this.stack.push(x);
};

/**
 * @return {number}
 */
MaxStack.prototype.pop = function () {
  return this.stack.pop();
};

/**
 * @return {number}
 */
MaxStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MaxStack.prototype.peekMax = function () {};

/**
 * @return {number}
 */
MaxStack.prototype.popMax = function () {};

/**
 * Your MaxStack object will be instantiated and called as such:
 * var obj = new MaxStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.peekMax()
 * var param_5 = obj.popMax()
 */

const stk = new MaxStack();

stk.push(5); // [5] the top of the stack and the maximum number is 5.
stk.push(1); // [5, 1] the top of the stack is 1, but the maximum is 5.
stk.push(5); // [5, 1, 5] the top of the stack is 5, which is also the maximum, because it is the top most one.
// console.log(stk);
// console.log(stk.top()); // return 5, [5, 1, 5] the stack did not change.
// // stk.popMax();  // return 5, [5, 1] the stack is changed now, and the top is different from the max.
// console.log(stk.top()); // return 1, [5, 1] the stack did not change.
// // stk.peekMax(); // return 5, [5, 1] the stack did not change.
// console.log(stk.pop()); // return 1, [5] the top of the stack and the max element is now 5.
// console.log(stk.top()); // return 5, [5] the stack did not change.
// console.log(stk);

function lszero(A) {
  let map = new Map();
  let sum = 0;
  let lengthOfSub = 0;
  let start = -1;
  let end = -1;
  map.set(0, -1);

  for (let i = 0; i < A.length; i++) {
    sum += A[i];
    if (map.has(sum)) {
      if (i - map.get(sum) > lengthOfSub) {
        start = map.get(sum);
        end = i;
      }
      lengthOfSub = Math.max(lengthOfSub, i - map.get(sum));
    } else {
      map.set(sum, i);
    }
  }

  let ans = [];
  for (let i = start + 1; i < end + 1; i++) {
    ans.push(A[i]);
  }

  return ans;
}

console.log(lszero([0, 0, 0, 0, 0, 1, 0, -1, 2, 2, 0, 0, 0, -4]));
