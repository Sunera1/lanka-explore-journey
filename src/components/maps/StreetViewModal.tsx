
import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

interface StreetViewModalProps {
  position: [number, number];
  isOpen: boolean;
  onClose: () => void;
}

export function StreetViewModal({ position, isOpen, onClose }: StreetViewModalProps) {
  const streetViewRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isOpen || !streetViewRef.current || !window.google || !window.google.maps) return;
    
    const panorama = new window.google.maps.StreetViewPanorama(
      streetViewRef.current,
      {
        position: { lat: position[0], lng: position[1] },
        pov: { heading: 0, pitch: 0 },
        zoom: 1,
        addressControl: true,
        fullscreenControl: true,
        motionTracking: true,
      }
    );

    // Check if Street View is available at this position
    const streetViewService = new window.google.maps.StreetViewService();
    streetViewService.getPanorama(
      {
        location: { lat: position[0], lng: position[1] },
        radius: 50,
      },
      (data: any, status: string) => {
        if (status !== 'OK') {
          console.error('Street View not available at this location');
          // Show a user-friendly message
          if (streetViewRef.current) {
            streetViewRef.current.innerHTML = '<div class="flex items-center justify-center h-full bg-muted/20"><p class="text-center p-4">Street View not available for this location</p></div>';
          }
        }
      }
    );

    return () => {
      // Cleanup not needed as the component unmounts
    };
  }, [isOpen, position]);

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full h-full sm:w-4/5 sm:h-4/5 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Google Street View</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="rounded-full"
          >
            <XIcon className="h-5 w-5" />
          </Button>
        </div>
        <div ref={streetViewRef} className="flex-1"></div>
      </div>
    </div>
  );
}

// Add correct typings for Google Maps API
declare global {
  interface Window {
    google?: any;
  }
}
