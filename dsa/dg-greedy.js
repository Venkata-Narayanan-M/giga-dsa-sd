const findLongestChainCount = (pairs) => {
  let currentEnd = -Infinity;
  let chainCount = 0;
  pairs.sort((a, b) => a[1] - b[1]);

  for (let pair of pairs) {
    if (pair[0] > currentEnd) {
      currentEnd = pair[1];
      chainCount++;
    }
  }

  return chainCount;
};

const findLongestChainPairs = (pairs) => {
  let currentEnd = -Infinity;
  let chainPairs = [];
  pairs.sort((a, b) => a[1] - b[1]);

  for (let pair of pairs) {
    if (pair[0] > currentEnd) {
      currentEnd = pair[1];
      chainPairs.push(pair);
    }
  }

  return chainPairs;
};

console.log(
  findLongestChainPairs([
    [7, 8],
    [5, 6],
    [1, 2],
    [3, 5],
    [4, 10],
    [2, 3],
    [11, 20],
    [21, 30],
  ])
);

// ========================================== //
