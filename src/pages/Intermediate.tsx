import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, BookOpen, Clock } from "lucide-react";

const algorithms = [
  {
    id: "bubble-sort",
    title: "Bubble Sort",
    description: "Watch elements bubble to their correct positions through comparisons.",
    complexity: "O(n²)",
    difficulty: "Medium",
    time: "10 min",
  },
  {
    id: "selection-sort",
    title: "Selection Sort",
    description: "Select the smallest element and place it in the correct position iteratively.",
    complexity: "O(n²)",
    difficulty: "Medium",
    time: "9 min",
  },
  {
    id: "insertion-sort",
    title: "Insertion Sort",
    description: "Build the sorted array one item at a time by inserting elements at the correct position.",
    complexity: "O(n²)",
    difficulty: "Medium",
    time: "8 min",
  },
  {
    id: "merge-sort",
    title: "Merge Sort",
    description: "Divide and conquer — recursively split and merge arrays in sorted order.",
    complexity: "O(n log n)",
    difficulty: "Hard",
    time: "12 min",
  },
  {
    id: "quick-sort",
    title: "Quick Sort",
    description: "Partition-based sorting — place elements relative to a pivot efficiently.",
    complexity: "O(n log n)",
    difficulty: "Hard",
    time: "12 min",
  },
  {
    id: "linear-search",
    title: "Linear Search",
    description: "Search through elements one by one to find your target.",
    complexity: "O(n)",
    difficulty: "Easy",
    time: "6 min",
  },
  {
    id: "binary-search",
    title: "Binary Search",
    description: "Efficiently find elements by dividing the search space in half.",
    complexity: "O(log n)",
    difficulty: "Medium",
    time: "8 min",
  },
  {
    id: "jump-search",
    title: "Jump Search",
    description: "Skip ahead fixed steps and perform a linear search in the identified block.",
    complexity: "O(√n)",
    difficulty: "Medium",
    time: "7 min",
  },
  {
    id: "interpolation-search",
    title: "Interpolation Search",
    description: "An improved variant of binary search that estimates the position of the element.",
    complexity: "O(log log n)",
    difficulty: "Medium",
    time: "7 min",
  },
  {
    id: "linked-list",
    title: "Linked List Operations",
    description: "Visualize insertion, deletion, and traversal in linked lists.",
    complexity: "O(n)",
    difficulty: "Medium",
    time: "12 min",
  },
];

const resources = [
  {
    title: "Striver's CP Sheet",
    url: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/",
  },
  {
    title: "LeetCode Blind 75",
    url: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions",
  },
  {
    title: "Big O Notation Guide",
    url: "https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/",
  },
  {
    title: "DSA Problem-Solving Tips",
    url: "https://www.geeksforgeeks.org/how-to-start-learning-dsa/",
  },
];

const Intermediate = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link to="/levels">
          <Button variant="ghost" className="mb-8 text-gray-200">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Levels
          </Button>
        </Link>

        {/* Title Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-blue-400">
            Intermediate Level
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Master core DSA concepts with structured, step-by-step algorithm visualizations.
          </p>
        </div>

        {/* Algorithms Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Core Algorithms</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {algorithms.map((algo, index) => (
              <Card
                key={algo.id}
                className="bg-gray-900 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1" />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{algo.title}</h3>
                      <span className="text-sm font-mono text-blue-400">
                        {algo.complexity}
                      </span>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        algo.difficulty === "Easy"
                          ? "bg-green-500/20 text-green-400"
                          : algo.difficulty === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {algo.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">{algo.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" /> {algo.time}
                    </div>
                    <Link to={`/visualize/intermediate/${algo.id}`}>
                      <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                      >
                        <Play className="mr-2 h-4 w-4" /> Visualize
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Learning Resources */}
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 shadow-lg">
          <div className="flex items-center mb-6">
            <BookOpen className="h-6 w-6 text-blue-400 mr-3" />
            <h2 className="text-2xl font-bold text-white">Enhance Your Skills</h2>
          </div>
          <p className="text-gray-400 mb-6">
            Curated resources to level up your problem-solving abilities:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl hover:from-blue-500/20 hover:to-indigo-500/20 transition-all border border-blue-500/20 group"
              >
                <span className="text-2xl mr-3">📖</span>
                <span className="text-gray-200 group-hover:text-blue-400 transition-colors font-medium">
                  {resource.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intermediate;
