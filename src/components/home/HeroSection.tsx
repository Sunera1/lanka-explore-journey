
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export function HeroSection() {
  const isMobile = useIsMobile();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/20 to-background">
      <div className="container px-4 py-12 sm:py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className={`
              ${isMobile ? 'text-3xl' : 'text-4xl lg:text-5xl'} 
              font-extrabold tracking-tight
            `}>
              Explore the Pearl of the 
              <span className="text-primary"> Indian Ocean</span>
            </h1>
            <p className={`
              mt-4 
              ${isMobile ? 'text-base' : 'text-xl'} 
              text-muted-foreground
            `}>
              Your all-in-one companion for discovering Sri Lanka's breathtaking destinations, 
              convenient transportation, and authentic experiences.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Button asChild size={isMobile ? 'default' : 'lg'}>
                <Link to="/destinations">
                  Start Exploring <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size={isMobile ? 'default' : 'lg'} asChild>
                <Link to="/emergency">
                  Emergency Help
                </Link>
              </Button>
            </div>
          </div>

          {!isMobile && (
            <div className="w-1/2 hidden lg:block">
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1590862003625-57962e197e82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=550&q=80" 
                  alt="Sri Lanka coastline" 
                  className="w-full h-full object-cover object-center" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/50"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
