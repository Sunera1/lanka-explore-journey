
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface Accommodation {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  type: string;
}

const accommodations: Accommodation[] = [
  {
    id: "1",
    name: "Cinnamon Grand Colombo",
    location: "Colombo",
    price: 150,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    type: "Hotel"
  },
  {
    id: "2",
    name: "Jungle Beach Resort",
    location: "Trincomalee",
    price: 200,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    type: "Resort"
  },
  {
    id: "3",
    name: "Ella Flower Garden",
    location: "Ella",
    price: 65,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1551632436-cbf726cbfb8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    type: "Guesthouse"
  }
];

export function AccommodationSection() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Find Places to Stay</h2>
          <Button variant="link" asChild>
            <Link to="/accommodations">View all</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {accommodations.map((accommodation) => (
            <Link key={accommodation.id} to={`/accommodation/${accommodation.id}`}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={accommodation.image} 
                    alt={accommodation.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2">{accommodation.type}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{accommodation.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{accommodation.location}</p>
                  <div className="flex items-center mb-2">
                    <StarIcon className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                    <span className="text-sm font-medium">{accommodation.rating}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <span className="font-semibold">${accommodation.price} <span className="text-sm font-normal text-muted-foreground">night</span></span>
                  <Button size="sm">View Details</Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
