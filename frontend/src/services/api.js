/**
 * API service layer.
 *
 * Projects are served from the local data file (src/data/projects.js)
 * so the portfolio is fully self-contained and works without a running
 * backend. Adding a project only requires editing projects.js.
 *
 * Certificates and contact still use the backend API.
 */

import localProjects from '../data/projects.js';

/* ─── Projects (local data) ────────────────────────────────────────────── */

export async function fetchProjects() {
  // Simulate a microtask tick so React Query treats this as async
  await Promise.resolve();
  // Featured projects first, then insertion order
  return [...localProjects].sort((a, b) =>
    (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
  );
}

export async function fetchProjectBySlug(slug) {
  await Promise.resolve();
  const project = localProjects.find((p) => p.slug === slug);
  if (!project) {
    throw new Error(`Project not found: ${slug}`);
  }
  return project;
}

/* ─── Certificates (backend API) ───────────────────────────────────────── */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5002/api/v1';

export async function fetchCertificates() {
  const response = await fetch(`${API_BASE_URL}/certificates`);
  if (!response.ok) {
    throw new Error('Failed to fetch certificates');
  }
  const data = await response.json();
  return data.data || data;
}

/* ─── Contact (backend API) ────────────────────────────────────────────── */

export async function submitContact(payload) {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to send message');
  }
  return response.json();
}
