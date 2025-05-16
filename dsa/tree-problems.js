// insert a value into binary tree or build a binary search tree from an array

class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function build_a_bst(values) {
  let root = null;
  for (let value of values) {
    root = insert_into_bst(root, value);
  }
  return root;
}

function insert_into_bst(root, value) {
  if (root === null) {
    return new BinaryTreeNode(value);
  }
  let parent = root;
  let currentNode = root;

  while (currentNode) {
    parent = currentNode;
    if (value < currentNode.value) {
      currentNode = currentNode.left;
    } else {
      currentNode = currentNode.right;
    }
  }

  if (value < parent.value) {
    parent.left = new BinaryTreeNode(value);
  } else {
    parent.right = new BinaryTreeNode(value);
  }
  return root;
}

console.log(build_a_bst([7, 5, 9]));
