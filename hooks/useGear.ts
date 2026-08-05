import { useQuery } from "@tanstack/react-query";

import { getGearById } from "@/services/gear.service";

export const useGear = (id: string) => {
  return useQuery({
    queryKey: ["gear", id],

    queryFn: () => getGearById(id),

    enabled: !!id,
  });
};
