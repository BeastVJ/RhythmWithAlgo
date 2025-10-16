import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Pause, RotateCcw, Square } from "lucide-react";

interface Node {
  id: number;
  distance: number;
  visited: boolean;
}

interface Edge {
  from: number;
  to: number;
  weight: number;
}

// Simple 5x1 grid nodes for visualization
const initialNodes: Node[] = [
  { id: 0, distance: Infinity, visited: false },
  { id: 1, distance: Infinity, visited: false },
  { id: 2, distance: Infinity, visited: false },
  { id: 3, distance: Infinity, visited: false },
  { id: 4, distance: Infinity, visited: false },
];

const initialEdges: Edge[] = [
  { from: 0, to: 1, weight: 2 },
  { from: 0, to: 2, weight: 4 },
  { from: 1, to: 2, weight: 1 },
  { from: 1, to: 3, weight: 7 },
  { from: 2, to: 4, weight: 3 },
  { from: 3, to: 4, weight: 1 },
];

const DijkstraVisualizer = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges] = useState<Edge[]>(initialEdges);
  const [isRunning, setIsRunning] = useState(false);
  const [visitedCount, setVisitedCount] = useState(0);
  const [speed, setSpeed] = useState(500);

  const stopRef = useRef(false);

  useEffect(() => {
    resetNodes();
  }, []);

  const resetNodes = () => {
    setNodes(initialNodes.map(n => ({ ...n, distance: Infinity, visited: false })));
    setVisitedCount(0);
    setIsRunning(false);
    stopRef.current = false;
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const runDijkstra = async () => {
    setIsRunning(true);
    stopRef.current = false;

    const n = nodes.length;
    const dist = nodes.map(() => Infinity);
    const visited = new Array(n).fill(false);
    dist[0] = 0;

    for (let i = 0; i < n; i++) {
      let u = -1;
      for (let j = 0; j < n; j++) {
        if (!visited[j] && (u === -1 || dist[j] < dist[u])) {
          u = j;
        }
      }
      if (dist[u] === Infinity) break;
      visited[u] = true;

      setNodes(prev => prev.map(node =>
        node.id === u ? { ...node, visited: true, distance: dist[u] } : node
      ));
      setVisitedCount(prev => prev + 1);
      await sleep(speed);
      if (stopRef.current) break;

      edges.forEach(e => {
        if (e.from === u && !visited[e.to] && dist[u] + e.weight < dist[e.to]) {
          dist[e.to] = dist[u] + e.weight;
        }
      });
    }

    setIsRunning(false);
  };

  const stopAlgorithm = () => {
    stopRef.current = true;
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/levels/advanced">
          <Button variant="ghost" className="mb-8 flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Advanced
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 text-gray-800">Dijkstra's Algorithm</h1>
          <p className="text-lg text-gray-600">
            Visualize shortest path calculations step-by-step from Node 0.
          </p>
        </div>

        {/* Visualization Grid */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-5 gap-4 justify-center">
            {nodes.map((node) => (
              <div
                key={node.id}
                className={`flex flex-col items-center justify-center h-24 rounded-lg shadow-md transition-colors ${
                  node.visited ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                }`}
              >
                <span className="font-bold">Node {node.id}</span>
                <span className="font-mono">{node.distance === Infinity ? "∞" : node.distance}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Controls */}
        <Card className="p-6 mb-6 flex flex-wrap items-center gap-4">
          <Button
            onClick={runDijkstra}
            disabled={isRunning}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isRunning ? "Running..." : "Start"}
          </Button>
          <Button
            onClick={stopAlgorithm}
            disabled={!isRunning}
            variant="destructive"
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <Square className="mr-2 h-4 w-4" /> Stop
          </Button>
          <Button
            onClick={resetNodes}
            disabled={isRunning}
            variant="outline"
            className="border-gray-500 text-gray-700 hover:bg-gray-100"
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>

          <div className="flex items-center gap-2">
            <label className="text-gray-600 text-sm">Speed:</label>
            <input
              type="range"
              min={100}
              max={1000}
              step={100}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={isRunning}
              className="w-32"
            />
            <span className="text-gray-600 text-sm">{speed}ms</span>
          </div>
        </Card>

        {/* Pseudocode & C++ */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-3">Pseudocode</h3>
            <pre className="font-mono text-sm bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`function Dijkstra(Graph, source):
    dist[source] = 0
    for each vertex v ≠ source:
        dist[v] = ∞
    create priority queue Q with all vertices

    while Q is not empty:
        u = vertex in Q with smallest dist[u]
        remove u from Q

        for each neighbor v of u:
            alt = dist[u] + length(u, v)
            if alt < dist[v]:
                dist[v] = alt`}
            </pre>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-3">C++ Implementation</h3>
            <pre className="font-mono text-sm bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`#include <iostream>
#include <vector>
#include <limits>
using namespace std;

int main() {
    int n = 5;
    vector<int> dist(n, INT_MAX);
    dist[0] = 0;
    vector<vector<pair<int,int>>> adj(n);
    adj[0].push_back({1,2});
    adj[0].push_back({2,4});
    adj[1].push_back({2,1});
    adj[1].push_back({3,7});
    adj[2].push_back({4,3});
    adj[3].push_back({4,1});

    vector<bool> visited(n,false);

    for(int i=0;i<n;i++){
        int u = -1;
        for(int j=0;j<n;j++){
            if(!visited[j] && (u==-1 || dist[j]<dist[u]))
                u = j;
        }
        if(dist[u]==INT_MAX) break;
        visited[u] = true;
        for(auto e: adj[u]){
            int v = e.first, w = e.second;
            if(!visited[v] && dist[u]+w < dist[v])
                dist[v] = dist[u]+w;
        }
    }

    for(int i=0;i<n;i++)
        cout << "Node " << i << ": " << dist[i] << endl;
    return 0;
}`}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DijkstraVisualizer;
