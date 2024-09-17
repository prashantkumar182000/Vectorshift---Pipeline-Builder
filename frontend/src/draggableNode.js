export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{ 
        cursor: 'grab', 
        minWidth: '100px', 
        height: '80px',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: '8px',
        backgroundColor: '#f1f1f1', 
        border: '1px solid #ccc',
        padding: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center',
        fontWeight: 'bold'
      }}
      draggable
    >
      {label}
    </div>
  );
};
