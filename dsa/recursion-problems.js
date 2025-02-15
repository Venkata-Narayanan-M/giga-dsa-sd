function letter_case_permutations(s) {
  // Write your code here.
  let result = [];

  generateString(s, 0, [], result);
  return result;
}

function generateString(input, index, slate, result) {
  if (index === input.length) {
    result.push(slate.join(""));
    return;
  }

  if (!isNaN(input[index])) {
    slate.push(input[index]);
    generateString(input, index + 1, slate, result);
    slate.pop();
  } else {
    slate.push(input[index].toLowerCase());
    generateString(input, index + 1, slate, result);
    slate.pop();

    slate.push(input[index].toUpperCase());
    generateString(input, index + 1, slate, result);
    slate.pop();
  }
}

// console.log(letter_case_permutations("a1zd"));

function find_combinations(n, k) {
  // Write your code here.
  let result = [];

  function generateCombinations(index, slate) {
    if (slate.length === k) {
      result.push([...slate]);
      return;
    }

    for (let i = index; i <= n; i++) {
      slate.push(i);
      generateCombinations(i + 1, slate);
      slate.pop();
    }
  }

  generateCombinations(1, []);
  return result;
}

// console.log(find_combinations(5, 2));

function get_permutations(arr) {
  // Write your code here.
  let result = [];

  function permutationHelper(slate, remNums) {
    if (remNums.length === 0) {
      result.push([...slate]);
      return;
    }

    for (let i = 0; i < remNums.length; i++) {
      slate.push(remNums[i]);
      let leftNums = remNums.filter((_, idx) => idx !== i);
      permutationHelper(slate, leftNums);
      slate.pop();
    }
  }

  permutationHelper([], arr);

  return result;
}

// console.log(get_permutations([1, 2, 3]).length);

function get_distinct_subsets(s) {
  let result = [];
  let chars = s.split("").sort();

  function subsetHelper(index, slate) {
    result.push(slate.join(""));
    for (let i = index; i < s.length; i++) {
      if (i > index && chars[i] === chars[i - 1]) {
        continue;
      }

      slate.push(chars[i]);
      subsetHelper(i + 1, slate);
      slate.pop();
    }
  }

  subsetHelper(0, []);
  return result;
}

console.log(get_distinct_subsets("aab"));
