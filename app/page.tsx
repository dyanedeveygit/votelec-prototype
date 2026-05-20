'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import Header from '@/components/Header';
import BulletinHeader from '@/components/BulletinHeader';
import CandidateRow from '@/components/CandidateRow';
import SearchDropdown from '@/components/SearchDropdown';
import BottomBar from '@/components/BottomBar';
import { LISTES } from '@/data/election';
import { searchElection } from '@/lib/search';
import { SearchGroup, SearchCandidateResult, FlatItem } from '@/types';

interface BulletinEntry {
  id: string;
  name: string;
  listId: string;
}

// Initial 11 entries from Liste 01 (6 candidates) + 5 more from other lists for demo
const INITIAL_ENTRIES: BulletinEntry[] = [
  { id: '01.01', name: 'Julien Lefèvre', listId: '01' },
  { id: '01.02', name: 'Claire Dubois', listId: '01' },
  { id: '01.03', name: 'Mathieu Bernard', listId: '01' },
  { id: '01.04', name: 'Sophie Laurent', listId: '01' },
  { id: '01.05', name: 'Lucas Moreau', listId: '01' },
  { id: '01.06', name: 'Élodie Fontaine', listId: '01' },
  { id: '04.01', name: 'Sara Berthod', listId: '04' },
  { id: '04.02', name: 'Loïc Deschamps', listId: '04' },
  { id: '02.01', name: 'Isabelle Martin', listId: '02' },
  { id: '03.01', name: 'Pierre Müller', listId: '03' },
  { id: '05.01', name: 'Alexandre Favre', listId: '05' },
];

function BulletinNumberInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        style={{
          fontSize: '11px',
          color: '#697983',
          fontFamily: 'var(--font-open-sans), sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        Bulletin °
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '64px',
          border: '1px solid #dce3e8',
          borderRadius: '4px',
          padding: '4px 8px',
          fontSize: '16px',
          fontWeight: 700,
          color: '#273c46',
          fontFamily: 'var(--font-open-sans), sans-serif',
          outline: 'none',
          textAlign: 'center',
        }}
        onFocus={(e) => {
          (e.currentTarget as HTMLInputElement).style.borderColor = '#3a862d';
          (e.currentTarget as HTMLInputElement).style.boxShadow = '0 0 0 2px rgba(58,134,45,0.15)';
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLInputElement).style.borderColor = '#dce3e8';
          (e.currentTarget as HTMLInputElement).style.boxShadow = 'none';
        }}
      />
    </div>
  );
}

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [bulletinEntries, setBulletinEntries] = useState<BulletinEntry[]>(INITIAL_ENTRIES);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectedByList, setSelectedByList] = useState<Record<string, Set<string>>>({});
  const [isLast, setIsLast] = useState(false);
  const [bulletinNumber, setBulletinNumber] = useState('01');
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const suffrageMax = 30;
  const suffrageUsed = bulletinEntries.length;

  // Compute raw search results
  const rawResults = useMemo(() => {
    if (query.length < 2) return [];
    return searchElection(query, LISTES);
  }, [query]);

  // Enrich results with selected state
  const results = useMemo(() => {
    return rawResults.map((result) => {
      if (result.type === 'list') {
        const listSelected = selectedByList[result.liste.id] ?? new Set<string>();
        const allSelected =
          result.candidates.length > 0 &&
          result.candidates.every((c) => listSelected.has(c.id));
        return {
          ...result,
          allSelected,
          selectedIds: listSelected,
        } as SearchGroup;
      } else {
        return {
          ...result,
          selected: selectedIds.has(result.candidate.id),
        } as SearchCandidateResult;
      }
    });
  }, [rawResults, selectedIds, selectedByList]);

  const dropdownOpen = results.length > 0;

  // Flat ordered list of all navigable rows (list header + candidates)
  const flatItems = useMemo<FlatItem[]>(() => {
    const items: FlatItem[] = [];
    for (const result of rawResults) {
      if (result.type === 'list') {
        items.push({ type: 'list-header', listId: result.liste.id });
        for (const c of result.candidates) {
          items.push({ type: 'candidate', candidateId: c.id, listId: result.liste.id });
        }
      } else {
        items.push({ type: 'candidate', candidateId: result.candidate.id, listId: result.liste.id });
      }
    }
    return items;
  }, [rawResults]);

  const focusedItem = focusedIndex >= 0 && focusedIndex < flatItems.length
    ? flatItems[focusedIndex]
    : null;

  // Reset focus when results change
  useEffect(() => {
    setFocusedIndex(-1);
  }, [rawResults]);

  const totalSelected = useMemo(() => {
    let count = 0;
    for (const ids of Object.values(selectedByList)) {
      count += ids.size;
    }
    return count;
  }, [selectedByList]);

  const handleToggleCandidate = useCallback((candidateId: string, listId: string) => {
    setSelectedByList((prev) => {
      const next = { ...prev };
      const listSet = new Set(next[listId] ?? new Set<string>());
      if (listSet.has(candidateId)) {
        listSet.delete(candidateId);
      } else {
        listSet.add(candidateId);
      }
      next[listId] = listSet;
      return next;
    });
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(candidateId)) {
        next.delete(candidateId);
      } else {
        next.add(candidateId);
      }
      return next;
    });
  }, []);

  const handleToggleList = useCallback(
    (listId: string) => {
      const liste = LISTES.find((l) => l.id === listId);
      if (!liste) return;

      const currentSelected = selectedByList[listId] ?? new Set<string>();
      const allSelected =
        liste.candidates.length > 0 &&
        liste.candidates.every((c) => currentSelected.has(c.id));

      setSelectedByList((prev) => {
        const next = { ...prev };
        if (allSelected) {
          next[listId] = new Set<string>();
        } else {
          next[listId] = new Set(liste.candidates.map((c) => c.id));
        }
        return next;
      });

      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (allSelected) {
          liste.candidates.forEach((c) => next.delete(c.id));
        } else {
          liste.candidates.forEach((c) => next.add(c.id));
        }
        return next;
      });
    },
    [selectedByList]
  );

  const handleAddSelection = useCallback(() => {
    const toAdd: BulletinEntry[] = [];

    for (const [listId, ids] of Object.entries(selectedByList)) {
      const liste = LISTES.find((l) => l.id === listId);
      if (!liste) continue;
      for (const candidateId of ids) {
        const candidate = liste.candidates.find((c) => c.id === candidateId);
        if (candidate) {
          toAdd.push({ id: candidate.id, name: candidate.name, listId });
        }
      }
    }

    // Sort by candidate id
    toAdd.sort((a, b) => a.id.localeCompare(b.id));

    setBulletinEntries((prev) => [...prev, ...toAdd]);
    setSelectedIds(new Set());
    setSelectedByList({});
    setQuery('');
  }, [selectedByList]);

  const handleDelete = useCallback((index: number) => {
    setBulletinEntries((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleCopy = useCallback((entry: BulletinEntry) => {
    setBulletinEntries((prev) => {
      const copy = [...prev];
      copy.push({ ...entry });
      return copy;
    });
  }, []);

  const handleClearAll = useCallback(() => {
    setBulletinEntries([]);
  }, []);

  // Enter confirms: merges the highlighted item (if any) with current selection, adds all to bulletin
  const handleConfirmItem = useCallback((item: FlatItem | null) => {
    // Build merged selection: currently checked + highlighted item
    const mergedByList: Record<string, Set<string>> = {};
    for (const [listId, ids] of Object.entries(selectedByList)) {
      mergedByList[listId] = new Set(ids);
    }
    if (item) {
      if (item.type === 'list-header') {
        const liste = LISTES.find((l) => l.id === item.listId);
        if (liste) mergedByList[item.listId] = new Set(liste.candidates.map((c) => c.id));
      } else {
        if (!mergedByList[item.listId]) mergedByList[item.listId] = new Set();
        mergedByList[item.listId].add(item.candidateId);
      }
    }

    const toAdd: BulletinEntry[] = [];
    for (const [listId, ids] of Object.entries(mergedByList)) {
      const liste = LISTES.find((l) => l.id === listId);
      if (!liste) continue;
      for (const candidateId of ids) {
        const candidate = liste.candidates.find((c) => c.id === candidateId);
        if (candidate) toAdd.push({ id: candidate.id, name: candidate.name, listId });
      }
    }
    toAdd.sort((a, b) => a.id.localeCompare(b.id));

    setBulletinEntries((prev) => [...prev, ...toAdd]);
    setSelectedIds(new Set());
    setSelectedByList({});
    setQuery('');
    setFocusedIndex(-1);
  }, [selectedByList]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!dropdownOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => Math.min(prev + 1, flatItems.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Tab':
        e.preventDefault();
        if (e.shiftKey) {
          setFocusedIndex(prev => Math.max(prev - 1, -1));
        } else {
          setFocusedIndex(prev => Math.min(prev + 1, flatItems.length - 1));
        }
        break;
      case 'Enter': {
        e.preventDefault();
        handleConfirmItem(focusedItem);
        break;
      }
      case ' ': {
        if (focusedIndex >= 0 && focusedItem) {
          e.preventDefault();
          if (focusedItem.type === 'list-header') {
            handleToggleList(focusedItem.listId);
          } else {
            handleToggleCandidate(focusedItem.candidateId, focusedItem.listId);
          }
        }
        break;
      }
      case 'Escape':
        setQuery('');
        setFocusedIndex(-1);
        break;
    }
  }, [dropdownOpen, flatItems, focusedIndex, focusedItem, handleToggleList, handleToggleCandidate, handleConfirmItem]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Header />
      <BulletinHeader bulletinNumber={bulletinNumber} isLast={isLast} />

      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 32px',
          paddingBottom: '88px', // space for fixed bottom bar
        }}
      >
        {/* Top controls row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '16px',
          }}
        >
          <BulletinNumberInput value={bulletinNumber} onChange={setBulletinNumber} />

          <div className="flex items-center gap-3">
            {/* Suffrage counter */}
            <span
              style={{
                fontSize: '13px',
                color: '#697983',
                fontFamily: 'var(--font-open-sans), sans-serif',
              }}
            >
              {suffrageUsed}/{suffrageMax} suffrages utilisés
            </span>

            {/* Toggle isLast (demo control) */}
            <button
              type="button"
              onClick={() => setIsLast((v) => !v)}
              style={{
                fontSize: '12px',
                color: '#697983',
                border: '1px solid #dce3e8',
                borderRadius: '4px',
                padding: '4px 10px',
                backgroundColor: 'white',
                cursor: 'pointer',
                fontFamily: 'var(--font-open-sans), sans-serif',
              }}
            >
              {isLast ? 'Vue normale' : 'Dernier bulletin'}
            </button>

            {/* Clear all */}
            <button
              type="button"
              onClick={handleClearAll}
              className="flex items-center gap-2"
              style={{
                fontSize: '13px',
                color: '#697983',
                border: '1px solid #dce3e8',
                borderRadius: '4px',
                padding: '6px 12px',
                backgroundColor: 'white',
                cursor: 'pointer',
                fontFamily: 'var(--font-open-sans), sans-serif',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = '#dc2626';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#fca5a5';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = '#697983';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#dce3e8';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 3.5h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M4.5 3.5V2.5a1 1 0 011-1h3a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="2.5" y="3.5" width="9" height="8" rx="1" stroke="currentColor" strokeWidth="1.3" fill="none" />
                <line x1="5.5" y1="6" x2="5.5" y2="9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                <line x1="8.5" y1="6" x2="8.5" y2="9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Effacer tout
            </button>
          </div>
        </div>

        {/* Candidate list panel */}
        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid #dce3e8',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          {/* Panel header */}
          <div
            style={{
              padding: '10px 16px',
              borderBottom: '1px solid #dce3e8',
              backgroundColor: '#fafafa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#273c46',
                fontFamily: 'var(--font-open-sans), sans-serif',
              }}
            >
              Candidats sur le bulletin
            </span>
            <span
              style={{
                fontSize: '12px',
                color: '#697983',
                fontFamily: 'var(--font-open-sans), sans-serif',
              }}
            >
              {bulletinEntries.length} entrée{bulletinEntries.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Candidate rows */}
          {bulletinEntries.length === 0 ? (
            <div
              style={{
                padding: '48px 16px',
                textAlign: 'center',
                color: '#697983',
                fontSize: '14px',
                fontFamily: 'var(--font-open-sans), sans-serif',
              }}
            >
              Aucun candidat ajouté. Utilisez la barre de recherche ci-dessous.
            </div>
          ) : (
            bulletinEntries.map((entry, i) => (
              <CandidateRow
                key={`${entry.id}-${i}`}
                id={entry.id}
                name={entry.name}
                onCopy={() => handleCopy(entry)}
                onDelete={() => handleDelete(i)}
              />
            ))
          )}
        </div>
      </main>

      {/* Search dropdown — anchored above the bottom bar */}
      {dropdownOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '72px',
            left: '32px',
            width: '520px',
            zIndex: 40,
          }}
        >
          <SearchDropdown
            results={results}
            selectedIds={selectedIds}
            onToggleCandidate={handleToggleCandidate}
            onToggleList={handleToggleList}
            onAddSelection={handleAddSelection}
            totalSelected={totalSelected}
            focusedItem={focusedItem}
          />
        </div>
      )}

      <BottomBar
        query={query}
        onQueryChange={setQuery}
        onKeyDown={handleKeyDown}
        suffrageCurrent={suffrageUsed}
        suffrageTotal={suffrageMax}
        isLast={isLast}
        onBack={() => {}}
        onNext={() => {}}
        dropdownOpen={dropdownOpen}
      />
    </div>
  );
}
