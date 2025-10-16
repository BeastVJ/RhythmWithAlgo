import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Levels = () => {
  // ---------------- STREAK TRACKER ----------------
  const TOTAL_DAYS = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(); // Days in current month
  const [streakData, setStreakData] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("streakData"));
    const savedStreak = JSON.parse(localStorage.getItem("currentStreak"));

    if (savedData && savedData.length === TOTAL_DAYS) {
      setStreakData(savedData);
      setCurrentStreak(savedStreak);
    } else {
      const defaultData = Array(TOTAL_DAYS).fill({ learned: false });
      setStreakData(defaultData);
      localStorage.setItem("streakData", JSON.stringify(defaultData));
      localStorage.setItem("currentStreak", JSON.stringify(0));
    }
  }, []);

  const markTodayAsLearned = () => {
    const todayIndex = new Date().getDate() - 1;
    let updatedData = [...streakData];
    updatedData[todayIndex] = { learned: true };
    const newStreak = calculateStreak(updatedData);
    setStreakData(updatedData);
    setCurrentStreak(newStreak);
    localStorage.setItem("streakData", JSON.stringify(updatedData));
    localStorage.setItem("currentStreak", JSON.stringify(newStreak));
  };

  const calculateStreak = (data) => {
    let count = 0;
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].learned) count++;
      else break;
    }
    return count;
  };

  const resetStreak = () => {
    const resetData = Array(TOTAL_DAYS).fill({ learned: false });
    setStreakData(resetData);
    setCurrentStreak(0);
    localStorage.setItem("streakData", JSON.stringify(resetData));
    localStorage.setItem("currentStreak", JSON.stringify(0));
  };

  const getEmojiForDay = (day) => (day.learned ? "😊" : "😢"); // Happy / Sad

  // ---------------- END STREAK TRACKER ----------------

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4">
          Choose Your Learning Path
        </h1>
        <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Select your skill level to start visualizing algorithms tailored to your experience
        </p>

        {/* 🟢 BIGGER MONTHLY STREAK TRACKER BOX */}
        <div className="bg-gray-50 p-6 rounded-2xl mb-12 shadow-md max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">Monthly Learning Streak</h2>
          <div className="grid grid-cols-7 gap-2">
            {streakData.map((day, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center w-12 h-14 border rounded-lg ${
                  day.learned ? "bg-green-200/80" : "bg-gray-200/30"
                } transition-all`}
              >
                <span className="text-sm font-medium">{index + 1}</span>
                <span className="text-xl">{getEmojiForDay(day)}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-md mt-3">
            Streak: <span className="font-bold">{currentStreak}</span> days
          </p>
          <div className="flex justify-center gap-3 mt-3">
            <Button
              className="bg-blue-500 text-white px-4 py-2 text-md rounded"
              onClick={markTodayAsLearned}
            >
              Mark Today
            </Button>
            <Button
              className="bg-red-500 text-white px-4 py-2 text-md rounded"
              onClick={resetStreak}
            >
              Reset
            </Button>
          </div>
        </div>

        {/* 🟦 LEVELS CARDS */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* BEGINNER */}
          <Link to="/levels/beginner" className="group">
            <div className="relative bg-beginner-card border-2 border-beginner-primary/30 rounded-3xl p-8 h-full hover:border-beginner-primary transition-all duration-500 hover:shadow-2xl hover:shadow-beginner-primary/20 hover:-translate-y-3">
              <div className="absolute top-0 right-0 w-32 h-32 bg-beginner-primary/10 rounded-full blur-3xl group-hover:bg-beginner-primary/20 transition-all" />
              <div className="relative">
                <div className="mb-4">
                  <h2 className="text-3xl font-bold text-beginner-primary mb-2">Beginner</h2>
                  <p className="text-sm text-beginner-primary/70 font-medium">FOUNDATIONAL CONCEPTS</p>
                </div>
                <p className="text-beginner-text/80 mb-6 leading-relaxed">
                  Start your coding journey with playful animations that bring basic programming concepts to life.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-beginner-text/70">
                    <div className="w-2 h-2 rounded-full bg-beginner-success mr-3" />
                    <span className="text-sm">Variables & Data Types</span>
                  </div>
                  <div className="flex items-center text-beginner-text/70">
                    <div className="w-2 h-2 rounded-full bg-beginner-success mr-3" />
                    <span className="text-sm">Loops & Conditionals</span>
                  </div>
                  <div className="flex items-center text-beginner-text/70">
                    <div className="w-2 h-2 rounded-full bg-beginner-success mr-3" />
                    <span className="text-sm">Array Basics</span>
                  </div>
                </div>
                <Button className="w-full bg-beginner-primary hover:bg-beginner-primary/90 text-white rounded-xl">
                  Start Learning
                </Button>
              </div>
            </div>
          </Link>

          {/* INTERMEDIATE */}
          <Link to="/levels/intermediate" className="group">
            <div className="relative bg-intermediate-card border-2 border-intermediate-primary/30 rounded-3xl p-8 h-full hover:border-intermediate-primary transition-all duration-500 hover:shadow-2xl hover:shadow-intermediate-primary/20 hover:-translate-y-3">
              <div className="absolute top-0 right-0 w-32 h-32 bg-intermediate-primary/10 rounded-full blur-3xl group-hover:bg-intermediate-primary/20 transition-all" />
              <div className="relative">
                <div className="mb-4">
                  <h2 className="text-3xl font-bold text-intermediate-primary mb-2">Intermediate</h2>
                  <p className="text-sm text-intermediate-primary/70 font-medium">CORE DSA TOPICS</p>
                </div>
                <p className="text-intermediate-text/80 mb-6 leading-relaxed">
                  Master essential data structures and algorithms with structured, step-by-step visualizations.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-intermediate-text/70">
                    <div className="w-2 h-2 rounded-full bg-intermediate-accent mr-3" />
                    <span className="text-sm">Sorting Algorithms</span>
                  </div>
                  <div className="flex items-center text-intermediate-text/70">
                    <div className="w-2 h-2 rounded-full bg-intermediate-accent mr-3" />
                    <span className="text-sm">Searching Techniques</span>
                  </div>
                  <div className="flex items-center text-intermediate-text/70">
                    <div className="w-2 h-2 rounded-full bg-intermediate-accent mr-3" />
                    <span className="text-sm">Linked Lists & Stacks</span>
                  </div>
                </div>
                <Button className="w-full bg-intermediate-primary hover:bg-intermediate-primary/90 text-white rounded-xl">
                  Explore Algorithms
                </Button>
              </div>
            </div>
          </Link>

          {/* ADVANCED */}
          <Link to="/levels/advanced" className="group">
            <div className="relative bg-advanced-card border-2 border-advanced-neon-cyan/30 rounded-3xl p-8 h-full hover:border-advanced-neon-cyan transition-all duration-500 hover:shadow-2xl hover:shadow-advanced-neon-cyan/30 hover:-translate-y-3">
              <div className="absolute top-0 right-0 w-32 h-32 bg-advanced-neon-cyan/10 rounded-full blur-3xl group-hover:bg-advanced-neon-cyan/20 transition-all" />
              <div className="relative">
                <div className="mb-4">
                  <h2 className="text-3xl font-bold text-indigo-400 mb-2">Advanced</h2>
                  <p className="text-sm text-advanced-neon-cyan/70 font-medium">COMPLEX ALGORITHMS</p>
                </div>
                <p className="text-advanced-text/80 mb-6 leading-relaxed">
                  Conquer complex algorithms with graph animations, dynamic programming, and real-time complexity analysis.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-advanced-text/70">
                    <div className="w-2 h-2 rounded-full bg-advanced-neon-purple mr-3" />
                    <span className="text-sm">Graph Algorithms</span>
                  </div>
                  <div className="flex items-center text-advanced-text/70">
                    <div className="w-2 h-2 rounded-full bg-advanced-neon-purple mr-3" />
                    <span className="text-sm">Dynamic Programming</span>
                  </div>
                  <div className="flex items-center text-advanced-text/70">
                    <div className="w-2 h-2 rounded-full bg-advanced-neon-purple mr-3" />
                    <span className="text-sm">MST & Shortest Path</span>
                  </div>
                </div>
                <Button className="w-full bg-advanced-neon-cyan hover:bg-advanced-neon-cyan/90 text-white rounded-xl">
                  Master Algorithms
                </Button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Levels;
