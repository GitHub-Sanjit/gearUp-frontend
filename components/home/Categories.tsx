import { useCategories } from "@/hooks/useCategories";
import { DefaultCategoryIcon, categoryIcons } from "@/lib/categoryIcons";

export default function Categories() {
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <p className="text-center">Loading categories...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <p className="text-center text-red-500">Failed to load categories.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Explore Categories
          </h2>

          <p className="mt-2 text-muted-foreground">
            Find the perfect gear for your next adventure
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories?.map((category) => {
            const Icon =
              categoryIcons[category.name as keyof typeof categoryIcons] ??
              DefaultCategoryIcon;

            return (
              <div
                key={category.id}
                className="
                  group
                  cursor-pointer
                  rounded-xl
                  border
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                <div
                  className="
                    mb-4
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-lg
                    bg-primary/10
                    text-primary
                    transition-colors
                    group-hover:bg-primary
                    group-hover:text-primary-foreground
                  "
                >
                  <Icon size={26} />
                </div>

                <h3 className="text-xl font-semibold">{category.name}</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {category.description ?? "No description available."}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
