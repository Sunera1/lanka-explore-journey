
import { useState } from "react";
import { format } from "date-fns";
import { Activity, Trip } from "@/pages/TripPlanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar as CalendarIcon, 
  MapPinIcon, 
  PlusCircleIcon, 
  TrashIcon,
  BedIcon,
  UtensilsIcon,
  MapIcon,
  TicketIcon
} from "lucide-react";
import { AddActivityForm } from "./AddActivityForm";

interface TripDetailsProps {
  trip: Trip;
  onAddActivity: (activity: Omit<Activity, "id">) => void;
  onDeleteActivity: (activityId: string) => void;
}

export function TripDetails({ trip, onAddActivity, onDeleteActivity }: TripDetailsProps) {
  const [showAddActivity, setShowAddActivity] = useState(false);
  
  // Group activities by date
  const activitiesByDate = trip.activities.reduce((acc, activity) => {
    const dateKey = format(activity.date, "yyyy-MM-dd");
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);
  
  // Sort dates
  const sortedDates = Object.keys(activitiesByDate).sort();
  
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "stay":
        return <BedIcon className="h-4 w-4 text-blue-500" />;
      case "food":
        return <UtensilsIcon className="h-4 w-4 text-orange-500" />;
      case "activity":
        return <TicketIcon className="h-4 w-4 text-green-500" />;
      case "transportation":
        return <MapIcon className="h-4 w-4 text-purple-500" />;
    }
  };
  
  const getTotalCost = () => {
    return trip.activities.reduce((sum, activity) => sum + (activity.cost || 0), 0);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{trip.name}</CardTitle>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <CalendarIcon className="w-3 h-3 mr-1" />
                <span>
                  {format(trip.startDate, "MMM d")} - {format(trip.endDate, "MMM d, yyyy")}
                </span>
              </div>
            </div>
            <Badge variant="outline">
              {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <MapPinIcon className="w-4 h-4 mr-1 text-muted-foreground" />
            <span>{trip.destinations.join(" • ")}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-muted-foreground">
                {trip.activities.length} activities planned
              </span>
              {getTotalCost() > 0 && (
                <span className="ml-4 text-sm font-medium">
                  Estimated cost: ${getTotalCost()}
                </span>
              )}
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setShowAddActivity(!showAddActivity)}
            >
              <PlusCircleIcon className="w-4 h-4 mr-2" />
              Add Activity
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {showAddActivity && (
        <Card>
          <CardContent className="pt-6">
            <AddActivityForm 
              tripStartDate={trip.startDate}
              tripEndDate={trip.endDate}
              onAddActivity={onAddActivity}
              onCancel={() => setShowAddActivity(false)}
            />
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="itinerary">
        <TabsList>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
        </TabsList>
        <TabsContent value="itinerary" className="pt-4">
          {sortedDates.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <CalendarIcon className="w-10 h-10 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No activities yet</h3>
                  <p className="text-muted-foreground mt-2">
                    Add activities to build your itinerary
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {sortedDates.map(dateKey => {
                const activities = activitiesByDate[dateKey];
                const date = new Date(dateKey);
                
                return (
                  <Card key={dateKey}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        {format(date, "EEEE, MMMM d, yyyy")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {activities.map(activity => (
                          <li key={activity.id} className="flex items-start justify-between p-3 bg-muted/50 rounded-md">
                            <div className="flex items-start">
                              <div className="mt-1 mr-3">
                                {getActivityIcon(activity.type)}
                              </div>
                              <div>
                                <h4 className="font-medium">{activity.name}</h4>
                                <p className="text-sm text-muted-foreground">{activity.location}</p>
                                {activity.notes && (
                                  <p className="text-xs text-muted-foreground mt-1">{activity.notes}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              {activity.cost !== undefined && (
                                <span className="text-sm font-medium">${activity.cost}</span>
                              )}
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-6 w-6 mt-1"
                                onClick={() => onDeleteActivity(activity.id)}
                              >
                                <TrashIcon className="h-3 w-3" />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
        <TabsContent value="map" className="pt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <MapPinIcon className="w-10 h-10 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Map View Coming Soon</h3>
                <p className="text-muted-foreground mt-2">
                  We're working on a map view for your itinerary!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
