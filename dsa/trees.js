const BinaryTreeNode = class {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
};

function dfs(node, ret, level) {
  if (node === null) {
    return;
  }

  if (level >= ret.length) {
    ret.push([]);
  }
  ret[level].push(node.value);

  dfs(node.left, ret, level + 1);
  dfs(node.right, ret, level + 1);
}

function levelOrder(root) {
  let ret = [];
  dfs(root, ret, 0);
  return ret;
}

function preOrderHelper(node, result) {
  if (root === null) return;

  result.push(node.value);
  preOrderHelper(node.left, result);
  preOrderHelper(node.right, result);
}

function preOrder(root) {
  let result = [];
  preOrderHelper(root, result);
  return result;
}
