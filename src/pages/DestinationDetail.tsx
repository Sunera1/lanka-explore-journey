
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MapPinIcon, StarIcon, ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";

// In a real app, this data would come from an API
const destinationsData = [
  {
    id: "1",
    name: "Sigiriya Rock Fortress",
    location: "Central Province",
    description: "Ancient rock fortress with frescoes and beautiful gardens. Located in the northern Matale District near the town of Dambulla in the Central Province, Sri Lanka. The name refers to a site of historical and archaeological significance that is dominated by a massive column of rock nearly 200 metres (660 ft) high.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586049699565-18a507550f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1586049699565-18a507550f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1590644693724-599398b9c484?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1639040387232-9333fb303765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    ],
    category: "cultural",
    entryFee: "$30",
    openingHours: "7:00 AM - 5:30 PM",
    bestTimeToVisit: "Early morning to avoid crowds and heat"
  },
  {
    id: "2",
    name: "Mirissa Beach",
    location: "Southern Province",
    description: "Beautiful palm-fringed beach known for surfing and whale watching. Mirissa's beach and nightlife make it a popular tourist destination. Many restaurants are located on the beach with seafood being a specialty.",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1559534352-02e43ad81a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    ],
    category: "beaches",
    activities: "Surfing, whale watching, sunbathing",
    nearbyAttractions: "Galle Fort (40 min drive)",
    bestTimeToVisit: "November to April"
  },
  {
    id: "3",
    name: "Kandy",
    location: "Central Province",
    description: "Home of Temple of the Tooth Relic and beautiful lake. Kandy is a major city in Sri Lanka located in the Central Province. It was the last capital of the ancient kings' era of Sri Lanka.",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1629385701021-04779525860a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1629385701021-04779525860a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1546708973-b339540b5162?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1588258147254-a7598042a110?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    ],
    category: "cultural",
    attractions: "Temple of the Tooth Relic, Kandy Lake, Royal Botanical Gardens",
    festivals: "Esala Perahera (July/August)",
    bestTimeToVisit: "January to April"
  },
  {
    id: "4",
    name: "Yala National Park",
    location: "Southern Province",
    description: "Famous wildlife reserve with leopards and elephants. Yala National Park is the most visited and second largest national park in Sri Lanka. The park consists of five blocks, two of which are now open to the public.",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1672656086312-76473cb05399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1672656086312-76473cb05399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583968115815-85453e23c4cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544641809-1b5eb1906629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    ],
    category: "wildlife",
    wildlife: "Leopards, elephants, crocodiles, sloth bears",
    safariTimings: "Morning (6:00 AM - 9:00 AM) and Evening (3:00 PM - 6:00 PM)",
    bestTimeToVisit: "February to July"
  }
];

const DestinationDetail = () => {
  const { id } = useParams();
  const destination = destinationsData.find(dest => dest.id === id);

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Destination not found</h1>
            <Button asChild>
              <Link to="/destinations">Back to Destinations</Link>
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
            src={destination.image} 
            alt={destination.name} 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <Button variant="outline" size="sm" className="mb-4" asChild>
              <Link to="/destinations">
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold">{destination.name}</h1>
            <div className="flex items-center mt-2">
              <MapPinIcon className="h-4 w-4 mr-1" />
              <span className="text-sm md:text-base">{destination.location}</span>
              <div className="flex items-center ml-4">
                <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span>{destination.rating}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">About</h2>
                <p className="text-muted-foreground">{destination.description}</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {destination.images?.map((image, index) => (
                    <div key={index} className="rounded-md overflow-hidden h-40">
                      <img 
                        src={image} 
                        alt={`${destination.name} ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Information</h3>
                <div className="space-y-2">
                  {destination.category && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium capitalize">{destination.category}</span>
                    </div>
                  )}
                  {destination.entryFee && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Entry Fee</span>
                      <span className="font-medium">{destination.entryFee}</span>
                    </div>
                  )}
                  {destination.openingHours && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hours</span>
                      <span className="font-medium">{destination.openingHours}</span>
                    </div>
                  )}
                  {destination.bestTimeToVisit && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Best Time</span>
                      <span className="font-medium">{destination.bestTimeToVisit}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <Button className="w-full">Book a Tour</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DestinationDetail;
