import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Zap, BookOpen } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-15"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center animate-slide-up">
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text ">
              RhythmWithAlgo
            </h1>
            <p className="text-xl sm:text-2xl text-foreground/80 mb-4 max-w-3xl mx-auto">
              Master Data Structures & Algorithms through
            </p>
            <p className="text-2xl sm:text-3xl font-semibold mb-8 text-primary">
              Interactive Visual Learning
            </p>
            <p className="text-lg text-foreground/70 mb-12 max-w-2xl mx-auto">
              From basic programming concepts to advanced algorithms - see them come alive
              with step-by-step animations, complexity analysis, and curated learning paths.
            </p>
            
            <Link to="/levels">
              <Button size="lg" className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Learn at Your Own Pace
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">

            
            {/* Beginner Card */}
            <Link to="/levels/beginner" className="group">
              <div className="bg-beginner-card border-2 border-beginner-primary/20 rounded-2xl p-8 hover:border-beginner-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="bg-beginner-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-8 w-8 text-beginner-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-beginner-primary">Beginner</h3>
                <p className="text-beginner-text/80 mb-4">
                  Master the fundamentals with playful animations. Learn variables, loops, arrays, and basic logic.
                </p>
                <ul className="text-sm text-beginner-text/70 space-y-2">
                  <li>• Swapping numbers</li>
                  <li>• Array basics</li>
                  <li>• Simple loops</li>
                </ul>
              </div>
            </Link>

            {/* Intermediate Card */}
            <Link to="/levels/intermediate" className="group">
              <div className="bg-intermediate-card border-2 border-intermediate-primary/20 rounded-2xl p-8 hover:border-intermediate-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="bg-intermediate-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Code className="h-8 w-8 text-intermediate-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-intermediate-primary">Intermediate</h3>
                <p className="text-intermediate-text/80 mb-4">
                  Dive into core DSA topics with structured visuals. Sorting, searching, and linked lists.
                </p>
                <ul className="text-sm text-intermediate-text/70 space-y-2">
                  <li>• Bubble Sort</li>
                  <li>• Binary Search</li>
                  <li>• Linked Lists</li>
                </ul>
              </div>
            </Link>

            {/* Advanced Card */}
            <Link to="/levels/advanced" className="group">
              <div className="bg-advanced-card border-2 border-advanced-neon-cyan/20 rounded-2xl p-8 hover:border-advanced-neon-cyan transition-all duration-300 hover:shadow-xl hover:shadow-advanced-neon-cyan/20 hover:-translate-y-2">
                <div className="bg-advanced-neon-cyan/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-advanced-neon-cyan" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-advanced-neon-cyan">Advanced</h3>
                <p className="text-advanced-text/80 mb-4">
                  Master complex algorithms with graph animations and real-time complexity tracking.
                </p>
                <ul className="text-sm text-advanced-text/70 space-y-2">
                  <li>• Dynamic Programming</li>
                  <li>• Graph Algorithms</li>
                  <li>• MST & Shortest Path</li>
                </ul>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Visualize Your Learning?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of developers mastering DSA through interactive animations
          </p>
          <Link to="/levels">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Choose Your Level
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
