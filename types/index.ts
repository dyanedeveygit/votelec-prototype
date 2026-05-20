export interface Candidate {
  id: string;
  name: string;
  listId: string;
}

export interface Liste {
  id: string;
  name: string;
  party: string;
  partyColor: string;
  candidates: Candidate[];
}

export interface SearchGroup {
  type: 'list';
  liste: Liste;
  candidates: Candidate[];
  allSelected: boolean;
  selectedIds: Set<string>;
}

export interface SearchCandidateResult {
  type: 'candidate';
  candidate: Candidate;
  liste: Liste;
  selected: boolean;
}

export type SearchResult = SearchGroup | SearchCandidateResult;

export type FlatItem =
  | { type: 'list-header'; listId: string }
  | { type: 'candidate'; candidateId: string; listId: string };
