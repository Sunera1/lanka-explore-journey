
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SimpleMap } from "@/components/maps/SimpleMap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  BusIcon, 
  TrainFrontIcon, 
  CarIcon, 
  SearchIcon, 
  NavigationIcon, 
  TimerIcon,
  CreditCardIcon,
  CalendarIcon
} from "lucide-react";

interface TransportRoute {
  id: string;
  type: "bus" | "train" | "taxi";
  name: string;
  from: string;
  to: string;
  duration: string;
  fare: number;
  schedule: string;
  frequency?: string;
  description?: string;
}

const routes: TransportRoute[] = [
  {
    id: "b1",
    type: "bus",
    name: "Colombo - Kandy Express",
    from: "Colombo Central Bus Station",
    to: "Kandy Bus Terminal",
    duration: "3h 30m",
    fare: 300,
    schedule: "5:00 AM - 8:00 PM",
    frequency: "Every 30 minutes",
    description: "AC bus service with comfortable seating."
  },
  {
    id: "b2",
    type: "bus",
    name: "Colombo - Galle Express",
    from: "Colombo Central Bus Station",
    to: "Galle Bus Terminal",
    duration: "2h 45m",
    fare: 250,
    schedule: "6:00 AM - 7:00 PM",
    frequency: "Every 45 minutes"
  },
  {
    id: "b3",
    type: "bus",
    name: "Kandy - Nuwara Eliya",
    from: "Kandy Bus Terminal",
    to: "Nuwara Eliya Bus Stop",
    duration: "2h 15m",
    fare: 200,
    schedule: "7:00 AM - 6:00 PM",
    frequency: "Every hour"
  },
  {
    id: "t1",
    type: "train",
    name: "Colombo - Kandy Express",
    from: "Colombo Fort Station",
    to: "Kandy Station",
    duration: "2h 45m",
    fare: 350,
    schedule: "6:15 AM, 9:45 AM, 1:35 PM, 5:00 PM",
    description: "Scenic train journey with refreshments available."
  },
  {
    id: "t2",
    type: "train",
    name: "Kandy - Ella Scenic Train",
    from: "Kandy Station",
    to: "Ella Station",
    duration: "6h 30m",
    fare: 400,
    schedule: "8:30 AM, 11:10 AM",
    description: "One of the most scenic train journeys in the world, passing through tea plantations."
  },
  {
    id: "tx1",
    type: "taxi",
    name: "Colombo Airport Transfer",
    from: "Bandaranaike Airport",
    to: "Colombo City",
    duration: "50m",
    fare: 3000,
    schedule: "24/7",
    description: "Convenient private transfer between airport and Colombo city center."
  },
  {
    id: "tx2",
    type: "taxi",
    name: "Colombo - Galle Private Car",
    from: "Colombo",
    to: "Galle",
    duration: "2h",
    fare: 8000,
    schedule: "24/7",
    description: "Private car service with AC and experienced driver."
  },
];

const Transport = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState<TransportRoute[]>(routes);

  useEffect(() => {
    const type = searchParams.get('type');
    
    if (type) {
      setActiveTab(type);
      filterRoutes(type, searchQuery);
    } else {
      filterRoutes(activeTab, searchQuery);
    }
  }, [searchParams, activeTab, searchQuery]);

  const filterRoutes = (tab: string, query: string) => {
    let filtered = routes;
    
    // Filter by type
    if (tab !== 'all') {
      filtered = filtered.filter(route => route.type === tab);
    }
    
    // Filter by search query
    if (query.trim() !== '') {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(route => 
        route.name.toLowerCase().includes(lowerQuery) || 
        route.from.toLowerCase().includes(lowerQuery) ||
        route.to.toLowerCase().includes(lowerQuery)
      );
    }
    
    setFilteredRoutes(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterRoutes(activeTab, searchQuery);
  };

  const getIconByType = (type: string) => {
    switch(type) {
      case 'bus':
        return <BusIcon className="h-5 w-5 text-primary" />;
      case 'train':
        return <TrainFrontIcon className="h-5 w-5 text-secondary" />;
      case 'taxi':
        return <CarIcon className="h-5 w-5 text-accent" />;
      default:
        return <NavigationIcon className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="py-6 bg-muted/50">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Transport Options</h1>
          <p className="text-muted-foreground">Find the best way to get around Sri Lanka</p>
        </div>
      </div>
      
      <main className="flex-1 py-8">
        <div className="container">
          <form onSubmit={handleSearch} className="flex items-center gap-4 mb-6">
            <Input
              placeholder="Search routes, destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
            <Button type="submit">
              <SearchIcon className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All Transport</TabsTrigger>
              <TabsTrigger value="bus">
                <BusIcon className="h-4 w-4 mr-2" />
                Buses
              </TabsTrigger>
              <TabsTrigger value="train">
                <TrainFrontIcon className="h-4 w-4 mr-2" />
                Trains
              </TabsTrigger>
              <TabsTrigger value="taxi">
                <CarIcon className="h-4 w-4 mr-2" />
                Taxis & Tuk-tuks
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRoutes.length === 0 ? (
              <div className="col-span-2 text-center py-12">
                <p className="text-lg text-muted-foreground">No routes found matching your search criteria.</p>
                <Button variant="outline" className="mt-4" onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                  setFilteredRoutes(routes);
                }}>Clear Search</Button>
              </div>
            ) : (
              filteredRoutes.map((route) => (
                <Card key={route.id} className="overflow-hidden">
                  <CardHeader className="border-b bg-muted/30 pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          {getIconByType(route.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{route.name}</CardTitle>
                          <CardDescription>{route.type === 'taxi' ? 'Private Transport' : 'Public Transport'}</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold">Rs. {route.fare}</span>
                        <p className="text-xs text-muted-foreground">per person</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex items-center mb-4">
                      <div className="min-w-[24px] flex justify-center">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                      </div>
                      <div className="ml-2">
                        <p className="font-medium">{route.from}</p>
                      </div>
                    </div>
                    <div className="flex items-center my-1 pl-3">
                      <div className="min-w-[18px] flex justify-center">
                        <div className="w-0.5 h-10 bg-muted"></div>
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <TimerIcon className="h-3 w-3 mr-1" />
                          {route.duration} journey
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="min-w-[24px] flex justify-center">
                        <div className="w-3 h-3 rounded-full bg-destructive"></div>
                      </div>
                      <div className="ml-2">
                        <p className="font-medium">{route.to}</p>
                      </div>
                    </div>
                    
                    {route.description && (
                      <p className="text-sm text-muted-foreground mb-4">{route.description}</p>
                    )}
                    
                    <div className="flex flex-col sm:flex-row gap-3 text-sm">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{route.schedule}</span>
                      </div>
                      
                      {route.frequency && (
                        <div className="flex items-center sm:ml-4">
                          <TimerIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{route.frequency}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/30 flex justify-between pt-3">
                    <div className="flex items-center text-sm">
                      <CreditCardIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{route.type === 'taxi' ? 'Pay driver directly' : 'Buy ticket at station'}</span>
                    </div>
                    <Button size="sm" variant={route.type === 'taxi' ? 'default' : 'outline'}>
                      {route.type === 'taxi' ? 'Book Now' : 'View Details'}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Transport Map</h2>
            <Card>
              <CardContent className="p-4">
                <SimpleMap 
                  center={[7.8731, 80.7718]} 
                  zoom={7.5} 
                  className="h-[500px] rounded-md"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Transport;
