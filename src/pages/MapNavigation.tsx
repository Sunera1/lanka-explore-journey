
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SimpleMap } from "@/components/maps/SimpleMap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { 
  MapPinIcon, 
  SearchIcon, 
  CompassIcon, 
  Footprints as WalkIcon, 
  Bus as BusIcon, 
  Car as CarIcon, 
  XIcon,
  StreetView
} from "lucide-react";

interface POI {
  id: string;
  name: string;
  category: string;
  location: string;
  coordinates: [number, number];
  description?: string;
}

const nearbyPOIs: POI[] = [
  {
    id: "1",
    name: "Colombo National Museum",
    category: "attraction",
    location: "Colombo",
    coordinates: [6.9102, 79.8652],
    description: "Historical artifacts and cultural exhibits"
  },
  {
    id: "2",
    name: "Viharamahadevi Park",
    category: "park",
    location: "Colombo",
    coordinates: [6.9146, 79.8611],
    description: "Largest park in Colombo with walking paths"
  },
  {
    id: "3", 
    name: "Dutch Hospital Shopping Precinct",
    category: "shopping",
    location: "Colombo",
    coordinates: [6.9344, 79.8428],
    description: "Historic building with shops and restaurants"
  },
  {
    id: "4",
    name: "Cafe Kumbuk",
    category: "dining",
    location: "Colombo",
    coordinates: [6.9040, 79.8619],
    description: "Popular cafe with vegetarian options"
  },
  {
    id: "5",
    name: "Galle Face Green",
    category: "attraction",
    location: "Colombo",
    coordinates: [6.9271, 79.8425],
    description: "Oceanside urban park with food vendors"
  }
];

type TransportMode = "walking" | "public" | "driving";

const MapNavigation = () => {
  const [center, setCenter] = useState<[number, number]>([6.9271, 79.8425]);
  const [zoom, setZoom] = useState(13);
  const [pois, setPois] = useState<POI[]>(nearbyPOIs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [transportMode, setTransportMode] = useState<TransportMode>("walking");
  const [showDirections, setShowDirections] = useState(false);
  const [enableStreetView, setEnableStreetView] = useState(false);
  
  const { toast } = useToast();

  const filterPOIs = () => {
    let filtered = nearbyPOIs;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(poi => poi.category === selectedCategory);
    }
    
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(poi => 
        poi.name.toLowerCase().includes(query) || 
        poi.location.toLowerCase().includes(query) ||
        (poi.description && poi.description.toLowerCase().includes(query))
      );
    }
    
    setPois(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterPOIs();
  };

  const getDirections = () => {
    if (!selectedPOI) return;
    
    setShowDirections(true);
    toast({
      title: "Directions calculated",
      description: `${transportMode.charAt(0).toUpperCase() + transportMode.slice(1)} directions to ${selectedPOI.name}`,
    });
  };

  const clearSelection = () => {
    setSelectedPOI(null);
    setShowDirections(false);
  };
  
  const resetMapView = () => {
    setCenter([6.9271, 79.8425]);
    setZoom(13);
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "attraction":
        return "🏛️";
      case "dining":
        return "🍽️";
      case "shopping":
        return "🛍️";
      case "park":
        return "🌳";
      default:
        return "📍";
    }
  };

  useEffect(() => {
    filterPOIs();
  }, [selectedCategory]);

  const toggleStreetView = () => {
    const newState = !enableStreetView;
    setEnableStreetView(newState);
    
    if (newState) {
      toast({
        title: "Street View Enabled",
        description: "Click on any marker or use the Street View control to open panorama view",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="py-6 bg-muted/50">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Maps & Navigation</h1>
          <p className="text-muted-foreground">Explore nearby places and get directions</p>
        </div>
      </div>
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                    <Input
                      placeholder="Search places..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <SearchIcon className="h-4 w-4" />
                    </Button>
                  </form>
                  
                  <div className="mb-6">
                    <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory}>
                      <TabsList className="w-full">
                        <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                        <TabsTrigger value="attraction" className="flex-1">Attractions</TabsTrigger>
                        <TabsTrigger value="dining" className="flex-1">Dining</TabsTrigger>
                        <TabsTrigger value="shopping" className="flex-1">Shopping</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Nearby Places</h3>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={resetMapView}>
                        <CompassIcon className="h-4 w-4 mr-1" /> Reset View
                      </Button>
                    </div>
                  </div>
                  
                  {/* Street View toggle */}
                  <div className="flex items-center justify-between mb-4 p-2 bg-muted/50 rounded-md">
                    <div className="flex items-center">
                      <StreetView className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Street View</span>
                    </div>
                    <Switch 
                      checked={enableStreetView} 
                      onCheckedChange={toggleStreetView}
                    />
                  </div>
                  
                  {pois.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No places found matching your criteria
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                      {pois.map((poi) => (
                        <div 
                          key={poi.id} 
                          className={`p-3 border rounded-md cursor-pointer transition-colors ${selectedPOI?.id === poi.id ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
                          onClick={() => {
                            setSelectedPOI(poi);
                            setCenter(poi.coordinates);
                            setZoom(16);
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-medium flex items-center">
                                <span className="mr-1.5">{getCategoryIcon(poi.category)}</span>
                                {poi.name}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center mt-1">
                                <MapPinIcon className="h-3 w-3 mr-1" />
                                {poi.location}
                              </div>
                            </div>
                            <Badge variant="outline">{poi.category}</Badge>
                          </div>
                          {poi.description && (
                            <p className="text-sm text-muted-foreground mt-2">{poi.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Directions</CardTitle>
                  <Button variant="ghost" size="icon" onClick={clearSelection}>
                    <XIcon className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="mb-4">
                    <p className="font-medium">{selectedPOI?.name}</p>
                    <div className="text-sm text-muted-foreground flex items-center mt-1">
                      <MapPinIcon className="h-3 w-3 mr-1" />
                      {selectedPOI?.location}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mb-4">
                    <Button 
                      variant={transportMode === "walking" ? "default" : "outline"} 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setTransportMode("walking")}
                    >
                      <WalkIcon className="h-4 w-4 mr-1.5" /> Walk
                    </Button>
                    <Button 
                      variant={transportMode === "public" ? "default" : "outline"} 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setTransportMode("public")}
                    >
                      <BusIcon className="h-4 w-4 mr-1.5" /> Public
                    </Button>
                    <Button 
                      variant={transportMode === "driving" ? "default" : "outline"} 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setTransportMode("driving")}
                    >
                      <CarIcon className="h-4 w-4 mr-1.5" /> Drive
                    </Button>
                  </div>
                  
                  <Button className="w-full" onClick={getDirections}>
                    Get Directions
                  </Button>

                  {showDirections && (
                    <div className="mt-4 bg-muted/50 p-3 rounded-md text-sm">
                      <p className="font-medium mb-1">Estimated Time: 15 minutes</p>
                      <ol className="space-y-2 pl-4 list-decimal">
                        <li>Head south on Main Street for 200m</li>
                        <li>Turn right onto Temple Road</li>
                        <li>Continue for 400m</li>
                        <li>Destination will be on your left</li>
                      </ol>
                      <p className="mt-3 text-xs text-muted-foreground">
                        Note: This is simulated direction data
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <SimpleMap
                    center={center}
                    zoom={zoom}
                    markers={[
                      ...pois.map((poi) => ({
                        position: poi.coordinates,
                        title: poi.name,
                        popup: `<b>${poi.name}</b><br>${poi.location}<br><i>${poi.description || ''}</i>`
                      })),
                      {
                        position: [6.9165, 79.8610],
                        title: "Your Location",
                        popup: "<b>You are here</b>"
                      }
                    ]}
                    className="h-[600px]"
                    showPathToSelected={selectedPOI ? {
                      destination: selectedPOI.coordinates,
                      mode: transportMode
                    } : undefined}
                    enableStreetView={enableStreetView}
                  />
                </CardContent>
              </Card>
              
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">Suggestions Near You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 flex items-start gap-3">
                      <span className="text-2xl">🍽️</span>
                      <div>
                        <h3 className="font-medium">Popular Restaurants</h3>
                        <p className="text-sm text-muted-foreground">5 within walking distance</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-start gap-3">
                      <span className="text-2xl">🏨</span>
                      <div>
                        <h3 className="font-medium">Hotels &amp; Stays</h3>
                        <p className="text-sm text-muted-foreground">10 nearby options</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-start gap-3">
                      <span className="text-2xl">🚑</span>
                      <div>
                        <h3 className="font-medium">Medical Services</h3>
                        <p className="text-sm text-muted-foreground">3 facilities nearby</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MapNavigation;
