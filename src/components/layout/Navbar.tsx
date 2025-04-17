
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  MapIcon, 
  HomeIcon,
  BedDoubleIcon,
  BusIcon,
  PhoneIcon,
  MenuIcon,
  SearchIcon,
  XIcon,
  UserIcon
} from "lucide-react";

export function Navbar() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // This would be replaced with actual auth state
  const [isAuthenticated] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-full p-1">
              <MapIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="hidden sm:inline-block font-bold text-xl">LankaGo</span>
          </Link>
        </div>

        {!isMobile ? (
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
              <HomeIcon className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/destinations" className="text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
              <MapIcon className="h-4 w-4" />
              <span>Explore</span>
            </Link>
            <Link to="/accommodations" className="text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
              <BedDoubleIcon className="h-4 w-4" />
              <span>Stay</span>
            </Link>
            <Link to="/transport" className="text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
              <BusIcon className="h-4 w-4" />
              <span>Transport</span>
            </Link>
            <Link to="/emergency" className="text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
              <PhoneIcon className="h-4 w-4" />
              <span>Emergency</span>
            </Link>
          </nav>
        ) : null}

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <SearchIcon className="h-5 w-5" />
          </Button>
          
          {isAuthenticated ? (
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link to="/account">
                <UserIcon className="h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size={isMobile ? "sm" : "default"} asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
          
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && (
        <div className={cn(
          "fixed inset-x-0 top-16 bg-background border-b p-4 transition-all duration-300 ease-in-out transform",
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        )}>
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              <HomeIcon className="h-5 w-5 text-primary" />
              <span>Home</span>
            </Link>
            <Link to="/destinations" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              <MapIcon className="h-5 w-5 text-primary" />
              <span>Explore</span>
            </Link>
            <Link to="/accommodations" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              <BedDoubleIcon className="h-5 w-5 text-primary" />
              <span>Stay</span>
            </Link>
            <Link to="/transport" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              <BusIcon className="h-5 w-5 text-primary" />
              <span>Transport</span>
            </Link>
            <Link to="/emergency" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              <PhoneIcon className="h-5 w-5 text-primary" />
              <span>Emergency</span>
            </Link>
            {!isAuthenticated && (
              <Link to="/auth" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
                <UserIcon className="h-5 w-5 text-primary" />
                <span>Sign In</span>
              </Link>
            )}
            {isAuthenticated && (
              <Link to="/account" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
                <UserIcon className="h-5 w-5 text-primary" />
                <span>My Account</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
