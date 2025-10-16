import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Square, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Bar {
  value: number;
  color: string;
}

const LinearSearchVisualizer = () => {
  const [array, setArray] = useState<Bar[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [speed, setSpeed] = useState(400);
  const [target, setTarget] = useState<number | null>(null);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const stopRef = useRef(false);

  useEffect(() => {
    generateArray();
  }, []);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateArray = () => {
    const arr = Array.from({ length: 10 }, () => ({
      value: Math.floor(Math.random() * 90) + 10,
      color: "hsl(var(--primary))",
    }));
    setArray(arr);
    setIsSearching(false);
    setTarget(null);
    setFoundIndex(null);
    stopRef.current = false;
  };

  const stopSearch = () => {
    stopRef.current = true;
    setIsSearching(false);
  };

  const handleSearch = async () => {
    if (target === null) return;
    setIsSearching(true);
    stopRef.current = false;
    setFoundIndex(null);

    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      if (stopRef.current) break;
      arr[i].color = "yellow";
      setArray([...arr]);
      await sleep(speed);

      if (arr[i].value === target) {
        arr[i].color = "limegreen";
        setArray([...arr]);
        setFoundIndex(i);
        break;
      } else {
        arr[i].color = "red";
      }
      await sleep(speed / 1.5);
    }

    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <Link to="/levels/intermediate">
          <Button variant="ghost" className="mb-6 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </Link>

        <h1 className="text-4xl font-bold text-center mb-4 text-yellow-400">
          Linear Search Visualizer
        </h1>
        <p className="text-center mb-8 text-gray-400">
          Sequentially checks every element until the target is found.
        </p>

        {/* Visualization */}
        <Card className="bg-gray-900 border-gray-700 p-6 mb-6">
          <div className="flex justify-center items-end h-80 gap-3">
            {array.map((bar, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className="w-8 rounded-t-lg transition-all duration-300"
                  style={{
                    height: `${bar.value * 2}px`,
                    backgroundColor: bar.color,
                  }}
                />
                <span className="text-xs mt-1 text-gray-300">{bar.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Controls */}
        <Card className="bg-gray-900 border-gray-700 p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex gap-3">
              <Button
                onClick={handleSearch}
                disabled={isSearching || target === null}
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                {isSearching ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" /> Searching...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" /> Start
                  </>
                )}
              </Button>

              <Button
                onClick={generateArray}
                disabled={isSearching}
                className="border border-yellow-400 text-yellow-400"
                variant="outline"
              >
                <RotateCcw className="mr-2 h-4 w-4" /> New Array
              </Button>

              <Button
                onClick={stopSearch}
                disabled={!isSearching}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Square className="mr-2 h-4 w-4" /> Stop
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-300">Speed:</label>
              <input
                type="range"
                min="100"
                max="1000"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                disabled={isSearching}
                className="w-32"
              />
              <span className="text-sm text-gray-400">{speed}ms</span>
            </div>
          </div>

          {/* Target Input */}
          <div className="mt-6 flex justify-center gap-3">
            <input
              type="number"
              placeholder="Enter target"
              value={target ?? ""}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="w-32 p-2 rounded-lg text-black text-center"
              disabled={isSearching}
            />
            {foundIndex !== null && (
              <p className="text-green-400 mt-2">
                ✅ Found at index {foundIndex}
              </p>
            )}
          </div>
        </Card>

        {/* Pseudocode */}
        <Card className="bg-gray-900 border-gray-700 p-6">
          <h3 className="text-lg font-bold mb-2 text-yellow-300">Pseudocode</h3>
          <pre className="text-sm font-mono bg-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto">
{`function linearSearch(arr, target):
  for i = 0 to arr.length - 1:
    if arr[i] == target:
      return i
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

export default LinearSearchVisualizer;
