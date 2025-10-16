import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Square, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Node {
  value: number;
  color: string;
}

const LinkedListVisualizer = () => {
  const [list, setList] = useState<Node[]>([]);
  const [inputValue, setInputValue] = useState<number | "">("");
  const [isRunning, setIsRunning] = useState(false);
  const [searchValue, setSearchValue] = useState<number | "">("");
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const stopRef = useRef(false);
  const [speed, setSpeed] = useState(400);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateList = () => {
    setList([]);
    setInputValue("");
    setSearchValue("");
    setFoundIndex(null);
    setIsRunning(false);
    stopRef.current = false;
  };

  const stopOperation = () => {
    stopRef.current = true;
    setIsRunning(false);
  };

  const addNode = () => {
    if (inputValue === "") return;
    setList([...list, { value: Number(inputValue), color: "hsl(var(--primary))" }]);
    setInputValue("");
  };

  const deleteNode = (index: number) => {
    setList(list.filter((_, idx) => idx !== index));
  };

  const searchNode = async () => {
    if (searchValue === "") return;
    setIsRunning(true);
    stopRef.current = false;
    setFoundIndex(null);

    const tempList = [...list];

    for (let i = 0; i < tempList.length; i++) {
      if (stopRef.current) break;

      tempList.forEach((node, idx) => (node.color = idx === i ? "orange" : "hsl(var(--primary))"));
      setList([...tempList]);
      await sleep(speed);

      if (tempList[i].value === Number(searchValue)) {
        tempList[i].color = "limegreen";
        setList([...tempList]);
        setFoundIndex(i);
        break;
      }
    }

    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <Link to="/levels/intermediate">
          <Button variant="ghost" className="mb-6 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </Link>

        <h1 className="text-4xl font-bold text-center mb-4 text-purple-400">
          Linked List Visualizer
        </h1>
        <p className="text-center mb-8 text-gray-400">
          Visualize insertion, deletion, and searching in a singly linked list.
        </p>

        {/* Visualization */}
        <Card className="bg-gray-900 border-gray-700 p-6 mb-6">
          <div className="flex justify-center items-end h-40 gap-6 flex-wrap">
            {list.map((node, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center font-bold transition-all duration-300"
                  style={{ backgroundColor: node.color }}
                >
                  {node.value}
                </div>
                <div className="flex gap-2 mt-1">
                  {idx < list.length - 1 && <span className="text-purple-400">→</span>}
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteNode(idx)}
                  className="mt-2 text-xs"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Controls */}
        <Card className="bg-gray-900 border-gray-700 p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            {/* Add Node */}
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-24 p-2 rounded-lg text-black text-center"
                disabled={isRunning}
              />
              <Button onClick={addNode} disabled={isRunning} className="bg-purple-500 hover:bg-purple-600">
                Add Node
              </Button>
            </div>

            {/* Search Node */}
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-24 p-2 rounded-lg text-black text-center"
                disabled={isRunning}
              />
              <Button onClick={searchNode} disabled={isRunning || searchValue === ""} className="bg-green-500 hover:bg-green-600">
                {isRunning ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" /> Searching...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" /> Search
                  </>
                )}
              </Button>
              <Button onClick={stopOperation} disabled={!isRunning} className="bg-red-600 hover:bg-red-700">
                <Square className="mr-2 h-4 w-4" /> Stop
              </Button>
            </div>

            {/* Speed Control */}
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-300">Speed:</label>
              <input
                type="range"
                min="100"
                max="1000"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                disabled={isRunning}
                className="w-32"
              />
              <span className="text-sm text-gray-400">{speed}ms</span>
            </div>
          </div>

          {/* Result */}
          {foundIndex !== null && (
            <p className="mt-4 text-green-400 text-center">
              ✅ Found node at index {foundIndex}
            </p>
          )}
        </Card>

        {/* Pseudocode */}
        <Card className="bg-gray-900 border-gray-700 p-6">
          <h3 className="text-lg font-bold mb-2 text-purple-300">Pseudocode (Search)</h3>
          <pre className="text-sm font-mono bg-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto">
{`function searchLinkedList(head, target):
  current = head
  index = 0
  while current != null:
    if current.value == target:
      return index
    current = current.next
    index += 1
  return -1`}
          </pre>
          <div className="mt-4 text-gray-400">
            <p><strong>Time Complexity:</strong> O(n)</p>
            <p><strong>Space Complexity:</strong> O(1)</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
