import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Levels from "./pages/Levels";
import Beginner from "./pages/Beginner";
import Intermediate from "./pages/Intermediate";
import Advanced from "./pages/Advanced";

// 🧠 Visualizer Pages
import BubbleSortVisualizer from "./pages/BubbleSortVisualizer";
import SelectionSortVisualizer from "./pages/SelectionSortVisualizer";
import MergeSortVisualizer from "./pages/MergeSortVisualizer";
import QuickSortVisualizer from "./pages/QuickSortVisualizer";
import LinearSearchVisualizer from "./pages/LinearSearchVisualizer";
import BinarySearchVisualizer from "./pages/BinarySearchVisualizer";
import JumpSearchVisualizer from "./pages/JumpSearchVisualizer";
import InterpolationSearchVisualizer from "./pages/InterpolationSearchVisualizer";
import LinkedListVisualizer from "./pages/LinkedListVisualizer";
import InsertionSortVisualizer from "./pages/InsertionSortVisualizer";

// beginner
import BeginnerArrayVisualizer from "./pages/BeginnerArrayVisualizer";
// import BeginnerArrayVisualizer from "./pages/Beginner";


// Advanced
import DijkstraVisualizer from "./pages/DijkstraVisualizer";

import KruskalVisualizer from "./pages/KruskalVisualizer";


import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* 🌐 Main Pages */}
          <Route path="/" element={<Index />} />
          <Route path="/levels" element={<Levels />} />
          <Route path="/levels/beginner" element={<Beginner />} />
          <Route path="/levels/intermediate" element={<Intermediate />} />
          <Route path="/levels/advanced" element={<Advanced />} />

          {/* 🎨 Visualization Routes */}
          <Route
            path="/visualize/intermediate/bubble-sort"
            element={<BubbleSortVisualizer />}
          />
          <Route
            path="/visualize/intermediate/selection-sort"
            element={<SelectionSortVisualizer />}
          />
          <Route
            path="/visualize/intermediate/merge-sort"
            element={<MergeSortVisualizer />}
          />
          <Route
            path="/visualize/intermediate/quick-sort"
            element={<QuickSortVisualizer />}
          />
          <Route
            path="/visualize/intermediate/linear-search"
            element={<LinearSearchVisualizer />}
          />
          <Route
            path="/visualize/intermediate/binary-search"
            element={<BinarySearchVisualizer />}
          />
          <Route
            path="/visualize/intermediate/jump-search"
            element={<JumpSearchVisualizer />}
          />
          <Route
            path="/visualize/intermediate/interpolation-search"
            element={<InterpolationSearchVisualizer />}
          />
          <Route
            path="/visualize/intermediate/linked-list"
            element={<LinkedListVisualizer />}
          />
          <Route
            path="/visualize/intermediate/insertion-sort"
            element={<InsertionSortVisualizer />}
          />

          {/* Beginner pages routes */}
          <Route
            path="/visualize/beginner/array"
            element={<BeginnerArrayVisualizer />}
          />

          {/* Advanced Pages of routes */}
          <Route
            path="/visualize/advanced/dijkstra"
            element={<DijkstraVisualizer />}
          />
          <Route
            path="/visualize/advanced/kruskal"
            element={<KruskalVisualizer />}
          />

          {/* ❌ 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
