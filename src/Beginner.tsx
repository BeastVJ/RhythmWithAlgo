import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const beginnerAlgorithms = [
  { id: "array", title: "Array Basics" },
  { id: "bubble-sort", title: "Bubble Sort" },
  { id: "swap-numbers", title: "Swap Numbers" },
  { id: "loops", title: "Loops & Iteration" },
  { id: "conditionals", title: "If-Else Logic" },
];

const Beginner = () => {
  return (
    <div className="min-h-screen px-8 py-12 bg-beginner-bg">
      <h1 className="text-4xl font-bold mb-6 text-beginner-primary">Beginner Level</h1>
      <p className="mb-8 text-beginner-text/80">
        Start learning the basics of programming with these simple algorithm visualizations:
      </p>

      <div className="flex flex-col gap-4">
        {beginnerAlgorithms.map((algo) => (
          <Link key={algo.id} to={`/visualize/beginner/${algo.id}`}>
            <Button className="w-full bg-beginner-primary hover:bg-beginner-primary/90 text-white">
              {algo.title}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Beginner;
