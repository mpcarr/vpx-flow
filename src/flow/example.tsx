import * as React from 'react';
import { useMemo } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import { TextUpdaterNode } from '../nodes/test';

const nodeTypes = {
  'textUpdater': TextUpdaterNode
}

//useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

export function ExampleFlow() {

  const nodes = [
  { id: 'node-1', type: 'textUpdater', position: { x: 0, y: 0 }, data: {} },
];

  return (
    <div style={{ height: '500px', width: '500px' }}>
    <ReactFlow nodeTypes={nodeTypes} nodes={nodes}>
      <Background />
      <Controls />
    </ReactFlow>
  </div>
  );
}