
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SimpleMap } from "@/components/maps/SimpleMap";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPinIcon, SearchIcon, StarIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  rating: number;
  image: string;
  category: string;
  coordinates: [number, number];
}

const allDestinations: Destination[] = [
  {
    id: "1",
    name: "Sigiriya Rock Fortress",
    location: "Central Province",
    description: "Ancient rock fortress with frescoes and beautiful gardens",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586049699565-18a507550f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "cultural",
    coordinates: [7.9570, 80.7603]
  },
  {
    id: "2",
    name: "Mirissa Beach",
    location: "Southern Province",
    description: "Beautiful palm-fringed beach known for surfing and whale watching",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "beaches",
    coordinates: [5.9483, 80.4716]
  },
  {
    id: "3",
    name: "Kandy",
    location: "Central Province",
    description: "Home of Temple of the Tooth Relic and beautiful lake",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1629385701021-04779525860a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "cultural",
    coordinates: [7.2906, 80.6337]
  },
  {
    id: "4",
    name: "Yala National Park",
    location: "Southern Province",
    description: "Famous wildlife reserve with leopards and elephants",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1672656086312-76473cb05399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "wildlife",
    coordinates: [6.3698, 81.5046]
  },
  {
    id: "5",
    name: "Ella",
    location: "Uva Province",
    description: "Mountain town with stunning views and tea plantations",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1580881345109-5c9b342fa632?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "mountains",
    coordinates: [6.8667, 81.0466]
  },
  {
    id: "6",
    name: "Polonnaruwa",
    location: "North Central Province",
    description: "Ancient city with well-preserved ruins and statues",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1617822754759-0f5ddf5d1100?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "cultural",
    coordinates: [7.9403, 81.0188]
  },
  {
    id: "7",
    name: "Unawatuna Beach",
    location: "Southern Province",
    description: "Popular beach with coral reefs and turtle hatcheries",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1588606869230-4b5f48b473b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "beaches",
    coordinates: [6.0174, 80.2489]
  },
  {
    id: "8",
    name: "Minneriya National Park",
    location: "North Central Province",
    description: "Famous for elephant gatherings during drought seasons",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1588733103629-b77afe0425ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "wildlife",
    coordinates: [8.0352, 80.9022]
  }
];

const Destinations = () => {
  const [searchParams] = useSearchParams();
  const [destinations, setDestinations] = useState<Destination[]>(allDestinations);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const category = searchParams.get('category');
    
    if (category) {
      setActiveTab(category);
      filterDestinations(category, searchQuery);
    } else {
      filterDestinations(activeTab, searchQuery);
    }
  }, [searchParams, activeTab, searchQuery]);

  const filterDestinations = (tab: string, query: string) => {
    let filtered = allDestinations;
    
    // Filter by category
    if (tab !== 'all') {
      filtered = filtered.filter(dest => dest.category === tab);
    }
    
    // Filter by search query
    if (query.trim() !== '') {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(lowerQuery) || 
        dest.location.toLowerCase().includes(lowerQuery) ||
        dest.description.toLowerCase().includes(lowerQuery)
      );
    }
    
    setDestinations(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterDestinations(activeTab, searchQuery);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="py-6 bg-muted/50">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Explore Sri Lanka</h1>
          <p className="text-muted-foreground">Discover the island's most beautiful destinations</p>
        </div>
      </div>
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3">
              <div className="mb-6">
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <Input
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">
                    <SearchIcon className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </form>
              </div>
              
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="beaches">Beaches</TabsTrigger>
                  <TabsTrigger value="cultural">Cultural</TabsTrigger>
                  <TabsTrigger value="wildlife">Wildlife</TabsTrigger>
                  <TabsTrigger value="mountains">Mountains</TabsTrigger>
                </TabsList>
              </Tabs>
              
              {destinations.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-lg text-muted-foreground">No destinations found matching your criteria.</p>
                  <Button variant="outline" className="mt-4" onClick={() => {
                    setSearchQuery("");
                    setActiveTab("all");
                    setDestinations(allDestinations);
                  }}>Clear Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {destinations.map((destination) => (
                    <Card key={destination.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-48">
                        <img 
                          src={destination.image} 
                          alt={destination.name}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 right-2">{destination.category}</Badge>
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle>{destination.name}</CardTitle>
                        <CardDescription className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {destination.location}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">{destination.description}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex items-center justify-between">
                        <div className="flex items-center">
                          <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="font-medium">{destination.rating}</span>
                        </div>
                        <Button>View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
            
            <div className="w-full md:w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>Sri Lanka Map</CardTitle>
                  <CardDescription>Explore destinations on the map</CardDescription>
                </CardHeader>
                <CardContent>
                  <SimpleMap 
                    center={[7.8731, 80.7718]} 
                    zoom={8} 
                    markers={destinations.map(dest => ({
                      position: dest.coordinates,
                      title: dest.name,
                      popup: `<b>${dest.name}</b><br>${dest.location}<br>Rating: ${dest.rating}/5`
                    }))}
                    className="h-[500px] rounded-md"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Destinations;
