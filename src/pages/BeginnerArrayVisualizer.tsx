import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Repeat } from "lucide-react"; // Use Repeat instead of Swap

interface ArrayElement {
  value: number;
  color: string;
}

const BeginnerArrayVisualizer = () => {
  const initialArray: number[] = [5, 3, 8, 1, 6];
  const [array, setArray] = useState<ArrayElement[]>(
    initialArray.map((num) => ({ value: num, color: "#3B82F6" })) // Blue
  );
  const [message, setMessage] = useState("");

  // Function to swap elements with animation
  const swapElements = (i: number, j: number) => {
    const arrCopy = [...array];

    // Highlight elements being swapped
    arrCopy[i].color = "#F87171"; // Red
    arrCopy[j].color = "#F87171";
    setArray([...arrCopy]);
    setMessage(`Swapping index ${i} and ${j}`);

    // Wait for highlight animation
    setTimeout(() => {
      [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];

      // Change color to green to indicate successful swap
      arrCopy[i].color = "#10B981"; // Green
      arrCopy[j].color = "#10B981";
      setArray([...arrCopy]);
      setMessage(`Swapped index ${i} and ${j}`);

      // Reset color back to blue after short delay
      setTimeout(() => {
        setArray(arrCopy.map((el) => ({ ...el, color: "#3B82F6" })));
        setMessage("");
      }, 500);
    }, 500);
  };

  return (
    <div className="min-h-screen px-8 py-12 bg-gray-50">
      {/* Back Button */}
      <Link to="/levels/beginner">
        <Button variant="ghost" className="mb-8 flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Beginner
        </Button>
      </Link>

      <h1 className="text-3xl font-bold mb-4 text-gray-800">Array Basics Visualizer</h1>
      <p className="mb-6 text-gray-600">
        This visualization shows a simple array. Click the buttons to swap elements and watch the animation.
      </p>

      {/* Array Visualization */}
      <Card className="p-6 mb-6">
        <div className="flex gap-4 justify-center items-end mb-6 h-64">
          {array.map((el, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-end rounded-t-lg shadow-lg transition-all duration-500"
              style={{
                width: 50,
                height: `${el.value * 20}px`,
                backgroundColor: el.color,
              }}
            >
              <span className="text-white font-bold mt-1">{el.value}</span>
            </div>
          ))}
        </div>

        {/* Swap Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {array.length >= 2 && (
            <Button
              onClick={() => swapElements(0, 1)}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Repeat className="h-4 w-4" /> Swap 0 & 1
            </Button>
          )}
          {array.length >= 5 && (
            <Button
              onClick={() => swapElements(2, 4)}
              className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white"
            >
              <Repeat className="h-4 w-4" /> Swap 2 & 4
            </Button>
          )}
        </div>

        {message && <p className="text-center text-gray-700 font-medium">{message}</p>}
      </Card>

      {/* Pseudocode / C++ Example */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-3">C++ Example / Pseudocode</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`// Simple array example in C++
#include <iostream>
using namespace std;

int main() {
    int arr[5] = {5, 3, 8, 1, 6};
    
    // Print original array
    for(int i=0; i<5; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    // Swap first two elements
    int temp = arr[0];
    arr[0] = arr[1];
    arr[1] = temp;

    // Print array after swap
    for(int i=0; i<5; i++) {
        cout << arr[i] << " ";
    }
    return 0;
}`}
        </pre>
      </Card>
    </div>
  );
};

export default BeginnerArrayVisualizer;
