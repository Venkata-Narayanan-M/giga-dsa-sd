class Graph {
  constructor() {
    this.vertices = new Set();
    this.adjacentList = new Map();
  }
  addVertex(vertex) {
    this.vertices.add(vertex);
    this.adjacentList.set(vertex, []);
  }
  addEdge(vertex1, vertex2) {
    this.adjacentList.get(vertex1).push(vertex2);
    this.adjacentList.get(vertex2).push(vertex1);
  }

  bfs(startVertex) {
    const visited = new Set();
    const queue = [startVertex];
    visited.add(startVertex);

    while (queue.length > 0) {
      const currentNode = queue.shift();
      visited.add(currentNode);

      const neighbors = this.adjacentList.get(currentNode);
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      }
    }
    return visited;
  }

  dfs(startVertex) {
    const visited = new Set();
    const stack = [startVertex];
    visited.add(startVertex);

    while (stack.length > 0) {
      const currentNode = stack.pop();
      visited.add(currentNode);

      const neighbors = this.adjacentList.get(currentNode);
      for (let i = neighbors.length - 1; i >= 0; i--) {
        if (!visited.has(neighbors[i])) {
          stack.push(neighbors[i]);
        }
      }
    }

    return visited;
  }
}
const graph1 = new Graph();
graph1.addVertex("A");
graph1.addVertex("B");
graph1.addVertex("C");
graph1.addVertex("D");
graph1.addVertex("E");
graph1.addVertex("F");
graph1.addVertex("G");
graph1.addVertex("H");
graph1.addVertex("I");
graph1.addVertex("J");
graph1.addEdge("A", "B");
graph1.addEdge("A", "C");
graph1.addEdge("A", "D");
graph1.addEdge("B", "E");
graph1.addEdge("B", "F");
graph1.addEdge("C", "G");
graph1.addEdge("C", "H");
graph1.addEdge("D", "I");
graph1.addEdge("D", "J");
graph1.addEdge("E", "D");

console.log(graph1);
console.log("BFS ", graph1.bfs("A"));
console.log("====");
console.log("DFS ", graph1.dfs("A"));

// A,B,C,D,E,F,G,H,I,J
// A,B,E,D,I,J,F,C,G,H
