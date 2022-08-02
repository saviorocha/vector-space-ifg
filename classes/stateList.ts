import StateNode from "./stateNode";

/**
 * Created based on the post: https://codeburst.io/linked-lists-in-javascript-es6-code-part-1-6dd349c3dcc3
 */
class StateList {
  private head: StateNode | null;

  constructor(head: StateNode | null = null) {
    this.head = head;
  }

  /**
   * Inserts a new node at the beginning of the list, before the current head
   * @param newNode
   * @returns list's head
   */
  insertHead(newNode: StateNode): StateNode | null {
    newNode._next = this.head;
    this.head = newNode;
    return this.head;
  }

  /**
   * Inserts a new node at the end of the list, after the current tail
   * @param newNode
   * @returns list's head
   */
  insertTail(newNode: StateNode): StateNode | null {
    // if the list is empty, the head will point to the new node
    if (!this.head) {
      this.head = newNode;
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
}

export default StateList;
