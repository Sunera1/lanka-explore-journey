
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneIcon, MapPinIcon, InfoIcon } from "lucide-react";

interface EmergencyContactProps {
  title: string;
  phone: string;
  description?: string;
  address?: string;
  icon: React.ReactNode;
  variant?: "default" | "police" | "medical" | "tourist";
}

const variantStyles = {
  default: "border-l-4 border-muted",
  police: "border-l-4 border-blue-500",
  medical: "border-l-4 border-red-500",
  tourist: "border-l-4 border-green-500",
};

export function EmergencyContact({
  title,
  phone,
  description,
  address,
  icon,
  variant = "default"
}: EmergencyContactProps) {
  return (
    <Card className={`${variantStyles[variant]} shadow-sm`}>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center">
            <PhoneIcon className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="font-medium">{phone}</span>
          </div>
          {address && (
            <div className="flex items-center">
              <MapPinIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{address}</span>
            </div>
          )}
          <Button variant="secondary" className="mt-2 w-full" asChild>
            <a href={`tel:${phone.replace(/\s/g, '')}`}>
              <PhoneIcon className="h-4 w-4 mr-2" />
              Call Now
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
