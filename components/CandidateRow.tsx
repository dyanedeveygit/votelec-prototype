'use client';

interface CandidateRowProps {
  id: string;
  name: string;
  onCopy: () => void;
  onDelete: () => void;
}

export default function CandidateRow({ id, name, onCopy, onDelete }: CandidateRowProps) {
  return (
    <div
      className="flex items-center group"
      style={{
        height: '48px',
        borderBottom: '1px solid #dce3e8',
        backgroundColor: 'white',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f9fafb';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor = 'white';
      }}
    >
      {/* Code */}
      <span
        style={{
          width: '64px',
          flexShrink: 0,
          fontSize: '14px',
          color: '#697983',
          fontFamily: 'var(--font-open-sans), sans-serif',
          paddingLeft: '16px',
        }}
      >
        {id}
      </span>

      {/* Name */}
      <span
        className="flex-1"
        style={{
          fontSize: '16px',
          color: '#273c46',
          fontFamily: 'var(--font-open-sans), sans-serif',
        }}
      >
        {name}
      </span>

      {/* Actions */}
      <div className="flex items-center gap-1" style={{ paddingRight: '16px' }}>
        {/* Copy button */}
        <button
          type="button"
          onClick={onCopy}
          title="Copier"
          className="flex items-center justify-center rounded"
          style={{
            width: '28px',
            height: '28px',
            color: '#3a862d',
            border: '1px solid #dce3e8',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f0fdf4';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
          }}
        >
          {/* Copy SVG: two overlapping squares */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="5" width="9" height="9" rx="1" stroke="#3a862d" strokeWidth="1.5" fill="none" />
            <path d="M3 11V2h9" stroke="#3a862d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </button>

        {/* Delete button */}
        <button
          type="button"
          onClick={onDelete}
          title="Supprimer"
          className="flex items-center justify-center rounded"
          style={{
            width: '28px',
            height: '28px',
            color: '#3a862d',
            border: '1px solid #dce3e8',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#fef2f2';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#fca5a5';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#dce3e8';
          }}
        >
          {/* Trash SVG: bin shape */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4h12" stroke="#3a862d" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke="#3a862d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="3" y="4" width="10" height="9" rx="1" stroke="#3a862d" strokeWidth="1.5" fill="none" />
            <line x1="6" y1="7" x2="6" y2="10" stroke="#3a862d" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="10" y1="7" x2="10" y2="10" stroke="#3a862d" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
