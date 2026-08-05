import Image from "next/image";

import { Badge } from "@/components/ui/badge";

import { getGearById } from "@/services/gear.service";
import RentalForm from "@/components/rental/RentalForm";

interface GearDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GearDetailsPage({
  params,
}: GearDetailsPageProps) {
  const gear = await getGearById((await params).id);

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div
          className="
            grid 
            grid-cols-1 
            lg:grid-cols-5 
            gap-10
            items-start
          "
        >
          {/* ================= IMAGE ================= */}

          <div className="lg:col-span-3">
            <div
              className="
                relative
                h-130
                overflow-hidden
                rounded-2xl
                border
                shadow-sm
              "
            >
              <Image
                src={gear.image || "/placeholder.png"}
                alt={gear.name}
                fill
                sizes="
                  (max-width:1024px) 100vw,
                  60vw
                "
                className="
                  object-cover
                "
              />
            </div>
          </div>

          {/* ================= DETAILS ================= */}

          <div
            className="
              lg:col-span-2
              space-y-6
            "
          >
            {/* Title */}

            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >
              <h1
                className="
                  text-3xl
                  font-bold
                "
              >
                {gear.name}
              </h1>

              <Badge>{gear.condition}</Badge>
            </div>

            {/* Category */}

            <p
              className="
                text-muted-foreground
              "
            >
              {gear.category.name}
            </p>

            {/* Price */}

            <div>
              <span
                className="
                  text-3xl
                  font-bold
                "
              >
                ${gear.dailyRentalPrice}
              </span>

              <span
                className="
                  text-muted-foreground
                  ml-1
                "
              >
                /day
              </span>
            </div>

            {/* Description */}

            <div className="space-y-2">
              <h3
                className="
                  font-semibold
                  text-lg
                "
              >
                Description
              </h3>

              <p
                className="
                  text-muted-foreground
                  leading-relaxed
                "
              >
                {gear.description || "No description available."}
              </p>
            </div>

            {/* Extra Information */}

            <div
              className="
                rounded-xl
                border
                p-5
                space-y-3
              "
            >
              <div
                className="
                  flex
                  justify-between
                "
              >
                <span>Brand</span>

                <span
                  className="
                    font-medium
                  "
                >
                  {gear.brand || "N/A"}
                </span>
              </div>

              <div
                className="
                  flex
                  justify-between
                "
              >
                <span>Available</span>

                <span
                  className="
                    font-medium
                  "
                >
                  {gear.availableQuantity} items
                </span>
              </div>
            </div>

            {/* ================= RENTAL FORM ================= */}

            <RentalForm
              gearId={gear.id}
              pricePerDay={gear.dailyRentalPrice}
              availableQuantity={gear.availableQuantity}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
