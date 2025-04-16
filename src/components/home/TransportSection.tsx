
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightIcon, BusIcon, CarIcon, TrainFrontIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function TransportSection() {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Transport Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <BusIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Public Buses</CardTitle>
              <CardDescription>Extensive network covering the whole island</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sri Lanka has a comprehensive bus service that connects all major cities and towns. 
                Buses are the most affordable way to get around.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" asChild>
                <Link to="/transport?type=bus" className="flex items-center">
                  View Routes <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                <TrainFrontIcon className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>Scenic Trains</CardTitle>
              <CardDescription>Iconic journeys through stunning landscapes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The train journey from Kandy to Ella is regarded as one of the most scenic in the world, 
                passing through tea plantations and mountains.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" asChild>
                <Link to="/transport?type=train" className="flex items-center">
                  View Schedules <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <CarIcon className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Tuk-tuks & Taxis</CardTitle>
              <CardDescription>Convenient rides for shorter distances</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Tuk-tuks are everywhere and offer a fun way to get around cities. 
                Taxis provide more comfort for longer journeys.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" asChild>
                <Link to="/transport?type=taxi" className="flex items-center">
                  Find Rides <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
