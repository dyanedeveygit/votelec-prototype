export default function Header() {
  return (
    <header>
      {/* Top stripe: alternating dark and green dashes */}
      <div
        style={{
          height: '10px',
          backgroundImage:
            'repeating-linear-gradient(90deg, #273c46 0px, #273c46 10px, #3a862d 10px, #3a862d 20px)',
        }}
      />

      {/* Header bar */}
      <div
        className="bg-white flex items-center justify-between px-8"
        style={{ height: '72px' }}
      >
        {/* Left: État de Vaud + subtitle */}
        <div>
          <div className="flex flex-col">
            <span
              style={{
                fontFamily: 'var(--font-roboto-slab), serif',
                fontWeight: 700,
                fontSize: '20px',
                color: '#273c46',
                lineHeight: '1.2',
              }}
            >
              ÉTAT DE VAUD
            </span>
            <div
              style={{
                width: '100%',
                height: '3px',
                backgroundColor: '#3a862d',
                marginTop: '2px',
                marginBottom: '2px',
              }}
            />
            <span
              style={{
                fontSize: '12px',
                color: '#697983',
                fontFamily: 'var(--font-open-sans), sans-serif',
              }}
            >
              Lausanne-Ville
            </span>
          </div>
        </div>

        {/* Right: User info + avatar */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div
              style={{
                fontFamily: 'var(--font-open-sans), sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                color: '#273c46',
                lineHeight: '1.3',
              }}
            >
              Francois GASSER
            </div>
            <div
              style={{
                fontSize: '12px',
                color: '#697983',
              }}
            >
              Lausanne-Ville
            </div>
          </div>
          <div
            className="flex items-center justify-center rounded-full text-white"
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#3a862d',
              fontFamily: 'var(--font-open-sans), sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              flexShrink: 0,
            }}
          >
            F
          </div>
        </div>
      </div>
    </header>
  );
}
