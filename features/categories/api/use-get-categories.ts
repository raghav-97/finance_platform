import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await client.api.categories.$get();

      if (!res.ok) {
        throw new Error("Error fetching categories");
      }

      const { data } = await res.json();
      return data;
    },
  });
  return query;
};
