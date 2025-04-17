
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, PlusIcon, XIcon } from "lucide-react";
import { Trip } from "@/pages/TripPlanner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ItineraryBuilderProps {
  onCreateTrip: (trip: Omit<Trip, "id" | "activities">) => void;
}

export function ItineraryBuilder({ onCreateTrip }: ItineraryBuilderProps) {
  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [destination, setDestination] = useState("");
  const [destinations, setDestinations] = useState<string[]>([]);
  const [dateOpen, setDateOpen] = useState(false);
  
  const handleAddDestination = () => {
    if (destination.trim() !== "") {
      setDestinations([...destinations, destination.trim()]);
      setDestination("");
    }
  };
  
  const handleRemoveDestination = (index: number) => {
    setDestinations(destinations.filter((_, i) => i !== index));
  };
  
  const handleCreateTrip = () => {
    if (!tripName || !startDate || !endDate || destinations.length === 0) return;
    
    onCreateTrip({
      name: tripName,
      startDate,
      endDate,
      destinations,
      status: "upcoming"
    });
    
    // Reset form
    setTripName("");
    setStartDate(undefined);
    setEndDate(undefined);
    setDestinations([]);
  };
  
  const isValidForm = tripName && startDate && endDate && destinations.length > 0;
  
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Trip</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Trip Name</label>
            <Input 
              value={tripName} 
              onChange={(e) => setTripName(e.target.value)} 
              placeholder="Summer Vacation" 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <Popover open={dateOpen} onOpenChange={setDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick a start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => {
                      setStartDate(date);
                      setDateOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick an end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => {
                      return startDate ? date < startDate : false;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Destinations</label>
            <div className="flex space-x-2">
              <Input 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)} 
                placeholder="Add a destination" 
                onKeyDown={(e) => e.key === "Enter" && handleAddDestination()}
              />
              <Button type="button" onClick={handleAddDestination} size="icon">
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
            
            {destinations.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {destinations.map((dest, index) => (
                  <div key={index} className="flex items-center bg-muted rounded-full pl-3 pr-1 py-1">
                    <span className="text-sm">{dest}</span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 ml-1 hover:bg-muted-foreground/20 rounded-full"
                      onClick={() => handleRemoveDestination(index)}
                    >
                      <XIcon className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="pt-4">
            <Button 
              className="w-full" 
              onClick={handleCreateTrip} 
              disabled={!isValidForm}
            >
              Create Trip
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
