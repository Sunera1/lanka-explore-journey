
import { Button } from "@/components/ui/button";
import { PhoneIcon, AlertTriangleIcon, BadgeHelpIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function EmergencyCallout() {
  return (
    <section className="py-12 bg-destructive/10">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <AlertTriangleIcon className="h-12 w-12 text-destructive" />
            <div>
              <h2 className="text-2xl font-bold">Emergency Assistance</h2>
              <p className="text-muted-foreground">24/7 access to emergency services and help</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button variant="destructive" className="flex items-center" asChild>
              <Link to="tel:119">
                <PhoneIcon className="mr-2 h-4 w-4" />
                Call Police (119)
              </Link>
            </Button>
            <Button variant="outline" className="flex items-center" asChild>
              <Link to="/emergency">
                <BadgeHelpIcon className="mr-2 h-4 w-4" />
                Emergency Info
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
