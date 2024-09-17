import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='text' label='Text' />
        <DraggableNode type='customOutput' label='Output' />
      </div>
    </div>
  );
};
