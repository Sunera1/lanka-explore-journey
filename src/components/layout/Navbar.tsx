import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  MenuIcon,
  HomeIcon,
  MapIcon,
  BedIcon,
  BusIcon,
  AlertCircleIcon,
  UserIcon,
} from "lucide-react";

export function Navbar() {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 mr-4">
          <Link to="/" className="font-bold text-xl">
            Lanka <span className="text-primary">Explorer</span>
          </Link>
        </div>
        {isMobile ? (
          <MobileNav />
        ) : (
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/"
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/destinations"
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      Destinations
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/accommodations"
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      Accommodations
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/transport"
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      Transport
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/maps"
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      Maps
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/emergency"
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      Emergency
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        )}

        <div className="flex items-center gap-4">
          <UserNav />
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="grid gap-2 py-6">
          <Link
            to="/"
            className="flex items-center gap-2 px-2 py-1 text-lg font-semibold"
          >
            <HomeIcon className="h-5 w-5" />
            Home
          </Link>
          <Link
            to="/destinations"
            className="flex items-center gap-2 px-2 py-1 text-lg font-semibold"
          >
            <MapIcon className="h-5 w-5" />
            Destinations
          </Link>
          <Link
            to="/accommodations"
            className="flex items-center gap-2 px-2 py-1 text-lg font-semibold"
          >
            <BedIcon className="h-5 w-5" />
            Accommodations
          </Link>
          <Link
            to="/transport"
            className="flex items-center gap-2 px-2 py-1 text-lg font-semibold"
          >
            <BusIcon className="h-5 w-5" />
            Transport
          </Link>
          <Link
            to="/maps"
            className="flex items-center gap-2 px-2 py-1 text-lg font-semibold"
          >
            <MapIcon className="h-5 w-5" />
            Maps
          </Link>
          <Link
            to="/emergency"
            className="flex items-center gap-2 px-2 py-1 text-lg font-semibold"
          >
            <AlertCircleIcon className="h-5 w-5" />
            Emergency
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>
              <UserIcon className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/account">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <Link to="/auth">
          <DropdownMenuItem>Login / Register</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
