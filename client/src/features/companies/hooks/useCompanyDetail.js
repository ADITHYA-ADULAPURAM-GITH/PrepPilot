import { useQuery } from "@tanstack/react-query";
import { companiesApi } from "@/features/companies/api/companiesApi";

export function useCompanyDetail(companyId) {
  return useQuery({
    queryKey: ["company", companyId],
    queryFn: async () => {
      const { data } = await companiesApi.getById(companyId);
      return data.data; // { company }
    },
    enabled: Boolean(companyId),
  });
}