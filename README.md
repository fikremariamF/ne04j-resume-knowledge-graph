# Neo4j Resume Graph

This project transforms a resume into a Neo4j knowledge graph. It uses Node.js to create nodes and relationships based on the resume's content, allowing for meaningful queries to extract different aspects of a professional profile.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Neo4j](https://neo4j.com/download/)

## Installation

1. **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd neo4j-resume-graph
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

## Setup

1. **Prepare the data:**
    - Update `initial_data.txt` with your resume details in JSON format.

2. **Configure Neo4j connection:**
    - Ensure your Neo4j database is running and update the connection details in `create_graph.js`.

## Usage

1. **Create Nodes and Relationships:**
    ```sh
    node create_graph.js
    ```

2. **Run Queries:**
    ```sh
    node queries.js
    ```

3. **Verify in Neo4j Browser:**
    - Open the Neo4j browser and visualize your graph to ensure all nodes and relationships are created as expected.


