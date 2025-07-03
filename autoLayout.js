import dagre from 'dagre';

export default function applyAutoLayout(nodes, edges, setNodes) {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: 'LR' });
  g.setDefaultEdgeLabel(() => ({}));

  nodes.forEach((node) => g.setNode(node.id, { width: 172, height: 36 }));
  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  dagre.layout(g);

  const newNodes = nodes.map((node) => {
    const { x, y } = g.node(node.id);
    return { ...node, position: { x, y } };
  });

  setNodes(newNodes);
}
