// src/PipelineUI.js
import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { SubmitButton } from './submit';

import 'reactflow/dist/style.css';

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  updateNodeField: state.updateNodeField, // Ensure this is included
});

export const PipelineUI = ({ darkMode }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateNodeField,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    return { id: nodeID, nodeType: `${type}` };
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const appData = event.dataTransfer.getData('application/reactflow');

      if (appData) {
        const { nodeType } = JSON.parse(appData);

        if (!reactFlowInstance) return;

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(nodeType);
        const newNode = {
          id: nodeID,
          type: nodeType,
          position,
          data: getInitNodeData(nodeID, nodeType),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onLoad = useCallback((instance) => {
    setReactFlowInstance(instance);
  }, []);

  const uiBackgroundColor = darkMode ? '#1b1822' : '#f0f0f0';

  return (
    <div
      className="pipeline-ui"
      ref={reactFlowWrapper}
      style={{
        width: '100%',
        height: '80vh',
        background: uiBackgroundColor,
        border: darkMode ? '1px solid #9b30ff' : '1px solid #ddd',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={onLoad}
        snapGrid={[20, 20]}
        connectionLineType="smoothstep"
      >
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={20} />
      </ReactFlow>

      <SubmitButton nodes={nodes} edges={edges} />
    </div>
  );
};
