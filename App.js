import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Controls,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomNode from './components/CustomNode';
import ControlsPanel from './components/ControlsPanel';
import validateDAG from './utils/validateDAG';
import applyAutoLayout from './utils/autoLayout';

const nodeTypes = { custom: CustomNode };

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [dagStatus, setDagStatus] = useState('');

  const onConnect = useCallback((params) => {
    if (params.source === params.target) return;
    setEdges((eds) => addEdge({ ...params, animated: true }, eds));
  }, []);

  const addNode = () => {
    const label = prompt('Enter node name');
    if (!label) return;
    const newNode = {
      id: `${+new Date()}`,
      type: 'custom',
      data: { label },
      position: { x: Math.random() * 300, y: Math.random() * 300 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const validateGraph = () => {
    const result = validateDAG(nodes, edges);
    setDagStatus(result ? '✅ Valid DAG' : '❌ Invalid DAG');
  };

  return (
    <ReactFlowProvider>
      <div className="editor-container">
        <ControlsPanel
          onAddNode={addNode}
          onValidate={validateGraph}
          onLayout={() => applyAutoLayout(nodes, edges, setNodes)}
        />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
        <div className="status">{dagStatus}</div>
        <pre className="json-preview">{JSON.stringify({ nodes, edges }, null, 2)}</pre>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
