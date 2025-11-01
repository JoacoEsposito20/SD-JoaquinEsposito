"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { pokemonsService } from "@/app/services/favorites.services";

export function useFavorites() {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: pokemonsService.getAll,
  });
}

export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: pokemonsService.add,
    onSuccess: () => {
      // Invalida la cache para refrescar la lista
      queryClient.invalidateQueries({ queryKey: ["pokemons"] });
    },
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: pokemonsService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pokemons"] });
    },
  });
}