import React, { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

// Function to generate random node data
const generateRandomNodes = (numNodes) => {
  let nodes = [];
  for (let i = 1; i <= numNodes; i++) {
    nodes.push({
      id: i.toString(),
      type: i === 1 ? 'input' : i === numNodes ? 'output' : 'default',
      data: { label: `Node ${i}` },
      position: {
        x: Math.floor(Math.random() * 800),
        y: Math.floor(Math.random() * 600)
      },
      style: {
        border: '1px solid black',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`
      }
    });
  }
  return nodes;
};

// Function to generate random edge data
const generateRandomEdges = (nodes) => {
  let edges = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    edges.push({
      id: `e${i}-${i + 1}`,
      source: nodes[i].id,
      target: nodes[i + 1].id,
      animated: Math.random() > 0.3,
      label: `Edge ${i}-${i + 1}`,
      style: {
        stroke: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
      }
    });
  }
  for (let i = 0; i < nodes.length - 2; i++) {
    if (Math.random() > 0.7) {
      edges.push({
        id: `e${i}-${i + 2}`,
        source: nodes[i].id,
        target: nodes[i + 2].id,
        animated: Math.random() > 0.5,
        label: `Cross-link ${i}-${i + 2}`,
        style: {
          stroke: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
        }
      });
    }
  }
  return edges;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [nodes, setNodes] = useState(generateRandomNodes(4));
  const [edges, setEdges] = useState(generateRandomEdges(nodes));

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    setDarkMode(!darkMode);
  };

  const handleGenerateData = () => {
    const newNodes = generateRandomNodes(5);
    const newEdges = generateRandomEdges(newNodes);
    setNodes(newNodes);
    setEdges(newEdges);
  };

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      <PipelineToolbar />
      <PipelineUI darkMode={darkMode} />
      <SubmitButton nodes={nodes} edges={edges} onGenerateData={handleGenerateData} />
      <div style={{ position: 'absolute', top: 20, right: 20 }}>
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}

export default App;
