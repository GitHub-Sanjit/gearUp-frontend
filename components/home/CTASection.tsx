import Link from "next/link";
import { ArrowRight, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-primary
            px-6
            py-14
            text-center
            text-primary-foreground
            md:px-12
          "
        >
          {/* Decorative Icon */}
          <div
            className="
              absolute
              right-10
              top-10
              opacity-10
            "
          >
            <Mountain size={180} />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2
              className="
                text-3xl
                md:text-4xl
                font-bold
              "
            >
              Ready For Your Next Adventure?
            </h2>

            <p
              className="
                mt-4
                text-primary-foreground/80
                text-lg
              "
            >
              Find the perfect equipment for your journey or start earning by
              renting out your unused gear.
            </p>

            {/* Buttons */}
            <div
              className="
                mt-8
                flex
                flex-col
                sm:flex-row
                justify-center
                gap-4
              "
            >
              <Button size="lg" variant="secondary">
                <Link href="/gears">
                  Explore Gear
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="
                  bg-transparent
                  text-primary-foreground
                  border-primary-foreground/30
                  hover:bg-primary-foreground/10
                "
              >
                <Link href="/provider">Become a Provider</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
