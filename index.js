function node_factory(value, nextNode) {
  if (value === undefined) {
    value = null;
  }
  if (nextNode === undefined) {
    nextNode = null;
  }
  return { value, nextNode };
}

function linked_list_factory() {
  const nodes = [];
  let head_value;

  function append(value) {
    for (const node of nodes) {
      if (node.nextNode === null) {
        node.nextNode = value;
      }
    }
    if (nodes.length === 0) {
      head_value = value;
    }
    nodes.push(node_factory(value));
  }

  function prepend(value) {
    for (const node of nodes) {
      const node_value = node.value;
      let link_found = false;
      for (const node of nodes) {
        if (node_value === node.nextNode) {
          link_found = true;
        }
      }
      if (!link_found) {
        // link to the node not found = head node
        head_value = value;
        nodes.push(node_factory(value, node_value));
        return;
      }
    }
  }

  function size() {
    return nodes.length;
  }

  function head() {
    for (const node of nodes) {
      if (node.value === head_value) {
        return node;
      }
    }
  }

  function tail() {
    for (const node of nodes) {
      if (node.nextNode === null) {
        return node;
      }
    }
  }

  function at(index) {
    let prev_node;
    for (const node of nodes) {
      if (node.value === head_value) {
        prev_node = node;
      }
    }

    for (let i = 0; i < index; i++) {
      for (const node of nodes) {
        if (node.value === prev_node.nextNode) {
          prev_node = node;
          break;
        }
      }
    }

    return prev_node;
  }

  function pop() {
    for (const node of nodes) {
      if (node.nextNode === null) {
        let tail_node = node;
        for (const node of nodes) {
          // remove link pointing at the last node
          if (node.nextNode === tail_node.value) {
            node.nextNode = null;
          }
        }
        for (let i = 0; i < nodes.length; i++) {
          // remove the node from the list of nodes
          if (nodes[i].value === tail_node.value) {
            nodes.splice(i, 1);
          }
        }
      }
    }
  }

  function contains(value) {
    for (const node of nodes) {
      if (node.value === value) {
        return true;
      }
    }
    return false;
  }

  function find(value) {
    let prev_node;
    // find the head node
    for (const node of nodes) {
      if (node.value === head_value) {
        prev_node = node;
      }
    }
    // navigate the list starting from head
    for (let i = 0; i < nodes.length; i++) {
      // check if the current node is the one we're looking of
      if (prev_node.value === value) {
        return i;
      }
      // get the next node
      else {
        for (const node of nodes) {
          if (node.value === prev_node.nextNode) {
            prev_node = node;
            break;
          }
        }
      }
    }
  }

  function toString() {
    let string_list = "";
    let prev_node;
    // find the head node
    for (const node of nodes) {
      if (node.value === head_value) {
        prev_node = node;
      }
    }

    // add each node at the string
    for (let i = 0; i < nodes.length; i++) {
      if (prev_node.nextNode !== null) {
        string_list += `( ${prev_node.value} ) -> `;
      } else {
        string_list += `( ${prev_node.value} ) -> null`;
      }

      // look for the next node
      for (const node of nodes) {
        if (node.value === prev_node.nextNode) {
          prev_node = node;
          break;
        }
      }
    }

    return string_list;
  }

  function insertAt(value, index) {
    if (index < 1 || index >= nodes.length) {
      throw console.error(
        `Index must be between 1 and ${nodes.length - 1} included`
      );
    }
    let prev_node;
    // get the head node
    for (const node of nodes) {
      if (node.value === head_value) {
        prev_node = node;
      }
    }

    // get the node currently at position index
    for (let i = 0; i < index; i++) {
      for (const node of nodes) {
        if (node.value === prev_node.nextNode) {
          prev_node = node;
          break;
        }
      }
    }

    // initialize the new node with a link to the node he which it took the place
    let new_node = node_factory(value, prev_node.value);

    // get the head node again
    for (const node of nodes) {
      if (node.value === head_value) {
        prev_node = node;
      }
    }

    // get the node at position just behind index
    for (let i = 0; i < index - 1; i++) {
      for (const node of nodes) {
        if (node.value === prev_node.nextNode) {
          prev_node = node;
          break;
        }
      }
    }

    // link that node to the new node just inserted
    prev_node.nextNode = new_node.value;

    nodes.push(new_node);
  }

  function removeAt(index) {
    // remove the head node
    if (index === 0) {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].value === head_value) {
          head_value = nodes[i].nextNode;
          nodes.splice(i, 1);
        }
      }
    } else if (index < nodes.length) {
      let prev_node;
      // get the head node
      for (const node of nodes) {
        if (node.value === head_value) {
          prev_node = node;
        }
      }

      // get the node currently at position index
      for (let i = 0; i < index; i++) {
        for (const node of nodes) {
          if (node.value === prev_node.nextNode) {
            prev_node = node;
            break;
          }
        }
      }

      // save the reference to the just after index
      let next_node = prev_node.nextNode;

      // remove that node from the nodes array
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].value === prev_node.value) {
          nodes.splice(i, 1);
        }
      }

      // get the head node
      for (const node of nodes) {
        if (node.value === head_value) {
          prev_node = node;
        }
      }

      // get the node just before index
      for (let i = 0; i < index; i++) {
        for (const node of nodes) {
          if (node.value === prev_node.nextNode) {
            prev_node = node;
            break;
          }
        }
      }

      // make the node just before index refer to the one just after index
      prev_node.nextNode = next_node;
    } else {
      throw console.error(
        `Index must be between 0 and ${nodes.length - 1} included`
      );
    }
  }

  return {
    nodes,
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
}

const list = linked_list_factory();
list.append("hi");
list.append("ryan");
list.append("landry");
list.append("petnga");

console.log(list.toString());

list.removeAt(3);

console.log(list.toString());
