export default function validateDAG(nodes, edges) {
  if (nodes.length < 2) return false;

  const adjList = {};
  nodes.forEach((n) => (adjList[n.id] = []));
  edges.forEach((e) => adjList[e.source].push(e.target));

  const visited = {};
  const recStack = {};

  function dfs(nodeId) {
    if (!visited[nodeId]) {
      visited[nodeId] = true;
      recStack[nodeId] = true;

      for (const neighbor of adjList[nodeId]) {
        if (!visited[neighbor] && dfs(neighbor)) return true;
        else if (recStack[neighbor]) return true;
      }
    }
    recStack[nodeId] = false;
    return false;
  }

  for (const node of nodes) {
    if (dfs(node.id)) return false;
  }

  for (const node of nodes) {
    const hasEdge = edges.some(
      (e) => e.source === node.id || e.target === node.id
    );
    if (!hasEdge) return false;
  }

  return true;
}
