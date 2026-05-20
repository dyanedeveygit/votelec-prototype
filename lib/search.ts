import { Liste, SearchResult, SearchGroup, SearchCandidateResult } from '@/types';

export function searchElection(query: string, listes: Liste[]): SearchResult[] {
  if (query.length < 2) return [];

  const q = query.toLowerCase();
  const results: SearchResult[] = [];
  const matchedListIds = new Set<string>();

  for (const liste of listes) {
    const listMatches =
      liste.id.toLowerCase().includes(q) ||
      liste.name.toLowerCase().includes(q) ||
      liste.party.toLowerCase().includes(q);

    if (listMatches) {
      matchedListIds.add(liste.id);
      const group: SearchGroup = {
        type: 'list',
        liste,
        candidates: liste.candidates,
        allSelected: false,
        selectedIds: new Set<string>(),
      };
      results.push(group);
    }
  }

  for (const liste of listes) {
    if (matchedListIds.has(liste.id)) continue;

    for (const candidate of liste.candidates) {
      const candidateMatches =
        candidate.id.toLowerCase().includes(q) ||
        candidate.name.toLowerCase().includes(q);

      if (candidateMatches) {
        const result: SearchCandidateResult = {
          type: 'candidate',
          candidate,
          liste,
          selected: false,
        };
        results.push(result);
      }
    }
  }

  return results;
}
