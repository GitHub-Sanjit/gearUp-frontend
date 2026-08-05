import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Adventure Enthusiast",
    review:
      "GearUp made my camping trip so easy. I found quality equipment at an affordable price without buying everything myself.",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    role: "Fitness Trainer",
    review:
      "The booking process is simple and the equipment quality is excellent. Highly recommended for anyone who needs sports gear.",
    rating: 5,
  },
  {
    name: "Michael Brown",
    role: "Gear Provider",
    review:
      "GearUp helped me earn from my unused equipment while connecting with people who need it.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">What Our Users Say</h2>

          <p className="mt-3 text-muted-foreground">
            Real experiences from GearUp customers and providers
          </p>
        </div>

        {/* Testimonials */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="
                rounded-xl
                border
                bg-background
                p-6
                hover:shadow-lg
                transition
              "
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({
                  length: testimonial.rating,
                }).map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Review */}
              <p
                className="
                  text-muted-foreground
                  leading-relaxed
                "
              >
                &quot;{testimonial.review}&quot;
              </p>

              {/* User */}
              <div className="mt-6">
                <h3 className="font-semibold">{testimonial.name}</h3>

                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
