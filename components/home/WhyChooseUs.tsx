import {
  BadgeCheck,
  Wallet,
  Clock,
  ShieldCheck,
  Layers,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Verified Gear Providers",
    description:
      "We connect you with trusted equipment owners to ensure a safe rental experience.",
  },
  {
    icon: Layers,
    title: "Wide Range of Equipment",
    description:
      "Find sports, fitness, camping, and adventure gear all in one place.",
  },
  {
    icon: Wallet,
    title: "Affordable Rental Prices",
    description:
      "Get premium equipment without spending money on ownership.",
  },
  {
    icon: Clock,
    title: "Quick & Easy Booking",
    description:
      "Reserve your favorite gear in just a few simple steps.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your bookings and payments are handled through a secure platform.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description:
      "Our team is always ready to help with your rental journey.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            Why Choose GearUp?
          </h2>

          <p className="mt-3 text-muted-foreground">
            Everything you need for a smooth and enjoyable rental experience
          </p>
        </div>


        {/* Feature Cards */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  rounded-xl
                  border
                  p-6
                  transition-all
                  hover:shadow-lg
                  hover:-translate-y-1
                "
              >

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-lg
                    bg-primary/10
                    text-primary
                    mb-5
                  "
                >
                  <Icon size={26} />
                </div>


                <h3 className="text-xl font-semibold">
                  {feature.title}
                </h3>


                <p
                  className="
                    mt-3
                    text-sm
                    text-muted-foreground
                    leading-relaxed
                  "
                >
                  {feature.description}
                </p>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}