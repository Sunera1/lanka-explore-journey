
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Copy, 
  Mail 
} from "lucide-react";
import { Trip } from "@/pages/TripPlanner";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ShareTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip | null;
}

export function ShareTripModal({ isOpen, onClose, trip }: ShareTripModalProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const { toast } = useToast();
  
  if (!trip) return null;
  
  const shareUrl = `https://travelsrilanka.com/trip/${trip.id}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopySuccess(true);
    
    setTimeout(() => setCopySuccess(false), 2000);
    
    toast({
      title: "Link copied!",
      description: "Share link copied to clipboard"
    });
  };
  
  const handleShare = (platform: string) => {
    toast({
      title: `Shared on ${platform}!`,
      description: "This is a demo feature."
    });
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share your trip</DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center mt-4 space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              value={shareUrl}
              readOnly
              className="w-full"
            />
          </div>
          <Button type="submit" size="sm" onClick={handleCopyLink} className="px-3">
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-col gap-4 mt-4">
          <h4 className="text-sm font-medium">Share on social media</h4>
          <div className="flex gap-2">
            <Button 
              onClick={() => handleShare('Facebook')} 
              variant="outline" 
              size="icon" 
              className="rounded-full"
            >
              <Facebook className="h-5 w-5 text-blue-600" />
            </Button>
            <Button 
              onClick={() => handleShare('Twitter')} 
              variant="outline" 
              size="icon" 
              className="rounded-full"
            >
              <Twitter className="h-5 w-5 text-blue-400" />
            </Button>
            <Button 
              onClick={() => handleShare('Instagram')} 
              variant="outline" 
              size="icon" 
              className="rounded-full"
            >
              <Instagram className="h-5 w-5 text-pink-600" />
            </Button>
            <Button 
              onClick={() => handleShare('Email')} 
              variant="outline" 
              size="icon" 
              className="rounded-full"
            >
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-start">
          <Button variant="secondary" onClick={onClose}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
