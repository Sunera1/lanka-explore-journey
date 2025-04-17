
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPinIcon, StarIcon, ArrowLeftIcon, BedDoubleIcon, WifiIcon, CoffeeIcon, ParkingCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";

// In a real app, this data would come from an API
const accommodationsData = [
  {
    id: "1",
    name: "Cinnamon Grand Colombo",
    location: "Colombo",
    price: 150,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1587985064135-0366536eab42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    ],
    type: "Hotel",
    description: "Cinnamon Grand Colombo is a luxury 5-star hotel located in the heart of Colombo. The hotel features multiple dining options, a spa, and outdoor pools.",
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "Room Service", "Parking"],
    rooms: ["Deluxe Room", "Premium Room", "Executive Suite", "Presidential Suite"]
  },
  {
    id: "2",
    name: "Jungle Beach Resort",
    location: "Trincomalee",
    price: 200,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1602002418259-48daf181330e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    ],
    type: "Resort",
    description: "Jungle Beach Resort is a luxury eco-resort offering private cabins nestled between the jungle and a secluded beach. Experience nature without compromising on comfort.",
    amenities: ["Private Beach", "Restaurant", "Bar", "Spa", "Free WiFi", "Water Sports"],
    rooms: ["Jungle Cabin", "Beach Cabin", "Lagoon Cabin", "Family Villa"]
  },
  {
    id: "3",
    name: "Ella Flower Garden",
    location: "Ella",
    price: 65,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1551632436-cbf726cbfb8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1551632436-cbf726cbfb8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1549294413-26f195471c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    ],
    type: "Guesthouse",
    description: "Ella Flower Garden is a charming guesthouse surrounded by beautiful gardens with stunning views of Ella Rock and Little Adam's Peak.",
    amenities: ["Mountain View", "Garden", "Free Breakfast", "WiFi", "Airport Shuttle"],
    rooms: ["Standard Room", "Deluxe Room", "Family Room"]
  }
];

const AccommodationDetail = () => {
  const { id } = useParams();
  const accommodation = accommodationsData.find(acc => acc.id === id);

  if (!accommodation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Accommodation not found</h1>
            <Button asChild>
              <Link to="/accommodations">Back to Accommodations</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative h-[40vh] md:h-[50vh] bg-black">
          <img 
            src={accommodation.image} 
            alt={accommodation.name} 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <Button variant="outline" size="sm" className="mb-4" asChild>
              <Link to="/accommodations">
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold">{accommodation.name}</h1>
            <div className="flex items-center mt-2 flex-wrap gap-2">
              <div className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-1" />
                <span className="text-sm md:text-base">{accommodation.location}</span>
              </div>
              <div className="flex items-center ml-0 md:ml-4">
                <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span>{accommodation.rating}</span>
              </div>
              <Badge className="ml-0 md:ml-4">{accommodation.type}</Badge>
            </div>
          </div>
        </div>
        
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">About</h2>
                <p className="text-muted-foreground">{accommodation.description}</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {accommodation.images?.map((image, index) => (
                    <div key={index} className="rounded-md overflow-hidden h-40">
                      <img 
                        src={image} 
                        alt={`${accommodation.name} ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {accommodation.amenities?.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {amenity.includes("WiFi") ? (
                        <WifiIcon className="h-4 w-4 text-primary" />
                      ) : amenity.includes("Room") ? (
                        <BedDoubleIcon className="h-4 w-4 text-primary" />
                      ) : amenity.includes("Restaurant") || amenity.includes("Breakfast") ? (
                        <CoffeeIcon className="h-4 w-4 text-primary" />
                      ) : amenity.includes("Parking") ? (
                        <ParkingCircleIcon className="h-4 w-4 text-primary" />
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        </div>
                      )}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold">${accommodation.price}</span>
                    <span className="text-muted-foreground">per night</span>
                  </div>
                  
                  <Button className="w-full mb-4">Book Now</Button>
                  
                  <div className="text-sm text-muted-foreground text-center">
                    No payment required today. Reserve your room now.
                  </div>
                </CardContent>
              </Card>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Available Room Types</h3>
                <ul className="space-y-2">
                  {accommodation.rooms?.map((room, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <BedDoubleIcon className="h-4 w-4 text-primary" />
                      <span>{room}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccommodationDetail;

