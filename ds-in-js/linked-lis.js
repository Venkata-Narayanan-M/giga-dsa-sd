class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
    } else {
      let currentNode = this.head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode;
    }
    this.size++;
  }

  prepend(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  removeAt(index) {
    if (index < 0 || index > this.size) {
      return null;
    }

    let currentNode = this.head;
    let previousNode;
    let count = 0;

    if (index === 0) {
      this.head = currentNode.next;
    } else {
      while (count < index) {
        previousNode = currentNode;
        currentNode = currentNode.next;
        count++;
      }
      previousNode.next = currentNode.next;
    }
    this.size--;
    return currentNode.value;
  }

  getAt(index) {
    if (index < 0 || index > this.size) {
      return null;
    }

    let currentNode = this.head;
    let count = 0;

    while (count < index) {
      currentNode = currentNode.next;
      count++;
    }

    return currentNode.value;
  }

  printList() {
    let currentNode = this.head;
    let listValues = "";

    while (currentNode) {
      listValues += currentNode.value + "->";
      currentNode = currentNode.next;
    }

    console.log(listValues + "null");
  }

  getSize() {
    return this.size;
  }
}

const list1 = new LinkedList();
list1.append(10);
list1.append(20);

list1.printList();

list1.prepend(5);
list1.prepend(-10);

list1.printList();

list1.removeAt(1);

list1.printList();
console.log(list1.getAt(1));

console.log(list1.getSize());
