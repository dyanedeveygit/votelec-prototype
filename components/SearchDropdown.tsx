'use client';

import { useRef, useEffect } from 'react';
import { SearchResult, SearchGroup, SearchCandidateResult, FlatItem } from '@/types';

interface SearchDropdownProps {
  results: SearchResult[];
  selectedIds: Set<string>;
  onToggleCandidate: (candidateId: string, listId: string) => void;
  onToggleList: (listId: string) => void;
  onAddSelection: () => void;
  totalSelected: number;
  focusedItem: FlatItem | null;
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

function rowBg(isSelected: boolean, isFocused: boolean): string {
  if (isFocused) return '#e8f5e9';
  if (isSelected) return '#f0fdf4';
  return 'white';
}

function rowBorder(isSelected: boolean, isFocused: boolean): string {
  return isSelected || isFocused ? '3px solid #3a862d' : '3px solid transparent';
}

function ListGroupRow({ group, onToggleList, onToggleCandidate, focusedItem }: {
  group: SearchGroup;
  onToggleList: (listId: string) => void;
  onToggleCandidate: (candidateId: string, listId: string) => void;
  focusedItem: FlatItem | null;
}) {
  const isHeaderFocused =
    focusedItem?.type === 'list-header' && focusedItem.listId === group.liste.id;

  return (
    <div>
      {/* List header row */}
      <div
        data-focused={isHeaderFocused ? 'true' : undefined}
        onClick={() => onToggleList(group.liste.id)}
        style={{
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          paddingLeft: '12px',
          paddingRight: '12px',
          cursor: 'pointer',
          backgroundColor: rowBg(group.allSelected, isHeaderFocused),
          borderLeft: rowBorder(group.allSelected, isHeaderFocused),
        }}
        onMouseEnter={(e) => {
          if (!group.allSelected && !isHeaderFocused) {
            (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f9fafb';
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.backgroundColor = rowBg(group.allSelected, isHeaderFocused);
        }}
      >
        <Checkbox checked={group.allSelected} />

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
        const isCandidateFocused =
          focusedItem?.type === 'candidate' &&
          focusedItem.candidateId === candidate.id &&
          focusedItem.listId === group.liste.id;

        return (
          <div
            key={candidate.id}
            data-focused={isCandidateFocused ? 'true' : undefined}
            onClick={() => onToggleCandidate(candidate.id, group.liste.id)}
            style={{
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              paddingLeft: '16px',
              paddingRight: '12px',
              cursor: 'pointer',
              backgroundColor: rowBg(isSelected, isCandidateFocused),
              borderLeft: rowBorder(isSelected, isCandidateFocused),
            }}
            onMouseEnter={(e) => {
              if (!isSelected && !isCandidateFocused) {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor = rowBg(isSelected, isCandidateFocused);
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

function IndividualCandidateRow({ result, onToggleCandidate, focusedItem }: {
  result: SearchCandidateResult;
  onToggleCandidate: (candidateId: string, listId: string) => void;
  focusedItem: FlatItem | null;
}) {
  const isFocused =
    focusedItem?.type === 'candidate' &&
    focusedItem.candidateId === result.candidate.id &&
    focusedItem.listId === result.liste.id;

  return (
    <div
      data-focused={isFocused ? 'true' : undefined}
      onClick={() => onToggleCandidate(result.candidate.id, result.liste.id)}
      style={{
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        paddingLeft: '12px',
        paddingRight: '12px',
        cursor: 'pointer',
        backgroundColor: rowBg(result.selected, isFocused),
        borderLeft: rowBorder(result.selected, isFocused),
      }}
      onMouseEnter={(e) => {
        if (!result.selected && !isFocused) {
          (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f9fafb';
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor = rowBg(result.selected, isFocused);
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
  focusedItem,
}: SearchDropdownProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll focused row into view whenever focus moves
  useEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current.querySelector<HTMLElement>('[data-focused="true"]');
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [focusedItem]);

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
      <div ref={scrollRef} style={{ overflowY: 'auto', flex: 1 }}>
        {results.map((result) => {
          if (result.type === 'list') {
            return (
              <ListGroupRow
                key={`list-${result.liste.id}`}
                group={result}
                onToggleList={onToggleList}
                onToggleCandidate={onToggleCandidate}
                focusedItem={focusedItem}
              />
            );
          } else {
            return (
              <IndividualCandidateRow
                key={`candidate-${result.candidate.id}`}
                result={result}
                onToggleCandidate={onToggleCandidate}
                focusedItem={focusedItem}
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
