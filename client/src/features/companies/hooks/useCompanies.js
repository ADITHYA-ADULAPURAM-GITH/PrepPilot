import { useQuery } from "@tanstack/react-query";
import { companiesApi } from "@/features/companies/api/companiesApi";

export function useCompanies(filters) {
  return useQuery({
    queryKey: ["companies", filters],
    queryFn: async () => {
      const { data } = await companiesApi.list(filters);
      return data.data; // { companies, pagination }
    },
    placeholderData: (prev) => prev,
  });
}