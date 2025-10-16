import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Pause, RotateCcw, Square } from "lucide-react";

interface Edge {
  from: number;
  to: number;
  weight: number;
  inMST: boolean;
}

// Simple 5-node graph for visualization
const initialEdges: Edge[] = [
  { from: 0, to: 1, weight: 2, inMST: false },
  { from: 0, to: 2, weight: 4, inMST: false },
  { from: 1, to: 2, weight: 1, inMST: false },
  { from: 1, to: 3, weight: 7, inMST: false },
  { from: 2, to: 4, weight: 3, inMST: false },
  { from: 3, to: 4, weight: 1, inMST: false },
];

const KruskalVisualizer = () => {
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const stopRef = useRef(false);

  useEffect(() => {
    resetEdges();
  }, []);

  const resetEdges = () => {
    setEdges(initialEdges.map(e => ({ ...e, inMST: false })));
    setIsRunning(false);
    stopRef.current = false;
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Union-Find helpers
  const find = (parent: number[], i: number) => {
    if (parent[i] === i) return i;
    return find(parent, parent[i]);
  };

  const union = (parent: number[], rank: number[], x: number, y: number) => {
    const xroot = find(parent, x);
    const yroot = find(parent, y);

    if (rank[xroot] < rank[yroot]) parent[xroot] = yroot;
    else if (rank[xroot] > rank[yroot]) parent[yroot] = xroot;
    else {
      parent[yroot] = xroot;
      rank[xroot]++;
    }
  };

  const runKruskal = async () => {
    setIsRunning(true);
    stopRef.current = false;

    const n = 5;
    const sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);
    const parent = Array(n).fill(0).map((_, i) => i);
    const rank = Array(n).fill(0);

    const newEdges = [...edges];

    for (let e of sortedEdges) {
      if (stopRef.current) break;

      const x = find(parent, e.from);
      const y = find(parent, e.to);

      if (x !== y) {
        union(parent, rank, x, y);

        // Mark edge as part of MST
        const idx = newEdges.findIndex(
          edge => edge.from === e.from && edge.to === e.to
        );
        newEdges[idx].inMST = true;
        setEdges([...newEdges]);
        await sleep(speed);
      }
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
          <h1 className="text-4xl font-bold mb-3 text-gray-800">Kruskal's MST</h1>
          <p className="text-lg text-gray-600">
            Visualize MST construction by picking edges with minimum weight.
          </p>
        </div>

        {/* Edges Visualization */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col gap-4">
            {edges.map((edge, idx) => (
              <div
                key={idx}
                className={`flex justify-between p-3 rounded shadow-md transition-colors ${
                  edge.inMST ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                }`}
              >
                <span>Edge {edge.from} → {edge.to}</span>
                <span>Weight: {edge.weight}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Controls */}
        <Card className="p-6 mb-6 flex flex-wrap items-center gap-4">
          <Button
            onClick={runKruskal}
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
            onClick={resetEdges}
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
{`function Kruskal(Graph):
    MST = {}
    sort edges by weight
    for each edge (u,v) in sorted edges:
        if adding (u,v) does not create a cycle:
            add (u,v) to MST
    return MST`}
            </pre>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-3">C++ Implementation</h3>
            <pre className="font-mono text-sm bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Edge { int from, to, weight; };

int find(int parent[], int i) {
    if(parent[i] == i) return i;
    return find(parent, parent[i]);
}

void unionSet(int parent[], int rank[], int x, int y) {
    int xroot = find(parent,x);
    int yroot = find(parent,y);
    if(rank[xroot] < rank[yroot]) parent[xroot] = yroot;
    else if(rank[xroot] > rank[yroot]) parent[yroot] = xroot;
    else { parent[yroot] = xroot; rank[xroot]++; }
}

int main() {
    int n = 5;
    vector<Edge> edges = {{0,1,2},{0,2,4},{1,2,1},{1,3,7},{2,4,3},{3,4,1}};
    sort(edges.begin(), edges.end(), [](Edge a, Edge b){ return a.weight < b.weight; });

    int parent[n], rank[n] = {0};
    for(int i=0;i<n;i++) parent[i] = i;

    for(auto e: edges){
        int x = find(parent,e.from);
        int y = find(parent,e.to);
        if(x != y){
            cout << "Edge " << e.from << "->" << e.to << " in MST\\n";
            unionSet(parent, rank, x, y);
        }
    }
    return 0;
}`}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KruskalVisualizer;
