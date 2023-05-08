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
    return head_value;
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

  return { nodes, append, prepend, size, head, tail, at, pop };
}

const list = linked_list_factory();
list.append("hi");
list.append("ryan");
list.append("landry");
list.append("petnga");

console.log(list);
