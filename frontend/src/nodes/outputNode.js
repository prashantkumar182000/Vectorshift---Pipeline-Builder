import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');
  const updateNodeField = useStore(state => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'outputName', currName);
  }, [currName, id, updateNodeField]);

  useEffect(() => {
    updateNodeField(id, 'outputType', outputType);
  }, [outputType, id, updateNodeField]);

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setOutputType(e.target.value);

  return (
    <BaseNode
      id={id}
      label="Output"
      handles={[{ type: 'target', position: Position.Left, id: 'value' }]}
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
            value={outputType}
            onChange={handleTypeChange}
            style={{ marginLeft: 5, padding: 5, borderRadius: 4, border: '1px solid #ccc' }}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
