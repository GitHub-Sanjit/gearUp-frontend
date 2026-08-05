import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const featuredGears = [
  {
    id: "1",
    name: "Mountain Bike",
    category: "Cycling",
    price: 15,
    condition: "Excellent",
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91",
  },
  {
    id: "2",
    name: "Camping Tent",
    category: "Camping",
    price: 20,
    condition: "Good",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
  },
  {
    id: "3",
    name: "Football Kit",
    category: "Sports",
    price: 10,
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
  },
];

export default function FeaturedGears() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold">Featured Gears</h2>

            <p className="text-muted-foreground mt-2">
              Popular equipment ready for your next adventure
            </p>
          </div>

          <Button variant="outline">
            <Link href="/gears">View All</Link>
          </Button>
        </div>

        {/* Gear Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGears.map((gear) => (
            <div
              key={gear.id}
              className="
                rounded-xl border overflow-hidden
                hover:shadow-lg transition
              "
            >
              {/* Image */}
              <div className="relative h-56 w-full">
                <Image
                  src={gear.image}
                  alt={gear.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold">{gear.name}</h3>

                  <Badge>{gear.condition}</Badge>
                </div>

                <p className="text-sm text-muted-foreground mt-2">
                  {gear.category}
                </p>

                <div className="flex items-center justify-between mt-5">
                  <p className="font-semibold text-lg">
                    ${gear.price}
                    <span className="text-sm text-muted-foreground">/day</span>
                  </p>

                  <Button size="sm" variant="secondary">
                    <Link href={`/gears/${gear.id}`}>Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
