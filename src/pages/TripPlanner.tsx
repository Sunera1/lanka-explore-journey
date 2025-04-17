
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { 
  CalendarIcon, 
  MapPinIcon, 
  PlusIcon, 
  Share2Icon, 
  TrashIcon, 
  GlobeIcon,
  BedIcon,
  UtensilsIcon,
  MuseumIcon,
  DollarSignIcon
} from "lucide-react";
import { TripList } from "@/components/trip/TripList";
import { ItineraryBuilder } from "@/components/trip/ItineraryBuilder";
import { TripDetails } from "@/components/trip/TripDetails";
import { Badge } from "@/components/ui/badge";
import { ShareTripModal } from "@/components/trip/ShareTripModal";

const TripPlanner = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("my-trips");
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  
  // Sample trip data
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: "trip-1",
      name: "Sri Lanka Adventure",
      startDate: new Date("2025-06-10"),
      endDate: new Date("2025-06-18"),
      destinations: ["Colombo", "Kandy", "Ella"],
      status: "upcoming",
      activities: [
        { id: "act-1", type: "stay", name: "Shangrila Hotel", location: "Colombo", date: new Date("2025-06-10"), notes: "5-star hotel with ocean view", cost: 120 },
        { id: "act-2", type: "activity", name: "Colombo City Tour", location: "Colombo", date: new Date("2025-06-11"), notes: "Full day guided tour", cost: 45 },
        { id: "act-3", type: "food", name: "Dinner at Ministry of Crab", location: "Colombo", date: new Date("2025-06-11"), notes: "Famous seafood restaurant", cost: 60 },
        { id: "act-4", type: "transportation", name: "Train to Kandy", location: "From Colombo to Kandy", date: new Date("2025-06-12"), notes: "Scenic train ride", cost: 15 },
      ]
    },
    {
      id: "trip-2",
      name: "Weekend in Galle",
      startDate: new Date("2025-05-15"),
      endDate: new Date("2025-05-17"),
      destinations: ["Galle"],
      status: "upcoming",
      activities: []
    }
  ]);

  const handleCreateTrip = (newTrip: Omit<Trip, "id" | "activities">) => {
    const trip: Trip = {
      ...newTrip,
      id: `trip-${Date.now()}`,
      activities: []
    };
    
    setTrips(prev => [...prev, trip]);
    toast({
      title: "Trip created!",
      description: `${newTrip.name} has been added to your trips.`
    });
    setActiveTab("my-trips");
  };

  const handleDeleteTrip = (tripId: string) => {
    setTrips(trips.filter(trip => trip.id !== tripId));
    if (selectedTrip?.id === tripId) {
      setSelectedTrip(null);
    }
    toast({
      title: "Trip deleted",
      description: "Your trip has been deleted."
    });
  };

  const handleAddActivity = (tripId: string, activity: Omit<Activity, "id">) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          activities: [...trip.activities, { ...activity, id: `act-${Date.now()}` }]
        };
      }
      return trip;
    }));
    
    toast({
      title: "Activity added",
      description: `${activity.name} has been added to your trip.`
    });
  };

  const handleDeleteActivity = (tripId: string, activityId: string) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          activities: trip.activities.filter(activity => activity.id !== activityId)
        };
      }
      return trip;
    }));
  };

  const handleShareTrip = (trip: Trip) => {
    setSelectedTrip(trip);
    setShareModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="py-6 bg-muted/50">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Trip Planner</h1>
          <p className="text-muted-foreground">Plan your perfect itinerary</p>
        </div>
      </div>
      
      <main className="flex-1 py-8">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="my-trips">My Trips</TabsTrigger>
                <TabsTrigger value="create">Create Trip</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              </TabsList>
              
              {activeTab === "my-trips" && selectedTrip && (
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleShareTrip(selectedTrip)}
                  >
                    <Share2Icon className="w-4 h-4 mr-2" />
                    Share Trip
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDeleteTrip(selectedTrip.id)}
                  >
                    <TrashIcon className="w-4 h-4 mr-2" />
                    Delete Trip
                  </Button>
                </div>
              )}
            </div>
            
            <TabsContent value="my-trips" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <TripList 
                    trips={trips} 
                    selectedTripId={selectedTrip?.id} 
                    onSelectTrip={(trip) => setSelectedTrip(trip)}
                  />
                </div>
                
                <div className="md:col-span-2">
                  {selectedTrip ? (
                    <TripDetails 
                      trip={selectedTrip} 
                      onAddActivity={(activity) => handleAddActivity(selectedTrip.id, activity)}
                      onDeleteActivity={(activityId) => handleDeleteActivity(selectedTrip.id, activityId)}
                    />
                  ) : (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center py-12">
                          <GlobeIcon className="w-12 h-12 mx-auto text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">Select a trip</h3>
                          <p className="text-muted-foreground mt-2">
                            Choose a trip from the list or create a new one
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="create">
              <ItineraryBuilder onCreateTrip={handleCreateTrip} />
            </TabsContent>
            
            <TabsContent value="suggestions">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPinIcon className="w-5 h-5 mr-2 text-primary" />
                      Top Destinations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                        <div>
                          <h4 className="font-medium">Yala National Park</h4>
                          <p className="text-sm text-muted-foreground">Wildlife Safari</p>
                        </div>
                        <Badge variant="outline">Nature</Badge>
                      </li>
                      <li className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                        <div>
                          <h4 className="font-medium">Sigiriya Rock</h4>
                          <p className="text-sm text-muted-foreground">Ancient fortress</p>
                        </div>
                        <Badge variant="outline">Historical</Badge>
                      </li>
                      <li className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                        <div>
                          <h4 className="font-medium">Mirissa Beach</h4>
                          <p className="text-sm text-muted-foreground">Whale watching</p>
                        </div>
                        <Badge variant="outline">Beach</Badge>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BedIcon className="w-5 h-5 mr-2 text-primary" />
                      Recommended Stays
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                        <div>
                          <h4 className="font-medium">Kingsbury Hotel</h4>
                          <p className="text-sm text-muted-foreground">Colombo</p>
                        </div>
                        <Badge>$$$</Badge>
                      </li>
                      <li className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                        <div>
                          <h4 className="font-medium">Cinnamon Wild</h4>
                          <p className="text-sm text-muted-foreground">Yala</p>
                        </div>
                        <Badge>$$$$</Badge>
                      </li>
                      <li className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                        <div>
                          <h4 className="font-medium">Galle Fort Hotel</h4>
                          <p className="text-sm text-muted-foreground">Galle</p>
                        </div>
                        <Badge>$$$</Badge>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <UtensilsIcon className="w-5 h-5 mr-2 text-primary" />
                      Popular Experiences
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                        <div>
                          <h4 className="font-medium">Tea Plantation Tour</h4>
                          <p className="text-sm text-muted-foreground">Nuwara Eliya</p>
                        </div>
                        <Badge variant="outline">$$</Badge>
                      </li>
                      <li className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                        <div>
                          <h4 className="font-medium">Sri Lankan Cooking Class</h4>
                          <p className="text-sm text-muted-foreground">Colombo</p>
                        </div>
                        <Badge variant="outline">$$</Badge>
                      </li>
                      <li className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                        <div>
                          <h4 className="font-medium">Elephant Safari</h4>
                          <p className="text-sm text-muted-foreground">Udawalawe</p>
                        </div>
                        <Badge variant="outline">$$$</Badge>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <ShareTripModal 
        isOpen={shareModalOpen} 
        onClose={() => setShareModalOpen(false)}
        trip={selectedTrip}
      />
      
      <Footer />
    </div>
  );
};

export default TripPlanner;

// Types for Trip Planner
export interface Trip {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  destinations: string[];
  status: 'upcoming' | 'ongoing' | 'completed';
  activities: Activity[];
}

export interface Activity {
  id: string;
  name: string;
  type: 'stay' | 'food' | 'activity' | 'transportation';
  location: string;
  date: Date;
  notes?: string;
  cost?: number;
}
