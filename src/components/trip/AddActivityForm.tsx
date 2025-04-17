
import { useState } from "react";
import { Activity } from "@/pages/TripPlanner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface AddActivityFormProps {
  tripStartDate: Date;
  tripEndDate: Date;
  onAddActivity: (activity: Omit<Activity, "id">) => void;
  onCancel: () => void;
}

export function AddActivityForm({ 
  tripStartDate, 
  tripEndDate, 
  onAddActivity, 
  onCancel 
}: AddActivityFormProps) {
  const [activityName, setActivityName] = useState("");
  const [activityType, setActivityType] = useState<Activity["type"]>("activity");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [notes, setNotes] = useState("");
  const [cost, setCost] = useState<string>("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activityName || !location || !date) return;
    
    onAddActivity({
      name: activityName,
      type: activityType,
      location,
      date,
      notes: notes || undefined,
      cost: cost ? parseFloat(cost) : undefined
    });
    
    // Reset form & close
    setActivityName("");
    setActivityType("activity");
    setLocation("");
    setDate(undefined);
    setNotes("");
    setCost("");
    onCancel();
  };
  
  const isValidForm = activityName && location && date;
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-medium mb-4">Add Activity</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="activity-name">Activity Name</Label>
          <Input 
            id="activity-name"
            value={activityName} 
            onChange={(e) => setActivityName(e.target.value)} 
            placeholder="Hotel check-in, Museum visit, etc." 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="activity-type">Activity Type</Label>
          <Select value={activityType} onValueChange={(value) => setActivityType(value as Activity["type"])}>
            <SelectTrigger id="activity-type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stay">Accommodation</SelectItem>
              <SelectItem value="food">Food & Dining</SelectItem>
              <SelectItem value="activity">Activity & Sightseeing</SelectItem>
              <SelectItem value="transportation">Transportation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location"
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            placeholder="Where is this activity?" 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => {
                  return date < tripStartDate || date > tripEndDate;
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cost">Cost (optional)</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5">$</span>
            <Input 
              id="cost"
              type="number" 
              value={cost} 
              onChange={(e) => setCost(e.target.value)} 
              placeholder="0.00"
              className="pl-7"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea 
          id="notes"
          value={notes} 
          onChange={(e) => setNotes(e.target.value)} 
          placeholder="Additional details about this activity..."
          rows={3}
        />
      </div>
      
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!isValidForm}>
          Add Activity
        </Button>
      </div>
    </form>
  );
}
