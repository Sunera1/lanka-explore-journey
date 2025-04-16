
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { SimpleMap } from "@/components/maps/SimpleMap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { StarIcon, SearchIcon, MapPinIcon } from "lucide-react";
import { useState } from "react";

interface Accommodation {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  type: string;
  description: string;
  coordinates: [number, number];
}

const accommodations: Accommodation[] = [
  {
    id: "1",
    name: "Cinnamon Grand Colombo",
    location: "Colombo",
    price: 150,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    type: "Hotel",
    description: "Luxury hotel in the heart of Colombo with multiple restaurants and pools.",
    coordinates: [6.9165, 79.8582]
  },
  {
    id: "2",
    name: "Jungle Beach Resort",
    location: "Trincomalee",
    price: 200,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    type: "Resort",
    description: "Beachfront resort with private cabins nestled between the jungle and the sea.",
    coordinates: [8.5937, 81.2147]
  },
  {
    id: "3",
    name: "Ella Flower Garden",
    location: "Ella",
    price: 65,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1551632436-cbf726cbfb8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    type: "Guesthouse",
    description: "Cozy guesthouse with stunning mountain views and homemade Sri Lankan food.",
    coordinates: [6.8667, 81.0466]
  },
  {
    id: "4",
    name: "Sigiriya Village Hotel",
    location: "Sigiriya",
    price: 120,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    type: "Hotel",
    description: "Traditional-style hotel with beautiful gardens near the ancient rock fortress.",
    coordinates: [7.9570, 80.7603]
  },
  {
    id: "5",
    name: "The Beach Cabanas",
    location: "Unawatuna",
    price: 90,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    type: "Cabanas",
    description: "Beachfront cabanas with direct access to the golden sands of Unawatuna.",
    coordinates: [6.0174, 80.2489]
  },
  {
    id: "6",
    name: "Ceylon Tea Bungalow",
    location: "Nuwara Eliya",
    price: 180,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1595274459742-4a5efe6b5b57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    type: "Bungalow",
    description: "Colonial-era tea plantation bungalow with panoramic views of tea fields.",
    coordinates: [6.9497, 80.7891]
  }
];

const Accommodations = () => {
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [filteredAccommodations, setFilteredAccommodations] = useState(accommodations);

  const handleSearch = () => {
    let filtered = accommodations;
    
    // Filter by price
    filtered = filtered.filter(
      (acc) => acc.price >= priceRange[0] && acc.price <= priceRange[1]
    );
    
    // Filter by type
    if (selectedType) {
      filtered = filtered.filter((acc) => acc.type === selectedType);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(acc => 
        acc.name.toLowerCase().includes(lowerQuery) || 
        acc.location.toLowerCase().includes(lowerQuery) ||
        acc.description.toLowerCase().includes(lowerQuery)
      );
    }
    
    setFilteredAccommodations(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="py-6 bg-muted/50">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Find Your Perfect Stay</h1>
          <p className="text-muted-foreground">Browse hotels, resorts and guesthouses across Sri Lanka</p>
        </div>
      </div>
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4">
              <Card className="sticky top-20">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Search</h3>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Location, hotel name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Accommodation Type</h3>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All types</SelectItem>
                        <SelectItem value="Hotel">Hotel</SelectItem>
                        <SelectItem value="Resort">Resort</SelectItem>
                        <SelectItem value="Guesthouse">Guesthouse</SelectItem>
                        <SelectItem value="Cabanas">Cabanas</SelectItem>
                        <SelectItem value="Bungalow">Bungalow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-3">
                      <h3 className="font-medium">Price Range</h3>
                      <span className="text-sm text-muted-foreground">
                        ${priceRange[0]} - ${priceRange[1]}
                      </span>
                    </div>
                    <Slider
                      defaultValue={[0, 300]}
                      max={300}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                  </div>
                  
                  <Button className="w-full" onClick={handleSearch}>
                    <SearchIcon className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="w-full md:w-3/4">
              <div className="mb-6">
                <SimpleMap
                  center={[7.8731, 80.7718]}
                  zoom={8}
                  markers={filteredAccommodations.map((acc) => ({
                    position: acc.coordinates,
                    title: acc.name,
                    popup: `<b>${acc.name}</b><br>${acc.location}<br>${acc.type} • $${acc.price}/night`
                  }))}
                  className="h-[300px] rounded-lg"
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredAccommodations.map((accommodation) => (
                  <Card key={accommodation.id} className="flex overflow-hidden hover:shadow-md transition-shadow">
                    <div className="w-1/3">
                      <img
                        src={accommodation.image}
                        alt={accommodation.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{accommodation.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-1">
                            <MapPinIcon className="h-3 w-3 mr-1" />
                            {accommodation.location}
                          </div>
                        </div>
                        <Badge>{accommodation.type}</Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {accommodation.description}
                      </p>
                      
                      <div className="flex justify-between items-end mt-auto">
                        <div className="flex items-center">
                          <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="font-medium">{accommodation.rating}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${accommodation.price} <span className="text-sm font-normal text-muted-foreground">night</span></div>
                          <Button size="sm" className="mt-2">View Details</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Accommodations;
