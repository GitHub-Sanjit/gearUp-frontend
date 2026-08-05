import { Dumbbell, Bike, Tent, Waves, Mountain, Trophy } from "lucide-react";

const categories = [
  {
    name: "Fitness Equipment",
    icon: Dumbbell,
    description: "Gym and workout essentials",
  },
  {
    name: "Cycling",
    icon: Bike,
    description: "Bikes and cycling accessories",
  },
  {
    name: "Camping",
    icon: Tent,
    description: "Outdoor camping gear",
  },
  {
    name: "Water Sports",
    icon: Waves,
    description: "Kayaks, boards and water gear",
  },
  {
    name: "Adventure",
    icon: Mountain,
    description: "Hiking and adventure equipment",
  },
  {
    name: "Sports",
    icon: Trophy,
    description: "Sports equipment for everyone",
  },
];

export default function Categories() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">
            Explore Categories
          </h2>
          <p className="text-muted-foreground mt-2">
            Find the perfect gear for your next adventure
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.name}
                className="
                  group rounded-xl border p-6 
                  transition-all duration-300
                  hover:shadow-lg hover:-translate-y-1
                  cursor-pointer
                "
              >
                <div
                  className="
                    flex h-12 w-12 items-center justify-center 
                    rounded-lg bg-primary/10 
                    text-primary mb-4
                    group-hover:bg-primary group-hover:text-primary-foreground
                    transition-colors
                  "
                >
                  <Icon size={26} />
                </div>

                <h3 className="text-xl font-semibold">
                  {category.name}
                </h3>

                <p className="text-sm text-muted-foreground mt-2">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}