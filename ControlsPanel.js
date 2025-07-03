import React from 'react';

const ControlsPanel = ({ onAddNode, onValidate, onLayout }) => (
  <div className="controls-panel">
    <button onClick={onAddNode}>➕ Add Node</button>
    <button onClick={onValidate}>✅ Validate</button>
    <button onClick={onLayout}>📐 Auto Layout</button>
  </div>
);

export default ControlsPanel;
