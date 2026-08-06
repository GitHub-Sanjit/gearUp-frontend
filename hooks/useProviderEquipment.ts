"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getMyEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  type CreateEquipmentPayload,
  type UpdateEquipmentPayload,
} from "@/services/provider-equipment.service";

// GET PROVIDER EQUIPMENT

export const useProviderEquipment = () => {
  return useQuery({
    queryKey: ["provider-equipment"],

    queryFn: getMyEquipment,
  });
};

// CREATE EQUIPMENT

export const useCreateEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEquipment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["provider-equipment"],
      });
    },
  });
};

// UPDATE EQUIPMENT

export const useUpdateEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateEquipmentPayload;
    }) => updateEquipment(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["provider-equipment"],
      });
    },
  });
};

// DELETE EQUIPMENT

export const useDeleteEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEquipment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["provider-equipment"],
      });
    },
  });
};
