
import { format } from "date-fns";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { Trip } from "@/pages/TripPlanner";

interface TripListProps {
  trips: Trip[];
  selectedTripId: string | undefined;
  onSelectTrip: (trip: Trip) => void;
}

export function TripList({ trips, selectedTripId, onSelectTrip }: TripListProps) {
  const upcomingTrips = trips.filter(trip => trip.status === 'upcoming');
  const otherTrips = trips.filter(trip => trip.status !== 'upcoming');
  
  const getStatusColor = (status: Trip['status']) => {
    switch (status) {
      case 'ongoing':
        return 'bg-green-500';
      case 'upcoming':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const renderTrip = (trip: Trip) => (
    <div 
      key={trip.id}
      className={`p-4 border rounded-lg cursor-pointer transition hover:border-primary hover:bg-muted/50 ${trip.id === selectedTripId ? 'border-primary bg-muted/50' : ''}`}
      onClick={() => onSelectTrip(trip)}
    >
      <div className="flex justify-between">
        <h3 className="font-medium">{trip.name}</h3>
        <div className={`w-2 h-2 rounded-full ${getStatusColor(trip.status)}`} />
      </div>
      
      <div className="flex items-center mt-2 text-sm text-muted-foreground">
        <CalendarIcon className="w-3 h-3 mr-1" />
        <span>
          {format(trip.startDate, "MMM d")} - {format(trip.endDate, "MMM d, yyyy")}
        </span>
      </div>
      
      <div className="flex items-center mt-1 text-sm text-muted-foreground">
        <MapPinIcon className="w-3 h-3 mr-1" />
        <span>{trip.destinations.join(", ")}</span>
      </div>
      
      {trip.activities.length > 0 && (
        <div className="mt-2 text-xs">
          <span className="text-muted-foreground">{trip.activities.length} activities planned</span>
        </div>
      )}
    </div>
  );
  
  return (
    <div className="space-y-6">
      {upcomingTrips.length > 0 && (
        <div>
          <h3 className="font-medium mb-3">Upcoming Trips</h3>
          <div className="space-y-3">
            {upcomingTrips.map(renderTrip)}
          </div>
        </div>
      )}
      
      {otherTrips.length > 0 && (
        <div>
          <h3 className="font-medium mb-3">Past & Ongoing Trips</h3>
          <div className="space-y-3">
            {otherTrips.map(renderTrip)}
          </div>
        </div>
      )}
      
      {trips.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>You don't have any trips yet.</p>
          <p>Create your first trip to get started!</p>
        </div>
      )}
    </div>
  );
}
