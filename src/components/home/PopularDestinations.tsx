
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPinIcon, StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  rating: number;
  image: string;
  category: string;
}

const destinations: Destination[] = [
  {
    id: "1",
    name: "Sigiriya Rock Fortress",
    location: "Central Province",
    description: "Ancient rock fortress with frescoes and beautiful gardens",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586049699565-18a507550f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "cultural"
  },
  {
    id: "2",
    name: "Mirissa Beach",
    location: "Southern Province",
    description: "Beautiful palm-fringed beach known for surfing and whale watching",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "beaches"
  },
  {
    id: "3",
    name: "Kandy",
    location: "Central Province",
    description: "Home of Temple of the Tooth Relic and beautiful lake",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1629385701021-04779525860a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "cultural"
  },
  {
    id: "4",
    name: "Yala National Park",
    location: "Southern Province",
    description: "Famous wildlife reserve with leopards and elephants",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1672656086312-76473cb05399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "wildlife"
  }
];

export function PopularDestinations() {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Destinations</h2>
          <Button variant="link" asChild>
            <Link to="/destinations">View all</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <Link key={destination.id} to={`/destination/${destination.id}`}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2">{destination.category}</Badge>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{destination.name}</CardTitle>
                  <CardDescription className="flex items-center text-sm">
                    <MapPinIcon className="h-3 w-3 mr-1" />
                    {destination.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2">{destination.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center">
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
