import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Pause, RotateCcw, Square } from "lucide-react";

interface ArrayBar {
  value: number;
  color: string;
}

const MergeSortVisualizer = () => {
  const [array, setArray] = useState<ArrayBar[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [speed, setSpeed] = useState(400);
  const [inputValues, setInputValues] = useState<string>("");
  const stopRef = useRef(false);

  useEffect(() => {
    generateArray();
  }, []);

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const generateArray = () => {
    const arr = Array.from({ length: 10 }, () => ({
      value: Math.floor(Math.random() * 100) + 10,
      color: "hsl(var(--intermediate-primary))",
    }));
    setArray(arr);
    setComparisons(0);
    setIsSorting(false);
    stopRef.current = false;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValues(e.target.value);
  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const nums = inputValues
        .split(",")
        .map((n) => parseInt(n.trim()))
        .filter((n) => !isNaN(n));
      setArray(nums.map((v) => ({ value: v, color: "hsl(var(--intermediate-primary))" })));
    }
  };

  const stopSorting = () => {
    stopRef.current = true;
    setIsSorting(false);
  };

  const mergeSort = async (arr: ArrayBar[], start = 0, end = arr.length - 1): Promise<ArrayBar[]> => {
    if (stopRef.current) return arr;
    if (start >= end) return [arr[start]];

    const mid = Math.floor((start + end) / 2);
    const left = await mergeSort(arr, start, mid);
    const right = await mergeSort(arr, mid + 1, end);

    return await merge(left, right);
  };

  const merge = async (left: ArrayBar[], right: ArrayBar[]) => {
    let result: ArrayBar[] = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      if (stopRef.current) return result;

      left[i].color = right[j].color = "hsl(var(--intermediate-accent))";
      setArray([...left, ...right]);
      await sleep(speed);
      setComparisons((c) => c + 1);

      if (left[i].value < right[j].value) result.push(left[i++]);
      else result.push(right[j++]);
    }

    while (i < left.length) result.push(left[i++]);
    while (j < right.length) result.push(right[j++]);

    result.forEach((b) => (b.color = "hsl(var(--intermediate-primary))"));
    return result;
  };

  const handleSort = async () => {
    setIsSorting(true);
    stopRef.current = false;
    const sorted = await mergeSort([...array]);
    if (!stopRef.current) {
      sorted.forEach((bar) => (bar.color = "hsl(var(--intermediate-accent))"));
      setArray(sorted);
    }
    setIsSorting(false);
  };

  return (
    <div className="min-h-screen" style={{ background: `hsl(var(--intermediate-bg))` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/levels/intermediate">
          <Button variant="ghost" className="mb-8 text-intermediate-text">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Intermediate
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-3 text-intermediate-primary">Merge Sort</h1>
        <p className="text-lg text-intermediate-text/70 mb-6">
          Divide and conquer: recursively split and merge sorted subarrays.
        </p>

        {/* Input */}
        <Card className="bg-intermediate-card border-2 border-intermediate-primary/20 p-6 mb-6">
          <label className="block mb-2 text-intermediate-text/80 font-medium">
            Enter numbers separated by commas:
          </label>
          <input
            type="text"
            value={inputValues}
            onChange={handleInputChange}
            onKeyDown={handleInputSubmit}
            disabled={isSorting}
            placeholder="e.g. 10, 45, 23, 67"
            className="w-full p-3 rounded-lg bg-intermediate-primary/10 text-intermediate-text border border-intermediate-primary/30"
          />
        </Card>

        {/* Visualization */}
        <Card className="bg-intermediate-card border-2 border-intermediate-primary/20 p-8 mb-6">
          <div className="flex items-end justify-center h-80 gap-2">
            {array.map((bar, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div
                  className="w-full rounded-t-lg transition-all duration-300 shadow-lg"
                  style={{
                    height: `${bar.value * 2.5}px`,
                    backgroundColor: bar.color,
                  }}
                />
                <span className="text-xs text-intermediate-text/70 font-mono">{bar.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Controls */}
        <Card className="bg-intermediate-card border-2 border-intermediate-primary/20 p-6 mb-6">
          <div className="flex gap-3 flex-wrap justify-between items-center">
            <div className="flex gap-3">
              <Button
                onClick={handleSort}
                disabled={isSorting}
                className="bg-intermediate-primary hover:bg-intermediate-primary/90 text-white"
              >
                {isSorting ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                {isSorting ? "Running..." : "Start"}
              </Button>
              <Button
                onClick={generateArray}
                disabled={isSorting}
                variant="outline"
                className="border-intermediate-primary text-intermediate-primary"
              >
                <RotateCcw className="mr-2 h-4 w-4" /> New Array
              </Button>
              <Button
                onClick={stopSorting}
                disabled={!isSorting}
                variant="destructive"
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Square className="mr-2 h-4 w-4" /> Stop
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm text-intermediate-text/70">Speed:</label>
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
              <span className="text-sm text-intermediate-text/70">{speed}ms</span>
            </div>
          </div>
        </Card>

        {/* Pseudocode */}
        <Card className="bg-intermediate-card border-2 border-intermediate-primary/20 p-6">
          <h3 className="text-lg font-bold mb-4 text-intermediate-text">Pseudocode</h3>
          <pre className="text-sm font-mono text-intermediate-text/80 bg-intermediate-primary/5 p-4 rounded-lg overflow-x-auto">
{`function mergeSort(arr):
  if length(arr) <= 1:
    return arr
  mid = length(arr) / 2
  left = mergeSort(arr[0:mid])
  right = mergeSort(arr[mid:])
  return merge(left, right)`}
          </pre>
        </Card>
      </div>
    </div>
  );
};

export default MergeSortVisualizer;
