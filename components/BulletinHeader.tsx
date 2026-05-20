interface BulletinHeaderProps {
  bulletinNumber: string;
  isLast?: boolean;
}

export default function BulletinHeader({ bulletinNumber, isLast = false }: BulletinHeaderProps) {
  const total = 6;
  const recorded = 1;
  const progressPercent = (recorded / total) * 100;

  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '12px 32px' }}>
      {/* Row 1 */}
      <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
        {/* Left: Title */}
        <span
          style={{
            fontFamily: 'var(--font-roboto-slab), serif',
            fontWeight: 700,
            fontSize: '22px',
            color: '#273c46',
          }}
        >
          Ajouter un bulletin modifié
        </span>

        {/* Right: Progress + Help */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span
              style={{
                fontSize: '12px',
                color: '#697983',
                fontFamily: 'var(--font-open-sans), sans-serif',
                whiteSpace: 'nowrap',
              }}
            >
              Progression de saisie des bulletins
            </span>
            <span
              style={{
                fontSize: '12px',
                color: '#273c46',
                fontWeight: 600,
                fontFamily: 'var(--font-open-sans), sans-serif',
                whiteSpace: 'nowrap',
              }}
            >
              {recorded}/{total} bulletins enregistrés
            </span>
            {/* Progress bar */}
            <div
              className="rounded-full overflow-hidden"
              style={{
                width: '96px',
                height: '6px',
                backgroundColor: '#dce3e8',
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  backgroundColor: '#ff9c00',
                }}
              />
            </div>
          </div>

          {/* Help button */}
          <button
            type="button"
            className="flex items-center gap-1"
            style={{
              border: '1px solid #dce3e8',
              borderRadius: '4px',
              padding: '4px 10px',
              fontSize: '12px',
              color: '#697983',
              backgroundColor: 'white',
              fontFamily: 'var(--font-open-sans), sans-serif',
              cursor: 'pointer',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7" cy="7" r="6.5" stroke="#697983" />
              <text x="7" y="11" textAnchor="middle" fontSize="9" fill="#697983" fontWeight="700">?</text>
            </svg>
            Aide
          </button>
        </div>
      </div>

      {/* Row 2: Breadcrumb pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {[
          'Élection du Conseil Communal RP',
          '12 Mai 2025',
          'Lausanne-Ville',
          `Liste ${bulletinNumber} – Les verts`,
        ].map((label, i) => (
          <span
            key={i}
            style={{
              border: '1px solid #dce3e8',
              borderRadius: '4px',
              padding: '2px 8px',
              fontSize: '12px',
              color: '#697983',
              backgroundColor: 'white',
              fontFamily: 'var(--font-open-sans), sans-serif',
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
