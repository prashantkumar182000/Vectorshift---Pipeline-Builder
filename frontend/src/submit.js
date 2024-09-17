import React from 'react';

/**
 * Submits the nodes and edges data to the backend and displays the response.
 * @param {Array} nodes - The list of nodes.
 * @param {Array} edges - The list of edges.
 */
const submitPipeline = async (nodes, edges) => {
  try {
    console.log('Submitting nodes:', nodes);  // Debugging line
    console.log('Submitting edges:', edges);  // Debugging line

    const response = await fetch('http://localhost:8000/pipelines/parse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nodes, edges }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Received data:', data);  // Debugging line

    alert(`Pipeline Information:\n- Number of nodes: ${data.num_nodes}\n- Number of edges: ${data.num_edges}\n- Is the pipeline a DAG: ${data.is_dag ? 'Yes' : 'No'}`);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    alert('Failed to submit the pipeline. Please check your backend connection.');
  }
};

/**
 * SubmitButton component that triggers the submitPipeline function.
 * @param {Object} props - The props object.
 * @param {Array} props.nodes - The list of nodes.
 * @param {Array} props.edges - The list of edges.
 * @param {Function} props.onGenerateData - Function to generate new random data.
 */
const SubmitButton = ({ nodes, edges, onGenerateData }) => {
  return (
    <div>
      <button
        onClick={() => {
          submitPipeline(nodes, edges);
          onGenerateData();  // Regenerate data after submission
        }}
        style={{
          padding: '10px 20px',
          borderRadius: '8px',
          backgroundColor: '#6072da',
          color: '#fff',
          border: '2px solid #040627',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          marginTop: '20px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        Submit Pipeline
      </button>
    </div>
  );
};

export { SubmitButton, submitPipeline };
