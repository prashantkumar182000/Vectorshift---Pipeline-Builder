// src/nodes/TextNode.js
import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';
import { useStore } from '../store';

// Utility function to extract variables from text
const extractVariables = (text) => {
  const regex = /{{\s*([a-zA-Z_$][0-9a-zA-Z_$]*)\s*}}/g;
  let match;
  const variables = [];
  while ((match = regex.exec(text)) !== null) {
    variables.push(match[1]);
  }
  return variables;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variableHandles, setVariableHandles] = useState([]);
  const updateNodeField = useStore(state => state.updateNodeField);



  const handleTextChange = (e) => setCurrText(e.target.value);

  const nodeStyle = {
    width: Math.max(200, currText.length * 10),
    height: Math.max(100, currText.split('\n').length * 20),
    border: '1px solid #ddd',
    borderRadius: 8,
    padding: 10,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
    overflow: 'hidden',
  };

  return (
    <BaseNode
      id={id}
      label="Text"
      handles={[
        { type: 'source', position: Position.Right, id: 'output', style: { top: '60%' } },
        { type: 'target', position: Position.Left, id: 'input', style: { top: '30%' } },
        ...variableHandles,
      ]}
      style={nodeStyle}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <label>
          Text:
          <textarea
            value={currText}
            onChange={handleTextChange}
            style={{
              marginLeft: 5,
              padding: 5,
              borderRadius: 4,
              border: '1px solid #ccc',
              width: '100%',
              height: '100%',
              boxSizing: 'border-box',
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
};
