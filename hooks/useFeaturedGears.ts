import { useQuery } from "@tanstack/react-query";
import { getFeaturedGears } from "@/services/gear.service";

export const useFeaturedGears = () => {
  return useQuery({
    queryKey: ["featured-gears"],
    queryFn: getFeaturedGears,
  });
};
