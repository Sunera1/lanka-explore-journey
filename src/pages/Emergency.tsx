
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SimpleMap } from "@/components/maps/SimpleMap";
import { EmergencyContact } from "@/components/emergency/EmergencyContact";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PhoneIcon, 
  HeartPulseIcon, 
  ShieldAlertIcon, 
  HospitalIcon,
  BadgeHelpIcon,
  BuildingIcon,
  AlertTriangleIcon,
  User2Icon
} from "lucide-react";
import { useState } from "react";

const Emergency = () => {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const emergencyContacts = [
    {
      title: "Police Emergency",
      phone: "119",
      description: "National Police Emergency Service",
      icon: <ShieldAlertIcon className="h-5 w-5 text-blue-500" />,
      variant: "police" as const
    },
    {
      title: "Ambulance Service",
      phone: "110",
      description: "Emergency Medical Services",
      icon: <HeartPulseIcon className="h-5 w-5 text-red-500" />,
      variant: "medical" as const
    },
    {
      title: "Fire & Rescue",
      phone: "111",
      description: "Fire Brigade Emergency Service",
      icon: <AlertTriangleIcon className="h-5 w-5 text-orange-500" />,
      variant: "default" as const
    },
    {
      title: "Tourist Police",
      phone: "+94 11 242 1052",
      description: "Special assistance for tourists",
      icon: <User2Icon className="h-5 w-5 text-green-500" />,
      variant: "tourist" as const
    }
  ];

  const hospitals = [
    {
      title: "National Hospital of Sri Lanka",
      phone: "+94 11 269 1111",
      address: "Colombo 10",
      icon: <HospitalIcon className="h-5 w-5 text-red-500" />,
      variant: "medical" as const
    },
    {
      title: "Kandy General Hospital",
      phone: "+94 81 222 2261",
      address: "Kandy",
      icon: <HospitalIcon className="h-5 w-5 text-red-500" />,
      variant: "medical" as const
    }
  ];

  const embassies = [
    {
      title: "US Embassy",
      phone: "+94 11 249 8500",
      address: "Colombo 03",
      icon: <BuildingIcon className="h-5 w-5 text-muted-foreground" />,
      variant: "default" as const
    },
    {
      title: "British High Commission",
      phone: "+94 11 539 0639",
      address: "Colombo 01",
      icon: <BuildingIcon className="h-5 w-5 text-muted-foreground" />,
      variant: "default" as const
    }
  ];

  const getLocation = () => {
    setLocationLoading(true);
    setLocationError(null);
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]);
          setLocationLoading(false);
        },
        (error) => {
          console.error("Error getting location", error);
          setLocationError("Failed to get your location. Please enable location services.");
          setLocationLoading(false);
        }
      );
    } else {
      setLocationError("Location service not supported by your browser.");
      setLocationLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="py-6 bg-destructive/10">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Emergency Services</h1>
          <p className="text-muted-foreground">Quick access to emergency contacts and services in Sri Lanka</p>
        </div>
      </div>
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="mb-8 border-red-500/50">
                <CardHeader className="bg-red-500/10">
                  <div className="flex items-center gap-4">
                    <div className="bg-red-500 rounded-full p-3">
                      <AlertTriangleIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>Emergency SOS</CardTitle>
                      <CardDescription>Share your location with emergency services</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <p>In case of emergency, share your current location and call for immediate help.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button variant="destructive" size="lg" className="w-full" onClick={getLocation} disabled={locationLoading}>
                        {locationLoading ? "Getting Location..." : "Share My Location"}
                      </Button>
                      <Button variant="outline" size="lg" className="w-full" asChild>
                        <a href="tel:119">
                          <PhoneIcon className="mr-2 h-4 w-4" />
                          Call Emergency (119)
                        </a>
                      </Button>
                    </div>
                    
                    {locationError && (
                      <p className="text-sm text-destructive mt-2">{locationError}</p>
                    )}
                    
                    {location && (
                      <div className="mt-4">
                        <p className="text-sm mb-2">Your current location:</p>
                        <SimpleMap 
                          center={location} 
                          zoom={15}
                          markers={[{ position: location, title: "Your Location" }]} 
                          className="h-[200px] rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <h2 className="text-2xl font-bold mb-4">Emergency Numbers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {emergencyContacts.map((contact) => (
                  <EmergencyContact key={contact.title} {...contact} />
                ))}
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Major Hospitals</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {hospitals.map((hospital) => (
                  <EmergencyContact key={hospital.title} {...hospital} />
                ))}
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Embassies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {embassies.map((embassy) => (
                  <EmergencyContact key={embassy.title} {...embassy} />
                ))}
              </div>
            </div>
            
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BadgeHelpIcon className="h-5 w-5" />
                    Safety Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex gap-2">
                      <div className="min-w-[20px] text-primary">•</div>
                      <p className="text-sm">Keep emergency numbers saved in your phone</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="min-w-[20px] text-primary">•</div>
                      <p className="text-sm">Register with your country's embassy in Sri Lanka</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="min-w-[20px] text-primary">•</div>
                      <p className="text-sm">Have travel insurance with emergency coverage</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="min-w-[20px] text-primary">•</div>
                      <p className="text-sm">Stay hydrated and protect yourself from the sun</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="min-w-[20px] text-primary">•</div>
                      <p className="text-sm">Be careful when swimming due to strong currents</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="min-w-[20px] text-primary">•</div>
                      <p className="text-sm">Respect local customs and dress modestly at religious sites</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="min-w-[20px] text-primary">•</div>
                      <p className="text-sm">Keep a photocopy of your passport separate from the original</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Emergency;
