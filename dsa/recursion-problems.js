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

// console.log(get_distinct_subsets("aab"));

function check_if_sum_possible(arr, k) {
  let result = [];

  function dfs(index, currSum, currSubset) {
    if (currSum === k && currSubset.length > 0) {
      result.push([...currSubset]);
      return;
    }
    if (index === arr.length) {
      return;
    }

    currSubset.push(arr[index]);
    dfs(index + 1, currSum + arr[index], currSubset);
    currSubset.pop();
    dfs(index + 1, currSum, currSubset);
  }

  dfs(0, 0, []);
  return result;
}
// console.log(check_if_sum_possible([2, 4, 8], 6));

function letter_case_permutations(s) {
  let result = [];

  function helper(index, currString) {
    if (index === s.length) {
      result.push(currString.join(""));
      return;
    }

    const char = s[index];

    if (!isNaN(char)) {
      currString.push(char);
      helper(index + 1, currString);
      currString.pop();
    } else {
      currString.push(char.toLowerCase());
      helper(index + 1, currString);
      currString.pop();
      currString.push(char.toUpperCase());
      helper(index + 1, currString);
      currString.pop();
    }
  }
  helper(0, []);

  return result;
}

// console.log(letter_case_permutations("a1z"));

function letter_case_permutations_backtrack(s) {
  let result = [];

  function backtrack(index, currStr) {
    if (index === s.length) {
      result.push(currStr);
      return;
    }

    const char = s[index];

    if (char >= "0" && char <= "9") {
      backtrack(index + 1, currStr + char);
    } else {
      backtrack(index + 1, currStr + char.toLowerCase());
      backtrack(index + 1, currStr + char.toUpperCase());
    }
  }
  backtrack(0, "");
  return result;
}

// console.log(letter_case_permutations_backtrack("a1z"));

var combinationSum = function (candidates, target) {
  let result = [];

  function combinationHelper(index, currSum, currSet) {
    if (currSum === target) {
      result.push([...currSet]);
      return;
    }

    if (index >= candidates.length || currSum > target) {
      return;
    }

    currSet.push(candidates[index]);
    combinationHelper(index + 1, currSum + candidates[index], currSet);
    currSet.pop();
    combinationHelper(index + 1, currSum, currSet);
  }
  combinationHelper(0, 0, []);
  return result;
};

console.log(combinationSum([2, 5, 2, 1, 2], 5));
