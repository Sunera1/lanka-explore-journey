
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface SimpleMapProps {
  center: [number, number];
  zoom: number;
  markers?: Array<{
    position: [number, number];
    title: string;
    popup?: string;
  }>;
  className?: string;
  showPathToSelected?: {
    destination: [number, number];
    mode: "walking" | "public" | "driving";
  };
  enableStreetView?: boolean;
}

export function SimpleMap({ 
  center, 
  zoom, 
  markers = [], 
  className = "h-[400px]",
  showPathToSelected,
  enableStreetView = false
}: SimpleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const pathLayerRef = useRef<L.Polyline | null>(null);
  const [streetViewActive, setStreetViewActive] = useState(false);
  const streetViewRef = useRef<HTMLDivElement>(null);

  // Initialize Google Maps API if Street View is enabled
  useEffect(() => {
    if (enableStreetView) {
      // Load Google Maps API dynamically
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY&libraries=places&callback=initGoogleMaps`;
      script.async = true;
      script.defer = true;
      
      window.initGoogleMaps = () => {
        console.log("Google Maps API loaded successfully");
      };
      
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
        delete window.initGoogleMaps;
      };
    }
  }, [enableStreetView]);

  useEffect(() => {
    if (!mapRef.current) return;
    
    // Fix for missing marker icons in Leaflet
    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = DefaultIcon;
    
    // Initialize map
    mapInstanceRef.current = L.map(mapRef.current).setView(center, zoom);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstanceRef.current);
    
    // Add markers if provided
    markers.forEach(marker => {
      const mapMarker = L.marker(marker.position).addTo(mapInstanceRef.current!);
      if (marker.popup) {
        mapMarker.bindPopup(marker.popup);
      } else if (marker.title) {
        mapMarker.bindPopup(marker.title);
      }

      // Add Street View button to marker popup if enabled
      if (enableStreetView) {
        mapMarker.on('click', () => {
          const container = document.createElement('div');
          const popupContent = marker.popup || marker.title;
          const streetViewButton = document.createElement('button');
          streetViewButton.textContent = "Open Street View";
          streetViewButton.className = "mt-2 bg-blue-500 text-white px-2 py-1 text-xs rounded";
          streetViewButton.onclick = (e) => {
            e.preventDefault();
            openStreetView(marker.position);
            mapMarker.closePopup();
          };
          
          container.innerHTML = `<div>${popupContent}</div>`;
          container.appendChild(streetViewButton);
          
          mapMarker.setPopupContent(container);
        });
      }
    });
    
    // Add Street View Control if enabled
    if (enableStreetView) {
      const streetViewControl = L.Control.extend({
        options: {
          position: 'topright'
        },
        onAdd: function() {
          const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
          const button = L.DomUtil.create('a', '', container);
          button.href = '#';
          button.title = 'Street View';
          button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`;
          button.style.display = 'flex';
          button.style.alignItems = 'center';
          button.style.justifyContent = 'center';
          button.style.width = '30px';
          button.style.height = '30px';
          
          L.DomEvent.on(button, 'click', function(e) {
            L.DomEvent.stopPropagation(e);
            L.DomEvent.preventDefault(e);
            
            // Get the center of the map for Street View
            const center = mapInstanceRef.current!.getCenter();
            openStreetView([center.lat, center.lng]);
          });
          
          return container;
        }
      });
      
      mapInstanceRef.current.addControl(new streetViewControl());
    }
    
    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, markers, enableStreetView]);

  // Effect to handle showing path to selected destination
  useEffect(() => {
    if (!mapInstanceRef.current || !showPathToSelected) return;
    
    // Clear previous path if exists
    if (pathLayerRef.current) {
      mapInstanceRef.current.removeLayer(pathLayerRef.current);
      pathLayerRef.current = null;
    }
    
    // For this demo, we'll create a simple line between your location and destination
    // In a real app, this would use a routing service API
    
    // Find user marker (assuming it's the last one for this demo)
    const userLocation = markers.length > 0 && markers[markers.length - 1].title === "Your Location" 
      ? markers[markers.length - 1].position 
      : center;
    
    // Create path with different styles based on transport mode
    let pathColor: string;
    let pathStyle: "solid" | "dashed";
    
    switch(showPathToSelected.mode) {
      case "walking":
        pathColor = "#4CAF50"; // Green for walking
        pathStyle = "solid";
        break;
      case "public":
        pathColor = "#2196F3"; // Blue for public transport
        pathStyle = "dashed";
        break;
      case "driving":
        pathColor = "#FF9800"; // Orange for driving
        pathStyle = "solid";
        break;
      default:
        pathColor = "#757575";
        pathStyle = "solid";
    }
    
    // Create a simple path for demo purposes
    // In a real app, you'd use waypoints from a routing API
    const pathOptions: L.PolylineOptions = {
      color: pathColor,
      weight: 5,
      opacity: 0.7,
      dashArray: pathStyle === "dashed" ? "10, 10" : undefined
    };
    
    // For the demo, create a curved line instead of straight
    // to simulate an actual route
    const controlPoint = getMidPoint(userLocation, showPathToSelected.destination);
    const curvedPath = getCurvedPath(userLocation, showPathToSelected.destination, controlPoint);
    
    pathLayerRef.current = L.polyline(curvedPath, pathOptions).addTo(mapInstanceRef.current);
    
    // Fit the map to show the entire path
    mapInstanceRef.current.fitBounds(pathLayerRef.current.getBounds(), {
      padding: [30, 30],
      maxZoom: 16
    });
    
  }, [showPathToSelected, center, markers]);

  // Helper function to get a midpoint with some offset to create a curve
  const getMidPoint = (start: [number, number], end: [number, number]): [number, number] => {
    const midX = (start[0] + end[0]) / 2;
    const midY = (start[1] + end[1]) / 2;
    
    // Add some offset to create a curve
    const offsetX = (end[1] - start[1]) * 0.05;
    const offsetY = (start[0] - end[0]) * 0.05;
    
    return [midX + offsetX, midY + offsetY];
  };

  // Helper function to create a curved path with multiple points
  const getCurvedPath = (
    start: [number, number], 
    end: [number, number], 
    controlPoint: [number, number]
  ): [number, number][] => {
    const path: [number, number][] = [];
    
    // Add start point
    path.push(start);
    
    // Add intermediate points to create a curved effect
    for (let i = 1; i < 10; i++) {
      const t = i / 10;
      const x = (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * controlPoint[0] + t * t * end[0];
      const y = (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * controlPoint[1] + t * t * end[1];
      path.push([x, y]);
    }
    
    // Add end point
    path.push(end);
    
    return path;
  };

  // Function to open Google Street View
  const openStreetView = (position: [number, number]) => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API not loaded");
      return;
    }

    setStreetViewActive(true);
    
    // Create a Street View instance
    setTimeout(() => {
      if (streetViewRef.current) {
        const panorama = new window.google.maps.StreetViewPanorama(
          streetViewRef.current,
          {
            position: { lat: position[0], lng: position[1] },
            pov: { heading: 0, pitch: 0 },
            zoom: 1,
            addressControl: true,
            fullscreenControl: true,
          }
        );
        
        // Add close button
        const closeButton = document.createElement('button');
        closeButton.textContent = "✕";
        closeButton.className = "absolute top-2 right-2 bg-white rounded-full w-8 h-8 shadow-md z-10";
        closeButton.onclick = () => setStreetViewActive(false);
        streetViewRef.current.appendChild(closeButton);
      }
    }, 300);
  };

  return (
    <div className="relative">
      <div ref={mapRef} className={className}></div>
      {streetViewActive && (
        <div className="absolute inset-0 z-10">
          <div ref={streetViewRef} className={className}></div>
        </div>
      )}
    </div>
  );
}

// Add correct typings for Google Maps API
declare global {
  interface Window {
    google?: any;
    initGoogleMaps?: () => void;
  }
}
