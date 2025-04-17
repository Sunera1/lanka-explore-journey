
import { useEffect, useRef } from 'react';
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
}

export function SimpleMap({ 
  center, 
  zoom, 
  markers = [], 
  className = "h-[400px]",
  showPathToSelected
}: SimpleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const pathLayerRef = useRef<L.Polyline | null>(null);

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
    });
    
    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, markers]);

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

  return <div ref={mapRef} className={className}></div>;
}
