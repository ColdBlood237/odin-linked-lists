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

  return { nodes, append, prepend, size, head, tail, at, pop, contains, find };
}

const list = linked_list_factory();
list.append("hi");
list.append("ryan");
list.append("landry");
list.append("petnga");

console.log(list);
console.log(list.find("petnga"));
