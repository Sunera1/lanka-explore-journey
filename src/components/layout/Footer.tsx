
import { Link } from "react-router-dom";
import { MapIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-primary rounded-full p-1">
                <MapIcon className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">LankaGo</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your all-in-one travel companion for exploring the beautiful island of Sri Lanka.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/destinations" className="text-muted-foreground hover:text-foreground">Destinations</Link></li>
              <li><Link to="/accommodations" className="text-muted-foreground hover:text-foreground">Accommodations</Link></li>
              <li><Link to="/transport" className="text-muted-foreground hover:text-foreground">Transport</Link></li>
              <li><Link to="/emergency" className="text-muted-foreground hover:text-foreground">Emergency</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/destinations?category=beaches" className="text-muted-foreground hover:text-foreground">Beaches</Link></li>
              <li><Link to="/destinations?category=cultural" className="text-muted-foreground hover:text-foreground">Cultural Sites</Link></li>
              <li><Link to="/destinations?category=wildlife" className="text-muted-foreground hover:text-foreground">Wildlife</Link></li>
              <li><Link to="/destinations?category=mountains" className="text-muted-foreground hover:text-foreground">Mountains</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/emergency" className="text-muted-foreground hover:text-foreground">Emergency Contacts</Link></li>
              <li><Link to="/support" className="text-muted-foreground hover:text-foreground">Customer Support</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQs</Link></li>
              <li><Link to="/safety" className="text-muted-foreground hover:text-foreground">Safety Tips</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} LankaGo. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground">Terms of Service</Link>
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link to="/cookies" className="text-xs text-muted-foreground hover:text-foreground">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
