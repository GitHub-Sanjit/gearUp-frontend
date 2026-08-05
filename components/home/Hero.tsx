import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-12
          items-center
        "
        >
          {/* Left Content */}
          <div>
            <div
              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-primary/10
              px-4
              py-2
              text-sm
              text-primary
              mb-6
            "
            >
              <Zap size={16} />
              Rent Sports & Outdoor Gear Instantly
            </div>

            <h1
              className="
              text-4xl
              md:text-5xl
              lg:text-6xl
              font-bold
              tracking-tight
              leading-tight
            "
            >
              Adventure Starts With The
              <span className="text-primary"> Right Gear</span>
            </h1>

            <p
              className="
              mt-6
              text-lg
              text-muted-foreground
              max-w-xl
              leading-relaxed
            "
            >
              GearUp connects adventurers with quality sports and outdoor
              equipment. Rent bikes, camping gear, fitness equipment, and more
              from trusted providers.
            </p>

            {/* Buttons */}
            <div
              className="
              mt-8
              flex
              flex-col
              sm:flex-row
              gap-4
            "
            >
              <Button size="lg">
                <Link href="/gears">
                  Browse Gear
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>

              <Button size="lg" variant="outline">
                <Link href="/provider">Become a Provider</Link>
              </Button>
            </div>

            {/* Trust Points */}
            <div
              className="
              mt-10
              flex
              flex-col
              sm:flex-row
              gap-6
            "
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-primary" size={28} />

                <div>
                  <p className="font-semibold">Trusted Providers</p>
                  <p className="text-sm text-muted-foreground">
                    Verified equipment owners
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Zap className="text-primary" size={28} />

                <div>
                  <p className="font-semibold">Easy Booking</p>
                  <p className="text-sm text-muted-foreground">
                    Fast rental process
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div
            className="
            relative
            h-100
            lg:h-130
          "
          >
            <Image
              src="https://images.unsplash.com/photo-1551632811-561732d1e306"
              alt="Outdoor adventure gear"
              fill
              priority
              className="
                object-cover
                rounded-3xl
              "
            />

            {/* Floating Card */}
            <div
              className="
              absolute
              bottom-6
              left-6
              rounded-xl
              bg-background
              shadow-lg
              p-4
            "
            >
              <p className="font-semibold">1000+ Gear Available</p>

              <p
                className="
                text-sm
                text-muted-foreground
              "
              >
                Ready for your next adventure
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
