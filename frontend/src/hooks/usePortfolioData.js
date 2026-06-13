import { useQuery } from '@tanstack/react-query';
import { fetchProjects, fetchCertificates, fetchProjectBySlug } from '../services/api';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}

export function useProject(slug) {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: () => fetchProjectBySlug(slug),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    enabled: !!slug,
  });
}

export function useCertificates() {
  return useQuery({
    queryKey: ['certificates'],
    queryFn: fetchCertificates,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}
