import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';
import { useStore } from '../store';

export const LLMNode = ({ id, data }) => {
  const [currPrompt, setCurrPrompt] = useState(data?.prompt || '');
  const updateNodeField = useStore(state => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'prompt', currPrompt);
  }, [currPrompt, id, updateNodeField]);

  const handlePromptChange = (e) => setCurrPrompt(e.target.value);

  return (
    <BaseNode
      id={id}
      label="LLM"
      handles={[
        { type: 'target', position: Position.Left, id: 'system', style: { top: '25%' } },
        { type: 'target', position: Position.Left, id: 'prompt', style: { top: '50%' } },
        { type: 'source', position: Position.Right, id: 'response' },
      ]}
    >
      <div style={{ padding: 10 }}>
        <label>
          Prompt:
          <textarea
            value={currPrompt}
            onChange={handlePromptChange}
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
