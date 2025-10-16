import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Square, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Bar {
  value: number;
  color: string;
}

const QuickSortVisualizer = () => {
  const [array, setArray] = useState<Bar[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(400);
  const [comparisons, setComparisons] = useState(0);
  const stopRef = useRef(false);

  useEffect(() => {
    generateArray();
  }, []);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateArray = () => {
    const arr = Array.from({ length: 12 }, () => ({
      value: Math.floor(Math.random() * 100) + 10,
      color: "hsl(var(--primary))",
    }));
    setArray(arr);
    setComparisons(0);
    stopRef.current = false;
    setIsSorting(false);
  };

  const stopSorting = () => {
    stopRef.current = true;
    setIsSorting(false);
  };

  const partition = async (arr: Bar[], low: number, high: number) => {
    let pivot = arr[high];
    pivot.color = "hsl(var(--accent))";
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (stopRef.current) return i;
      arr[j].color = "hsl(var(--secondary))";
      setArray([...arr]);
      await sleep(speed);
      setComparisons((c) => c + 1);

      if (arr[j].value < pivot.value) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }

      arr[j].color = "hsl(var(--primary))";
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await sleep(speed);
    return i + 1;
  };

  const quickSort = async (arr: Bar[], low: number, high: number) => {
    if (stopRef.current) return;
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };

  const handleSort = async () => {
    setIsSorting(true);
    stopRef.current = false;
    const arrCopy = [...array];
    await quickSort(arrCopy, 0, arrCopy.length - 1);
    if (!stopRef.current) {
      arrCopy.forEach((b) => (b.color = "hsl(var(--accent))"));
      setArray([...arrCopy]);
    }
    setIsSorting(false);
  };

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <Link to="/levels/intermediate">
          <Button variant="ghost" className="mb-6 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </Link>

        <h1 className="text-4xl font-bold text-center mb-4 text-blue-400">
          Quick Sort Visualizer
        </h1>
        <p className="text-center mb-8 text-gray-400">
          A divide-and-conquer algorithm that selects a pivot and partitions the array.
        </p>

        {/* Visualization */}
        <Card className="bg-gray-900 border-gray-700 p-6 mb-6">
          <div className="flex justify-center items-end h-80 gap-2">
            {array.map((bar, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className="w-5 rounded-t-lg transition-all duration-300"
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
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex gap-3">
              <Button
                onClick={handleSort}
                disabled={isSorting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSorting ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" /> Running...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" /> Start
                  </>
                )}
              </Button>
              <Button
                onClick={generateArray}
                disabled={isSorting}
                className="border border-blue-500 text-blue-400"
                variant="outline"
              >
                <RotateCcw className="mr-2 h-4 w-4" /> New Array
              </Button>
              <Button
                onClick={stopSorting}
                disabled={!isSorting}
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
                disabled={isSorting}
                className="w-32"
              />
              <span className="text-sm text-gray-400">{speed}ms</span>
            </div>
          </div>
        </Card>

        {/* Info Section */}
        <Card className="bg-gray-900 border-gray-700 p-6">
          <h3 className="text-lg font-bold mb-2 text-blue-300">Pseudocode</h3>
          <pre className="text-sm font-mono bg-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto">
{`function quickSort(arr, low, high):
  if low < high:
    pivotIndex = partition(arr, low, high)
    quickSort(arr, low, pivotIndex - 1)
    quickSort(arr, pivotIndex + 1, high)

function partition(arr, low, high):
  pivot = arr[high]
  i = low - 1
  for j = low to high - 1:
    if arr[j] < pivot:
      i++
      swap(arr[i], arr[j])
  swap(arr[i + 1], arr[high])
  return i + 1`}
          </pre>

          <div className="mt-4 text-gray-400">
            <p><strong>Time Complexity:</strong> O(n log n) average, O(n²) worst</p>
            <p><strong>Space Complexity:</strong> O(log n)</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QuickSortVisualizer;
