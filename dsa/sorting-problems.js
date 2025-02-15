function merge_one_into_another(first, second) {
  // Write your code here.
  let small =
    Math.min(first?.length, second?.length) === first?.length ? first : second;
  let large =
    Math.max(first?.length, second?.length) === first?.length ? first : second;
  if (!first || !second || large?.length !== 2 * small?.length) {
    return first || second;
  }
  let n = small?.length;
  let left = n - 1;
  let right = n - 1;

  for (let i = large?.length - 1; i >= 0; i--) {
    if (small[left] >= large[right]) {
      large[i] = small[left];
      left--;
    } else if (small[left] < large[right]) {
      large[i] = large[right];
      right--;
    } else {
      large[i] = small[left] || large[right];
      left--;
      right--;
    }
    console.log({ left, right });
  }
  return large;
}

// console.log(merge_one_into_another([2, 5, 6], [1, 2, 3, 0, 0, 0]));

function pair_sum_sorted_array(numbers, target) {
  // Write your code here.
  let n = numbers.length;
  let result = [];
  if (n === 0) return [-1, -1];

  let left = 0;
  let right = n - 1;

  while (left < right) {
    let sum = numbers[left] + numbers[right];
    // console.log({ left, right, sum });
    if (sum < target) {
      left++;
    } else if (sum > target) {
      right--;
    } else {
      result.push(left, right);
      left++;
      right--;
    }
  }
  if (result.length > 0) {
    return result;
  } else {
    return [-1, -1];
  }
}

// console.log(pair_sum_sorted_array([1, 2, 3, 5, 10], 7));

function two_sum(numbers, target) {
  // Write your code here.
  let n = numbers.length;
  if (n === 0) return [-1, -1];

  let hashTable = {};

  for (let i = 0; i < n; i++) {
    let diff = target - numbers[i];
    console.log(hashTable, diff);
    if (hashTable[diff] >= 0) {
      return [i, hashTable[diff]];
    } else {
      hashTable[numbers[i]] = i;
    }
  }

  return [-1, -1];
}

// console.log(two_sum([5, 3, 10, 45, 1], 6));

function can_attend_all_meetings_brute(intervals) {
  for (let i = 0; i < intervals.length; i++) {
    for (let j = i + 1; j < intervals.length; j++) {
      if (i !== j) {
        if (intervals[i][1] > intervals[j][0]) {
          return 0;
        }
      }
    }
  }
  return 1;
}

function can_attend_all_meetings(intervals) {
  // Write your code here.
  intervals.sort(sortFunction);

  for (let i = 0; i < intervals.length - 1; i++) {
    if (intervals[i][1] > intervals[i + 1][0]) {
      return 0;
    }
  }
  return 1;
}

function sortFunction(a, b) {
  if (a[1] === b[1]) {
    return 0;
  }

  return a[1] < b[1] ? -1 : 1;
}

// console.log(
//   can_attend_all_meetings([
//     [1, 5],
//     [5, 8],
//     [10, 15],
//   ])
// );

function find_intersection(arr1, arr2, arr3) {
  // Write your code here.
  let p1 = 0;
  let p2 = 0;
  let p3 = 0;
  let result = [];
  while (p1 < arr1.length && p2 < arr2.length && p3 < arr3.length) {
    if (arr1[p1] === arr2[p2] && arr2[p2] === arr3[p3]) {
      result.push(arr1[p1]);
      p1++;
      p2++;
      p3++;
    }
    let min = Math.min(arr1[p1], arr2[p2], arr3[p3]);
    if (min === arr1[p1]) {
      p1++;
    }
    if (min === arr2[p2]) {
      p2++;
    }
    if (min === arr3[p3]) {
      p3++;
    }
  }

  return result.length > 0 ? result : [-1];
}

// console.log(
//   find_intersection([1, 2, 2, 2, 9], [1, 1, 2, 2], [1, 1, 1, 2, 2, 2])
// );

function isEven(number) {
  return number % 2 === 0;
}

function segregate_evens_and_odds(numbers) {
  // Write your code here.
  let n = numbers.length;
  let left = 0;
  let right = n - 1;

  while (left < right) {
    while (isEven(numbers[left] && left < n)) {
      left++;
    }
    while (!isEven(numbers[right] && right > 0)) {
      right--;
    }

    if (!isEven(numbers[left]) && isEven(numbers[right]) && left < right) {
      [numbers[left], numbers[right]] = [numbers[right], numbers[left]];
      left++;
      right--;
    }
  }

  return numbers;
}

// console.log(segregate_evens_and_odds([1, 3, 5]));

function dutch_flag_sort(balls) {
  if (balls.length <= 1) return balls;

  let n = balls?.length;

  let curr_idx = 0;
  let red_idx = 0;
  let blue_idx = n - 1;

  while (curr_idx <= blue_idx) {
    if (balls[curr_idx] === "R") {
      [balls[curr_idx], balls[red_idx]] = [balls[red_idx], balls[curr_idx]];
      curr_idx++;
      red_idx++;
    } else if (balls[curr_idx] === "G") {
      curr_idx++;
    } else {
      [balls[curr_idx], balls[blue_idx]] = [balls[blue_idx], balls[curr_idx]];
      blue_idx--;
    }
  }

  return balls;
}

// console.log(dutch_flag_sort(["G", "B", "G", "G", "R", "B", "R", "G"]));

//3SUM Problem
function find_zero_sum(arr, k = 0) {
  if (arr.length <= 1) return;

  arr.sort((a, b) => a - b);
  let result = [];
  let n = arr.length;

  for (let i = 0; i < n; i++) {
    if (i > 0 && arr[i] === arr[i - 1]) {
      continue;
    }
    let target = k - arr[i];
    let left = i + 1;
    let right = n - 1;

    while (left < right) {
      let sum = arr[left] + arr[right];
      if (sum === target) {
        result.push(`${arr[i]},${arr[left]},${arr[right]}`);
        left++;
        right--;
        while (left < right && arr[left] === arr[left - 1]) {
          left++;
        }

        while (left < right && arr[right] === arr[right + 1]) {
          right--;
        }
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
}

// console.log(find_zero_sum([10, 3, -4, 1, -6, 9]));

function three_sum(arr, k = 0, idx, first, result) {
  console.log({ first });
  if (arr.length <= 1) return;

  let n = arr.length;

  for (let i = idx + 1; i < n; i++) {
    if (i > idx + 1 && arr[i] === arr[i - 1]) {
      continue;
    }
    let target = k - arr[i];
    let left = i + 1;
    let right = n - 1;

    while (left < right) {
      let sum = arr[left] + arr[right];
      if (sum === target) {
        result.push([first, arr[i], arr[left], arr[right]]);
        // console.log({ result });
        left++;
        right--;
        while (left < right && arr[left] === arr[left - 1]) {
          left++;
        }

        while (left < right && arr[right] === arr[right + 1]) {
          right--;
        }
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
  }
}

function four_sum(arr, k) {
  // Write your code here.
  if (!arr) return;

  arr.sort((a, b) => a - b);
  let result = [];
  let n = arr.length;

  for (let i = 0; i < n; i++) {
    if (i > 0 && arr[i] === arr[i - 1]) {
      continue;
    }
    let target = k - arr[i];
    three_sum(arr, target, i, arr[i], result);
  }
  return result;
}

// console.log(four_sum([0, 0, 1, 3, 2, -1, 6, 2, 1, 0, 3], 6));

function combinationsRecursive(currentNumber, n, k, current, result) {
  if (k === current.length) {
    result.push([...current]);
    return;
  }
  if (currentNumber === n + 1) {
    return;
  }
  current.push(currentNumber);
  combinationsRecursive(currentNumber + 1, n, k, current, result);
  current.pop();
  combinationsRecursive(currentNumber + 1, n, k, current, result);
}

function find_combinations(n, k) {
  const result = [];
  const current = [];

  combinationsRecursive(1, n, k, current, result);
  return result;
}

// console.log(find_combinations(5, 3));

function printPermutations(str) {
  let result = [];
  permHelper("", str);
  function permHelper(slate, str) {
    if (str.length === 0) {
      result.push(slate);
    } else {
      for (let i = 0; i < str.length; i++) {
        permHelper(
          slate + `${str[i]}`,
          str
            .split("")
            .filter((e) => e !== str[i])
            .join("")
        );
      }
    }
  }
  return result;
}

// const result = printPermutations("123")?.filter((item) => item.length !== 4);
// console.log(result);

function get_permutations(arr) {
  let result = [];

  function permuteHelper(slate, array) {
    if (array.length === 0) {
      result.push(slate);
    } else {
      for (let i = 0; i < array.length; i++) {
        permuteHelper(
          slate.concat(array[i]),
          array.filter((ele) => ele !== array[i])
        );
      }
    }
  }

  permuteHelper([], arr);

  return result;
}

// console.log(get_permutations([1, 2, 3]));

function get_binary_strings(n) {
  let result = [];

  function bsHelper(slate, n) {
    if (n === 0) result.push(slate);
    else {
      bsHelper(`${slate}0`, n - 1);
      bsHelper(`${slate}1`, n - 1);
    }
  }

  bsHelper("", n);

  return result;
}

// console.log(get_binary_strings(16));

function generate_all_subsets_array(s) {
  let result = [];

  function subsetHelper(slate, array, index) {
    result.push([...slate]);
    for (let i = index; i < array.length; i++) {
      slate.push(array[i]);
      subsetHelper(slate, array, i + 1);
      slate.pop();
    }
  }
  subsetHelper([], s, 0);
  return result;
}

// console.log(generate_all_subsets_array("xy"));

function generate_all_subsets_util(all_subsets, s, pos, cur_subset) {
  if (pos === s.length) {
    all_subsets.push(cur_subset);

    return;
  }
  generate_all_subsets_util(all_subsets, s, pos + 1, cur_subset);
  generate_all_subsets_util(all_subsets, s, pos + 1, cur_subset + s[pos]);
}

function generate_all_subsets(s) {
  const all_subsets = [];
  generate_all_subsets_util(all_subsets, s, 0, "");
  return all_subsets;
}

// console.log(generate_all_subsets("xy"));

// ========= this functions sorts keys of an object based on value, if values are equal then sorts keys lexically ==============
function sortObject(obj) {
  // Convert the object into an array of [key, value] pairs
  const entries = Object.entries(obj);

  // Sort the array
  entries.sort((a, b) => {
    // Compare values first
    if (a[1] !== b[1]) {
      return a[1] > b[1] ? -1 : 1;
    }
    // If values are equal, compare keys lexically
    return a[0].localeCompare(b[0]);
  });
  console.log(entries);

  // Convert sorted entries back into an object
  return Object.fromEntries(entries);
}

const obj = {
  apple: 2,
  banana: 3,
  cherry: 1,
  date: 3,
  elderberry: 1,
};

const sortedObj = sortObject(obj);
// console.log(sortedObj);

function k_most_frequent(k, words) {
  // Write your code here.
  let hash = {};

  for (let word of words) {
    if (!hash[word]) {
      hash[word] = 0;
    }
    hash[word]++;
  }
  return Object.keys(sortObject(hash))?.slice(0, k);
}

function sortObject(obj) {
  const entries = Object.entries(obj);

  entries.sort((a, b) => {
    if (a[1] !== b[1]) {
      return a[1] > b[1] ? -1 : 1;
    }
    return a[0].localeCompare(b[0]);
  });

  return Object.fromEntries(entries);
}

let k = 4;
let words = [
  "car",
  "bus",
  "taxi",
  "car",
  "driver",
  "candy",
  "race",
  "car",
  "driver",
  "fare",
  "taxi",
];
// console.log(k_most_frequent(k, words));

function count_triplets(target, numbers) {
  numbers.sort((a, b) => a - b);
  let n = numbers.length;
  let result = 0;
  let results = [];
  for (let i = 0; i < n; i++) {
    let left = i + 1;
    let right = n - 1;
    while (left < right) {
      let tripleSum = numbers[i] + numbers[left] + numbers[right];
      if (tripleSum < target) {
        result += right - left;
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
}

// console.log(count_triplets(7, [2, 2, 2, 1]));

function largestString(A) {
  const sortedArr = A.map(String).sort((a, b) => {
    console.log({ a, b, ba: b + a, ab: a + b });
    return (b + a).localeCompare(a + b);
  });

  if (sortedArr[0] === "0") {
    return "0";
  }

  return sortedArr.join("");
}

// console.log(largestString([3, 30, 34, 5, 9]));
// console.log("330".localeCompare("303"));

const LinkedListNode = class {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
};

function merge_k_lists(lists) {
  if (lists.length === 0) {
    return null;
  }

  let low,
    high,
    last = lists.length - 1;

  while (last !== 0) {
    low = 0;
    high = last;

    while (low < high) {
      lists[low] = merge_two_lists(lists[low], lists[high]);
      low++;
      high--;
    }
    last = high;
  }
  return lists[0];
}

function merge_two_lists(head1, head2) {
  if (head1 === null) return head2;
  if (head2 === null) return head1;

  let dummy = new LinkedListNode(0);
  let tail = dummy;

  while (head1 !== null || head2 !== null) {
    if (head1 == null) {
      tail.next = head2;
      head2 = head2.next;
    } else if (head2 === null) {
      tail.next = head1;
      head1 = head1.next;
    } else {
      if (head1.value < head2.value) {
        tail.next = head1;
        head1 = head1.next;
      } else {
        tail.next = head2;
        head2 = head2.next;
      }
    }
    tail = tail.next;
  }
  return dummy.next;
}

// console.log(merge_k_lists([[1, 3, 5], [3, 4], [7]]));

function find_top_k_frequent_elements(arr, k) {
  if (arr.length === 0) return 0;

  let hashMap = {};

  for (let ele of arr) {
    if (!hashMap[ele]) {
      hashMap[ele] = 0;
    }
    hashMap[ele]++;
  }

  hashMap = new Map(Object.entries(hashMap).sort((a, b) => b[1] - a[1]));

  return Array.from(hashMap.keys()).slice(0, k).map(Number);
}

let arr = [1, 2, 1, 2, 3, 1];
// console.log(find_top_k_frequent_elements(arr, 1));

function kth_largest(k, initial_stream, append_stream) {
  let result = [];
  for (let ele of append_stream) {
    initial_stream.push(ele);
    result.push(initial_stream.sort((a, b) => b - a)?.[k - 1]);
  }

  return result;
}

k = 1;
let initial_stream = [1000000000];
let append_stream = [100000000];

console.log(kth_largest(k, initial_stream, append_stream));
