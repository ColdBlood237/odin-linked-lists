function node_factory(value, nextNode) {
  if (value === undefined) {
    value = null;
  }
  if (nextNode === undefined) {
    nextNode = null;
  }
  let index;
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
        nodes.push(node_factory(value, node_value));
        return;
      }
    }
  }

  function size() {
    return nodes.length;
  }

  function head() {
    return head_value;
  }

  function tail() {
    for (const node of nodes) {
      if (node.nextNode === null) {
        return node;
      }
    }
  }

  return { nodes, append, prepend, size, head, tail, at };
}

// const list = linked_list_factory();
// list.append("hi");
// list.append("ryan");
// list.append("landry");
// list.prepend("sir");

// console.log(list);
// console.log(list.head());
// console.log(list.tail());
