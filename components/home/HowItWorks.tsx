import {
  Search,
  CalendarCheck,
  PackageCheck,
  RotateCcw,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Gear",
    description:
      "Explore hundreds of sports and outdoor equipment from trusted providers.",
  },
  {
    icon: CalendarCheck,
    title: "Book Equipment",
    description:
      "Choose your rental dates and reserve the gear you need instantly.",
  },
  {
    icon: PackageCheck,
    title: "Enjoy Your Adventure",
    description:
      "Pick up your equipment and enjoy your outdoor experience.",
  },
  {
    icon: RotateCcw,
    title: "Return Gear",
    description:
      "Return the equipment safely after your rental period ends.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            How It Works
          </h2>

          <p className="text-muted-foreground mt-3">
            Rent your favorite gear in four simple steps
          </p>
        </div>


        {/* Steps */}
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-4 
          gap-8
        ">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="
                  relative 
                  text-center
                  rounded-xl
                  border
                  bg-background
                  p-6
                  hover:shadow-lg
                  transition
                "
              >

                {/* Step Number */}
                <div
                  className="
                    absolute
                    -top-4
                    left-1/2
                    -translate-x-1/2
                    h-8
                    w-8
                    rounded-full
                    bg-primary
                    text-primary-foreground
                    flex
                    items-center
                    justify-center
                    text-sm
                    font-bold
                  "
                >
                  {index + 1}
                </div>


                {/* Icon */}
                <div
                  className="
                    mx-auto
                    mt-4
                    mb-5
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-primary/10
                    text-primary
                  "
                >
                  <Icon size={28} />
                </div>


                <h3 className="text-xl font-semibold">
                  {step.title}
                </h3>


                <p className="
                  mt-3
                  text-sm
                  text-muted-foreground
                  leading-relaxed
                ">
                  {step.description}
                </p>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}