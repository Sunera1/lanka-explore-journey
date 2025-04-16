
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/20 to-background">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Explore the Pearl of the 
              <span className="text-primary"> Indian Ocean</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Your all-in-one companion for discovering Sri Lanka's breathtaking destinations, 
              convenient transportation, and authentic experiences.
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild size="lg">
                <Link to="/destinations">
                  Start Exploring <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/emergency">
                  Emergency Help
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="relative w-[450px] h-[550px] overflow-hidden rounded-l-3xl shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1590862003625-57962e197e82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=550&q=80" 
            alt="Sri Lanka coastline" 
            className="w-full h-full object-cover object-center" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/50"></div>
        </div>
      </div>
    </div>
  );
}
