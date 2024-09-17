# VectorShift Pipeline Builder

## Overview
This project is a frontend and backend pipeline builder that allows users to create node-based workflows. The frontend is built using React, while the backend is implemented with FastAPI. The system enables the creation of various types of nodes with abstracted logic, dynamic styling, and backend integration to validate the pipeline's structure.

## Features
- **Node Abstraction**: Easily create new nodes without duplicating code by using a `BaseNode` component that handles shared logic.
- **Custom Node Types**: Pre-built `InputNode`, `LLMNode`, `OutputNode`, and `TextNode` with support for dynamic content and custom connections (Handles).
- **Text Node Logic**: Supports dynamic width and height adjustments based on user input and generates input handles for variables defined in text fields.
- **Backend Integration**: Submits pipeline data to a FastAPI backend, which calculates the number of nodes and edges, and checks if the pipeline is a Directed Acyclic Graph (DAG).
- **Styled UI**: A clean and modern UI with customizable dark mode support and intuitive design elements.

## Installation

### Frontend
1. Navigate to the `/frontend` folder.
2. Run the following commands to install dependencies and start the development server:
   ```bash
   npm install
   npm start
   ```

### Backend
1. Navigate to the `/backend` folder.
2. Run the following commands to install dependencies and start the FastAPI server:
   ```bash
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

## Usage

### Node Abstraction
Nodes are created using a `BaseNode` component that abstracts the common logic such as positioning and handling inputs/outputs. This makes it easy to add new node types by simply extending the `BaseNode`.

### Custom Nodes
The project includes four types of pre-built nodes:
- **InputNode**: For entering data.
- **LLMNode**: Placeholder for large language model interactions.
- **OutputNode**: For displaying results.
- **TextNode**: Dynamically adjusts size based on user input and generates handles for variables wrapped in double curly brackets (e.g., `{{variable}}`).

### Backend Integration
The pipeline data is submitted to the backend by clicking the **Submit** button. The backend parses the pipeline data, checks if it forms a Directed Acyclic Graph (DAG), and returns the result.

The result includes:
- Number of nodes
- Number of edges
- Whether the pipeline forms a DAG

### Submitting a Pipeline
1. Build a pipeline using the drag-and-drop interface.
2. Click the **Submit** button to send the pipeline data to the backend.
3. An alert will display with the number of nodes, edges, and whether the pipeline forms a DAG.

## API Endpoints

### POST `/pipelines/parse`
**Description**: Receives the pipeline data (nodes and edges) and returns a JSON response with the number of nodes, edges, and whether the graph is a DAG.

**Request Body**:
```json
{
  "nodes": [ ... ],
  "edges": [ ... ]
}
```

**Response**:
```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

## Example Workflow

1. Drag `InputNode`, `OutputNode`, `LLMNode`, or `TextNode` onto the canvas.
2. Connect nodes using the drag handles to define data flow.
3. Define text with variables in Text nodes, wrapped in double curly brackets, e.g., `{{input}}`.
4. Click **Submit** to send the pipeline structure to the backend.
5. Receive a response displaying the number of nodes and edges, and whether the pipeline is a DAG.

## Contributing
Feel free to open issues or submit pull requests if you'd like to contribute!

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
```

This **README.md** file includes all necessary details for the project and is ready to be copy-pasted into your repository. Let me know if you need any additional adjustments!