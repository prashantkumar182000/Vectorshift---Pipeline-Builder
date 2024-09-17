import { useEffect, useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');
  const updateNodeField = useStore(state => state.updateNodeField);

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);

  useEffect(() => {
    updateNodeField(id, 'inputName', currName);
  }, [currName, id, updateNodeField]);

  useEffect(() => {
    updateNodeField(id, 'inputType', inputType);
  }, [inputType, id, updateNodeField]);

  return (
    <BaseNode
      id={id}
      label="Input"
      handles={[{ type: 'source', position: Position.Right, id: 'value' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <label>
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            style={{ marginLeft: 5, padding: 5, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </label>
        <label>
          Type:
          <select
            value={inputType}
            onChange={handleTypeChange}
            style={{ marginLeft: 5, padding: 5, borderRadius: 4, border: '1px solid #ccc' }}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
