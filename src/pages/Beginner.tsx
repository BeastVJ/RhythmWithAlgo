import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, BookOpen } from "lucide-react";

const algorithms = [
  {
    id: "array-basics",
    title: "Array Basics",
    description: "Learn how arrays store and access elements in memory",
    difficulty: "Easy",
    time: "5 min",
  },
  {
    id: "swap-numbers",
    title: "Swapping Numbers",
    description: "Understand the fundamental swap operation with visual animations",
    difficulty: "Easy",
    time: "3 min",
  },
  {
    id: "loops",
    title: "Loops & Iteration",
    description: "See how loops work with step-by-step visualization",
    difficulty: "Easy",
    time: "7 min",
  },
  {
    id: "conditionals",
    title: "If-Else Logic",
    description: "Visualize decision-making in code with branching paths",
    difficulty: "Easy",
    time: "6 min",
  },
];

const resources = [
  { title: "Understanding Arrays", url: "https://www.geeksforgeeks.org/arrays-in-c-cpp/" },
  { title: "Variables & Data Types", url: "https://www.programiz.com/c-programming/c-variables-constants" },
  { title: "Loops Explained", url: "https://www.tutorialspoint.com/cprogramming/c_loops.htm" },
  { title: "Logic Building Guide", url: "https://www.freecodecamp.org/news/how-to-think-like-a-programmer/" },
];

const Beginner = () => {
  return (
    <div className="min-h-screen px-8 py-12 bg-gray-50">
      {/* Back Button */}
      <Link to="/levels">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Levels
        </Button>
      </Link>

      {/* Header */}
      <h1 className="text-4xl font-bold mb-6 text-center">Beginner Level</h1>
      <p className="mb-12 text-center text-gray-600 max-w-2xl mx-auto">
        Start your coding adventure with these beginner-friendly visualizations
      </p>

      {/* Algorithms Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {algorithms.map((algo) => (
          <Card key={algo.id} className="p-6 border hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{algo.title}</h2>
              <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">{algo.difficulty}</span>
            </div>
            <p className="text-gray-600 mb-4">{algo.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{algo.time}</span>
              <Link to={`/visualize/beginner/${algo.id}`}>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Play className="mr-2 h-4 w-4" />
                  Visualize
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Learning Resources */}
      <Card className="p-6 border rounded-xl">
        <div className="flex items-center mb-4">
          <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
          <h2 className="font-bold text-lg">Learn More</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {resources.map((res, idx) => (
            <a key={idx} href={res.url} target="_blank" rel="noopener noreferrer" className="p-4 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
              {res.title}
            </a>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Beginner;
