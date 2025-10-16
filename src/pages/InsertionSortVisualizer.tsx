import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Pause, RotateCcw, Square } from "lucide-react";

interface ArrayBar {
  value: number;
  color: string;
}

const InsertionSortVisualizer = () => {
  const [array, setArray] = useState<ArrayBar[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [speed, setSpeed] = useState(500);
  const [inputValues, setInputValues] = useState<string>("");
  const stopRef = useRef(false);

  useEffect(() => {
    generateArray();
  }, []);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateArray = () => {
    const newArray: ArrayBar[] = [];
    for (let i = 0; i < 10; i++) {
      newArray.push({ value: Math.floor(Math.random() * 100) + 10, color: "hsl(var(--intermediate-primary))" });
    }
    setArray(newArray);
    setComparisons(0);
    setSwaps(0);
    setIsSorting(false);
    stopRef.current = false;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValues(e.target.value);

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const numbers = inputValues.split(",").map((num) => parseInt(num.trim())).filter((num) => !isNaN(num));
      if (numbers.length > 0) {
        const customArray = numbers.map((value) => ({ value, color: "hsl(var(--intermediate-primary))" }));
        setArray(customArray);
        setComparisons(0);
        setSwaps(0);
        stopRef.current = false;
      }
    }
  };

  const stopSorting = () => {
    stopRef.current = true;
    setIsSorting(false);
  };

  const insertionSort = async () => {
    setIsSorting(true);
    stopRef.current = false;
    const arr = [...array];
    let totalComparisons = 0;
    let totalSwaps = 0;

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i].value;
      let j = i - 1;

      arr[i].color = "hsl(var(--intermediate-accent))";
      setArray([...arr]);
      await sleep(speed);

      while (j >= 0 && arr[j].value > key) {
        if (stopRef.current) {
          setIsSorting(false);
          return;
        }

        arr[j].color = "hsl(var(--intermediate-accent))";
        arr[j + 1].value = arr[j].value;
        setArray([...arr]);
        await sleep(speed);

        arr[j].color = "hsl(var(--intermediate-primary))";
        totalComparisons++;
        totalSwaps++;
        setComparisons(totalComparisons);
        setSwaps(totalSwaps);

        j--;
      }

      arr[j + 1].value = key;
      arr[i].color = "hsl(var(--intermediate-primary))";
      setArray([...arr]);
      await sleep(speed);
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

        <h1 className="text-4xl font-bold mb-4 text-intermediate-primary">Insertion Sort</h1>
        <p className="text-lg text-intermediate-text/70 mb-6">
          Watch elements "insert" themselves into the correct position in the sorted part of the array.
        </p>

        {/* Input */}
        <Card className="bg-intermediate-card border-2 border-intermediate-primary/20 p-6 mb-6">
          <input
            type="text"
            placeholder="Enter numbers separated by commas"
            value={inputValues}
            onChange={handleInputChange}
            onKeyDown={handleInputSubmit}
            disabled={isSorting}
            className="w-full p-3 rounded-lg bg-intermediate-primary/10 text-intermediate-text border border-intermediate-primary/30 focus:outline-none focus:ring-2 focus:ring-intermediate-primary"
          />
        </Card>

        {/* Array Visualization */}
        <Card className="bg-intermediate-card border-2 border-intermediate-primary/20 p-8 mb-6">
          <div className="flex items-end justify-center h-80 gap-2">
            {array.map((bar, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-full rounded-t-lg transition-all duration-300 shadow-lg"
                  style={{ height: `${bar.value * 2.5}px`, backgroundColor: bar.color }}
                />
                <span className="text-xs font-mono text-intermediate-text/70">{bar.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Controls */}
        <Card className="bg-intermediate-card border-2 border-intermediate-primary/20 p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-3">
              <Button onClick={insertionSort} disabled={isSorting} className="bg-intermediate-primary text-white">
                {isSorting ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                {isSorting ? "Running..." : "Start"}
              </Button>
              <Button onClick={generateArray} disabled={isSorting} variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" /> New Array
              </Button>
              <Button onClick={stopSorting} disabled={!isSorting} variant="destructive">
                <Square className="mr-2 h-4 w-4" /> Stop
              </Button>
            </div>
            <div className="flex items-center gap-4">
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

        {/* Statistics */}
        <Card className="bg-intermediate-card border-2 border-intermediate-primary/20 p-6">
          <h3 className="text-lg font-bold mb-4 text-intermediate-text">Statistics</h3>
          <div className="flex justify-between text-intermediate-text/70 mb-2">
            <span>Comparisons:</span>
            <span>{comparisons}</span>
          </div>
          <div className="flex justify-between text-intermediate-text/70 mb-2">
            <span>Swaps:</span>
            <span>{swaps}</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InsertionSortVisualizer;
