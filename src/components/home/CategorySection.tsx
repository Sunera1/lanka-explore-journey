
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Palmtree, 
  LandmarkIcon, 
  MountainSnowIcon, 
  UtensilsIcon,
  HeartIcon,
  Waves
} from "lucide-react";

const categories = [
  {
    name: "Beaches",
    icon: <Waves className="h-6 w-6" />,
    color: "bg-secondary/20",
    textColor: "text-secondary",
    link: "/destinations?category=beaches"
  },
  {
    name: "Cultural Sites",
    icon: <LandmarkIcon className="h-6 w-6" />,
    color: "bg-primary/20",
    textColor: "text-primary",
    link: "/destinations?category=cultural"
  },
  {
    name: "Wildlife",
    icon: <Palmtree className="h-6 w-6" />,
    color: "bg-green-500/20",
    textColor: "text-green-500",
    link: "/destinations?category=wildlife"
  },
  {
    name: "Mountains",
    icon: <MountainSnowIcon className="h-6 w-6" />,
    color: "bg-orange-500/20",
    textColor: "text-orange-500",
    link: "/destinations?category=mountains"
  },
  {
    name: "Food",
    icon: <UtensilsIcon className="h-6 w-6" />,
    color: "bg-red-500/20",
    textColor: "text-red-500",
    link: "/destinations?category=food"
  },
  {
    name: "Favorites",
    icon: <HeartIcon className="h-6 w-6" />,
    color: "bg-pink-500/20",
    textColor: "text-pink-500",
    link: "/favorites"
  },
];

export function CategorySection() {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Explore by Category</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.name}
              to={category.link}
              className="flex flex-col items-center justify-center p-4 rounded-xl hover:shadow-md transition-all"
            >
              <div className={`w-14 h-14 ${category.color} rounded-full flex items-center justify-center mb-3`}>
                <div className={category.textColor}>
                  {category.icon}
                </div>
              </div>
              <span className="text-sm font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
