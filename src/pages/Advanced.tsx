import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, BookOpen, Zap } from "lucide-react";

const algorithms = [
  {
    id: "dijkstra",
    title: "Dijkstra's Algorithm",
    description: "Find the shortest path in weighted graphs with dynamic visualization",
    complexity: "O((V + E) log V)",
    difficulty: "Hard",
    time: "15 min",
  },
  {
    id: "kruskal",
    title: "Kruskal's MST",
    description: "Build minimum spanning trees with edge-by-edge union-find operations",
    complexity: "O(E log E)",
    difficulty: "Hard",
    time: "12 min",
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    description: "Master memoization and optimal substructure with classic DP problems",
    complexity: "Varies",
    difficulty: "Expert",
    time: "20 min",
  },
  {
    id: "graph-traversal",
    title: "DFS",
    description: "Explore graph traversal strategies with animated node visits",
    complexity: "O(V + E)",
    difficulty: "Hard",
    time: "10 min",
  },
];

const resources = [
  { title: "Codeforces Contest Archive", url: "https://codeforces.com/contests" },
  { title: "LeetCode Weekly Contests", url: "https://leetcode.com/contest/" },
  { title: "Advanced Graph Algorithms", url: "https://cp-algorithms.com/" },
  { title: "Competitive Programming Guide", url: "https://usaco.guide/" },
];

const Advanced = () => {
  return (
    <div className="min-h-screen" style={{ background: `hsl(var(--advanced-bg))` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/levels">
          <Button variant="ghost" className="mb-8 text-advanced-text hover:text-advanced-neon-cyan transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Levels
          </Button>
        </Link>

        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-advanced-neon-cyan via-advanced-neon-purple to-advanced-neon-pink bg-clip-text text-transparent animate-glow">
             Advanced Level
          </h1>
          <p className="text-xl text-advanced-text/80 max-w-2xl mx-auto">
            Conquer complex algorithms with cutting-edge graph animations and real-time complexity analysis
          </p>
        </div>

        {/* Algorithms Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-advanced-text">Complex Algorithms</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {algorithms.map((algo, index) => (
              <Card 
                key={algo.id}
                className="bg-advanced-card border-2 border-advanced-neon-cyan/30 hover:border-advanced-neon-cyan transition-all duration-500 hover:shadow-2xl hover:shadow-advanced-neon-cyan/20 hover:-translate-y-2 overflow-hidden group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-advanced-neon-cyan/5 to-advanced-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="bg-gradient-to-r from-advanced-neon-cyan via-advanced-neon-purple to-advanced-neon-pink h-1 group-hover:h-2 transition-all duration-300" />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-advanced-text mb-1 group-hover:text-advanced-neon-cyan transition-colors">
                          {algo.title}
                        </h3>
                        <span className="text-sm font-mono text-advanced-neon-cyan/80">{algo.complexity}</span>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium border ${
                        algo.difficulty === 'Expert'
                          ? 'bg-advanced-neon-pink/20 text-advanced-neon-pink border-advanced-neon-pink/30'
                          : 'bg-advanced-neon-purple/20 text-advanced-neon-purple border-advanced-neon-purple/30'
                      }`}>
                        {algo.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-advanced-text/70 mb-4">{algo.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-advanced-text/60">
                        <Zap className="h-4 w-4 mr-1 text-advanced-neon-cyan" />
                        {algo.time}
                      </div>
                      <Link to={`/visualize/advanced/${algo.id}`}>
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-advanced-neon-cyan to-advanced-neon-purple hover:from-advanced-neon-cyan/90 hover:to-advanced-neon-purple/90 text-white rounded-lg border border-advanced-neon-cyan/30 shadow-lg hover:shadow-advanced-neon-cyan/30 transition-all"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Visualize
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Learning Resources */}
        <div className="bg-advanced-card rounded-2xl p-8 border-2 border-advanced-neon-cyan/30 shadow-2xl shadow-advanced-neon-cyan/10">
          <div className="flex items-center mb-6">
            <BookOpen className="h-6 w-6 text-advanced-neon-cyan mr-3 animate-glow" />
            <h2 className="text-2xl font-bold text-advanced-text">Level Up Further</h2>
          </div>
          
          <p className="text-advanced-text/70 mb-6">
            Elite resources for competitive programming and advanced algorithm mastery:
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-gradient-to-r from-advanced-surface to-advanced-card rounded-xl hover:from-advanced-neon-cyan/10 hover:to-advanced-neon-purple/10 transition-all border border-advanced-neon-cyan/20 hover:border-advanced-neon-cyan/50 group"
              >
                <span className="text-2xl mr-3">⚡</span>
                <span className="text-advanced-text group-hover:text-advanced-neon-cyan transition-colors font-medium">
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

export default Advanced;
