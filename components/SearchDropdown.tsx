'use client';

import { SearchResult, SearchGroup, SearchCandidateResult } from '@/types';

interface SearchDropdownProps {
  results: SearchResult[];
  selectedIds: Set<string>;
  onToggleCandidate: (candidateId: string, listId: string) => void;
  onToggleList: (listId: string) => void;
  onAddSelection: () => void;
  totalSelected: number;
}

const PARTY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  PLR:   { bg: '#dbeafe', text: '#1d4ed8', border: '#93c5fd' },
  PS:    { bg: '#fee2e2', text: '#dc2626', border: '#fca5a5' },
  Verts: { bg: '#dcfce7', text: '#16a34a', border: '#86efac' },
  PDC:   { bg: '#ffedd5', text: '#ea580c', border: '#fdba74' },
  UDC:   { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' },
  'sol.':{ bg: '#f5f3ff', text: '#7c3aed', border: '#c4b5fd' },
};

function PartyTag({ party }: { party: string }) {
  const colors = PARTY_COLORS[party] ?? { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' };
  return (
    <span
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        borderRadius: '4px',
        padding: '1px 6px',
        fontSize: '11px',
        fontWeight: 600,
        fontFamily: 'var(--font-open-sans), sans-serif',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {party}
    </span>
  );
}

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <div
      style={{
        width: '18px',
        height: '18px',
        border: checked ? 'none' : '2px solid #c3d1dc',
        borderRadius: '3px',
        backgroundColor: checked ? '#3a862d' : 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {checked && (
        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
          <path d="M1 4l3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

function ListGroupRow({ group, onToggleList, onToggleCandidate }: {
  group: SearchGroup;
  onToggleList: (listId: string) => void;
  onToggleCandidate: (candidateId: string, listId: string) => void;
}) {
  const listColors = PARTY_COLORS[group.liste.party] ?? { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' };

  return (
    <div>
      {/* List header row */}
      <div
        onClick={() => onToggleList(group.liste.id)}
        style={{
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          paddingLeft: '12px',
          paddingRight: '12px',
          cursor: 'pointer',
          backgroundColor: group.allSelected ? '#f0fdf4' : 'white',
          borderLeft: group.allSelected ? '3px solid #3a862d' : '3px solid transparent',
        }}
        onMouseEnter={(e) => {
          if (!group.allSelected) {
            (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f9fafb';
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.backgroundColor = group.allSelected ? '#f0fdf4' : 'white';
        }}
      >
        <Checkbox checked={group.allSelected} />

        {/* Liste badge */}
        <span
          style={{
            backgroundColor: '#dbeafe',
            color: '#1d4ed8',
            borderRadius: '6px',
            padding: '2px 6px',
            fontSize: '12px',
            fontWeight: 700,
            fontFamily: 'var(--font-open-sans), sans-serif',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Liste {group.liste.id}
        </span>

        <span
          style={{
            fontSize: '14px',
            color: '#273c46',
            fontFamily: 'var(--font-open-sans), sans-serif',
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {group.liste.name}
        </span>

        <span
          style={{
            fontSize: '13px',
            color: '#697983',
            fontFamily: 'var(--font-open-sans), sans-serif',
          }}
        >
          · {group.candidates.length} candidats
        </span>
      </div>

      {/* Candidate rows */}
      {group.candidates.map((candidate) => {
        const isSelected = group.selectedIds.has(candidate.id);
        return (
          <div
            key={candidate.id}
            onClick={() => onToggleCandidate(candidate.id, group.liste.id)}
            style={{
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              paddingLeft: '16px',
              paddingRight: '12px',
              cursor: 'pointer',
              backgroundColor: isSelected ? '#f0fdf4' : 'white',
              borderLeft: isSelected ? '3px solid #3a862d' : '3px solid transparent',
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor = isSelected ? '#f0fdf4' : 'white';
            }}
          >
            <Checkbox checked={isSelected} />
            <span
              style={{
                fontSize: '13px',
                color: '#697983',
                fontFamily: 'var(--font-open-sans), sans-serif',
                width: '44px',
                flexShrink: 0,
              }}
            >
              {candidate.id}
            </span>
            <span
              className="flex-1"
              style={{
                fontSize: '15px',
                color: '#273c46',
                fontFamily: 'var(--font-open-sans), sans-serif',
              }}
            >
              {candidate.name}
            </span>
            <PartyTag party={group.liste.party} />
          </div>
        );
      })}
    </div>
  );
}

function IndividualCandidateRow({ result, onToggleCandidate }: {
  result: SearchCandidateResult;
  onToggleCandidate: (candidateId: string, listId: string) => void;
}) {
  return (
    <div
      onClick={() => onToggleCandidate(result.candidate.id, result.liste.id)}
      style={{
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        paddingLeft: '12px',
        paddingRight: '12px',
        cursor: 'pointer',
        backgroundColor: result.selected ? '#f0fdf4' : 'white',
        borderLeft: result.selected ? '3px solid #3a862d' : '3px solid transparent',
      }}
      onMouseEnter={(e) => {
        if (!result.selected) {
          (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f9fafb';
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor = result.selected ? '#f0fdf4' : 'white';
      }}
    >
      <Checkbox checked={result.selected} />
      <span
        style={{
          fontSize: '13px',
          color: '#697983',
          fontFamily: 'var(--font-open-sans), sans-serif',
          width: '44px',
          flexShrink: 0,
        }}
      >
        {result.candidate.id}
      </span>
      <span
        className="flex-1"
        style={{
          fontSize: '15px',
          color: '#273c46',
          fontFamily: 'var(--font-open-sans), sans-serif',
        }}
      >
        {result.candidate.name}
      </span>
      <PartyTag party={result.liste.party} />
    </div>
  );
}

export default function SearchDropdown({
  results,
  selectedIds: _selectedIds,
  onToggleCandidate,
  onToggleList,
  onAddSelection,
  totalSelected,
}: SearchDropdownProps) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        border: '1px solid #dce3e8',
        borderRadius: '6px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.12), 0 4px 10px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        maxHeight: '480px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Scrollable results */}
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {results.map((result) => {
          if (result.type === 'list') {
            return (
              <ListGroupRow
                key={`list-${result.liste.id}`}
                group={result}
                onToggleList={onToggleList}
                onToggleCandidate={onToggleCandidate}
              />
            );
          } else {
            return (
              <IndividualCandidateRow
                key={`candidate-${result.candidate.id}`}
                result={result}
                onToggleCandidate={onToggleCandidate}
              />
            );
          }
        })}
      </div>

      {/* Footer bar */}
      <div
        style={{
          borderTop: '1px solid #dce3e8',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fafafa',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: '12px',
            color: '#697983',
            fontFamily: 'var(--font-open-sans), sans-serif',
          }}
        >
          <kbd style={{ fontFamily: 'monospace', fontSize: '11px', padding: '1px 4px', border: '1px solid #dce3e8', borderRadius: '3px', backgroundColor: 'white' }}>Espace</kbd>
          {' '}cocher{'  '}
          <kbd style={{ fontFamily: 'monospace', fontSize: '11px', padding: '1px 4px', border: '1px solid #dce3e8', borderRadius: '3px', backgroundColor: 'white' }}>↕</kbd>
          {' '}naviguer{'  '}
          <kbd style={{ fontFamily: 'monospace', fontSize: '11px', padding: '1px 4px', border: '1px solid #dce3e8', borderRadius: '3px', backgroundColor: 'white' }}>↵</kbd>
          {' '}ajouter
        </span>

        <button
          type="button"
          onClick={onAddSelection}
          style={{
            backgroundColor: '#3a862d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 14px',
            fontSize: '13px',
            fontWeight: 600,
            fontFamily: 'var(--font-open-sans), sans-serif',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {totalSelected > 0 ? (
            <>
              Ajouter {totalSelected} candidat{totalSelected > 1 ? 's' : ''}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7l3.5 3.5L12 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          ) : (
            'Ajouter la sélection'
          )}
        </button>
      </div>
    </div>
  );
}
