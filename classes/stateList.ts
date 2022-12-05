import StateNode from "./stateNode";

class StateList {
  head: StateNode;

  constructor(head: StateNode) {
    this.head = head;
  }

  /**
   * Inserts a new node at the beginning of the list, before the current head
   * @param newNode
   * @returns head
   */
  insertHead(newNode: StateNode): StateNode {
    newNode._next = this.head;
    if (this.head) {
      this.head._next = null;
    }

    this.head = newNode;
    return this.head;
  }

  /**
   * Inserts a new node at the end of the list, after the current tail
   * Should only run once per node!
   * @param newNode
   * @returns head
   */
  insertTail(newNode: StateNode): StateNode {
    // if the list is empty, the head will point to the new node
    if (!this.head) {
      this.head = newNode;
    }

    if (!this.head._next) {
      this.head._next = newNode;
      return this.head;
    }

    // else, find the list's tail and update the tail's next pointer
    let tail = this.head;
    while (tail._next !== null) {
      tail = tail._next;
    }

    tail._next = newNode;
    return this.head;
  }

  /**
   * Returns the node at a given position
   * @param index
   */
  getAt(index: number): StateNode | null {
    let counter = 0;
    let node: StateNode | null = this.head;
    while (node) {
      if (counter === index) {
        return node;
      }
      counter++;
      node = node._next;
    }
    return null;
  }

  /**
   * Converts the list nodes to an obecto of arrays
   * @returns {StateObj}
   */
  toArray(): StateObj {
    let nextNode: StateNode | null = this.head;
    let vecArr = [];
    let trnArr = [];
    let i = 0;
    while (nextNode) {
      vecArr[i] = [
        ...nextNode.vectors,
      ];
      trnArr.push(nextNode.transformation);
      nextNode = nextNode._next;
      i++;
    }
    // return vecArr;
    return {
      transformationArr: trnArr, 
      vectorArr: vecArr
    };
  }

  updateNodes() {
    let currentNode: StateNode | null = this.head._next;
    
    if (!currentNode) {
      return;
    }

    while (currentNode) {
      currentNode.vectors = currentNode.updateVectors();
      currentNode = currentNode._next;
    }

    return this.head;
  }

  getTail(): StateNode {
    if (!this.head._next) {
      return this.head;
    }

    let tail = this.head;
    while (tail._next) {
      tail = tail._next;
    }
    return tail;
  }
}

export default StateList;
