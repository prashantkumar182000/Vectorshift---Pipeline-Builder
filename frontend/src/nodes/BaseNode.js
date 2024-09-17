import { Handle } from 'reactflow';

export const BaseNode = ({ id, label, children, handles = [] }) => {
  return (
    <div style={{ width: 200, height: 100, border: '1px solid #ddd', borderRadius: 8, padding: 10, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)', position: 'relative', backgroundColor: '#fff' }}>
      <div style={{ fontWeight: 'bold', marginBottom: 8 }}>{label}</div>
      <div>{children}</div>
      {handles.map(({ type, position, id: handleId, style }, index) => (
        <Handle
          key={index}
          type={type}
          position={position}
          id={`${id}-${handleId}`}
          style={{ ...style, zIndex: 1 }} // Ensure handles are on top
        />
      ))}
    </div>
  );
};
