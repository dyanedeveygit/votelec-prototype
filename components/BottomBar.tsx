'use client';

interface BottomBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  suffrageCurrent: number;
  suffrageTotal: number;
  isLast: boolean;
  onBack: () => void;
  onNext: () => void;
  dropdownOpen: boolean;
}

export default function BottomBar({
  query,
  onQueryChange,
  suffrageCurrent,
  suffrageTotal,
  isLast,
  onBack,
  onNext,
  dropdownOpen,
}: BottomBarProps) {
  const reste = suffrageTotal - suffrageCurrent;
  const progressPercent = Math.min((suffrageCurrent / suffrageTotal) * 100, 100);

  // Approximate nominatif vs liste split (for "last" view)
  const nominatif = Math.round(suffrageCurrent * 0.8);
  const pourLaListe = suffrageCurrent - nominatif;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '72px',
        backgroundColor: 'white',
        borderTop: '1px solid #dce3e8',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        padding: '0 32px',
        gap: '24px',
      }}
    >
      {/* Left: Search input */}
      <div style={{ width: '420px', flexShrink: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #c3d1dc',
            borderRadius: '4px',
            height: '44px',
            padding: '0 12px',
            backgroundColor: 'white',
            gap: '8px',
          }}
        >
          {/* Magnifier icon */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="9" cy="9" r="6.5" stroke="#697983" strokeWidth="1.5" />
            <path d="M14 14l3 3" stroke="#697983" strokeWidth="1.5" strokeLinecap="round" />
          </svg>

          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Tapez un nom ou numéro..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              fontFamily: 'var(--font-open-sans), sans-serif',
              color: '#273c46',
              backgroundColor: 'transparent',
            }}
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange('')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                color: '#697983',
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="#697983" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Center: Suffrage info */}
      <div className="flex-1 flex items-center justify-center">
        {!isLast ? (
          <div className="flex items-center gap-3">
            <span
              style={{
                fontSize: '14px',
                color: '#273c46',
                fontWeight: 600,
                fontFamily: 'var(--font-open-sans), sans-serif',
                whiteSpace: 'nowrap',
              }}
            >
              {suffrageCurrent}/{suffrageTotal} suffrages
            </span>
            <div
              style={{
                width: '192px',
                height: '8px',
                backgroundColor: '#dce3e8',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  backgroundColor: '#3a862d',
                  borderRadius: '4px',
                  transition: 'width 0.2s ease',
                }}
              />
            </div>
            <span
              style={{
                fontSize: '13px',
                color: '#697983',
                fontFamily: 'var(--font-open-sans), sans-serif',
                whiteSpace: 'nowrap',
              }}
            >
              Reste {reste}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <span
                style={{
                  fontSize: '10px',
                  color: '#697983',
                  fontFamily: 'var(--font-open-sans), sans-serif',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                SUFFRAGE NOMINATIF
              </span>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#273c46',
                  fontFamily: 'var(--font-open-sans), sans-serif',
                  lineHeight: '1.2',
                }}
              >
                {nominatif}
              </span>
            </div>
            <div
              style={{
                width: '1px',
                height: '32px',
                backgroundColor: '#dce3e8',
              }}
            />
            <div className="flex flex-col items-center">
              <span
                style={{
                  fontSize: '10px',
                  color: '#697983',
                  fontFamily: 'var(--font-open-sans), sans-serif',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                SUFFRAGE POUR LA LISTE
              </span>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#273c46',
                  fontFamily: 'var(--font-open-sans), sans-serif',
                  lineHeight: '1.2',
                }}
              >
                {pourLaListe}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Right: Navigation buttons */}
      <div className="flex items-center gap-3" style={{ flexShrink: 0 }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            height: '40px',
            padding: '0 16px',
            border: '1px solid #3a862d',
            borderRadius: '4px',
            backgroundColor: 'white',
            color: '#3a862d',
            fontSize: '14px',
            fontWeight: 500,
            fontFamily: 'var(--font-open-sans), sans-serif',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Retour aux bulletins
        </button>

        <button
          type="button"
          onClick={onNext}
          style={{
            height: '40px',
            padding: '0 20px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: isLast ? '#273c46' : '#3a862d',
            color: 'white',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'var(--font-open-sans), sans-serif',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
          }}
        >
          {isLast ? (
            'Terminer'
          ) : (
            <>
              Suivant
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
