import { useState } from 'react';

type Step = 'INNER_BASE' | 'INNER_COLOR' | 'OUTER_TYPE' | 'SUMMARY';

interface Outfit {
  innerBase: string;
  innerColor: string;
  outerType: string;
}

const INITIAL_OUTFIT: Outfit = {
  innerBase: '',
  innerColor: '',
  outerType: '',
};

const STEP_NUMBER: Record<Step, number> = {
  INNER_BASE: 1,
  INNER_COLOR: 2,
  OUTER_TYPE: 3,
  SUMMARY: 4,
};

const s = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontFamily: "'Inter', system-ui, sans-serif",
  } as React.CSSProperties,
  card: {
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: '420px',
    borderRadius: '24px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
    padding: '36px 32px',
  } as React.CSSProperties,
  stepLabel: {
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase' as const,
    color: '#9ca3af',
    marginBottom: '6px',
  },
  title: {
    fontSize: '26px',
    fontWeight: 800,
    color: '#111827',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '15px',
    color: '#6b7280',
    marginBottom: '28px',
  },
  progressBar: {
    display: 'flex',
    gap: '6px',
    marginBottom: '32px',
  },
  progressSegment: (active: boolean, done: boolean) => ({
    flex: 1,
    height: '4px',
    borderRadius: '4px',
    backgroundColor: done ? '#111827' : active ? '#6b7280' : '#e5e7eb',
    transition: 'background-color 0.3s',
  } as React.CSSProperties),
  optionBtn: {
    display: 'block',
    width: '100%',
    textAlign: 'left' as const,
    padding: '16px 20px',
    marginBottom: '10px',
    borderRadius: '14px',
    border: '2px solid #e5e7eb',
    backgroundColor: '#ffffff',
    fontSize: '15px',
    fontWeight: 700,
    color: '#111827',
    cursor: 'pointer',
    transition: 'border-color 0.15s, background-color 0.15s',
  } as React.CSSProperties,
  optionBtnHover: {
    borderColor: '#111827',
    backgroundColor: '#f9fafb',
  } as React.CSSProperties,
  backBtn: {
    display: 'block',
    width: '100%',
    border: 'none',
    background: 'none',
    color: '#9ca3af',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '16px',
    padding: '8px',
    borderRadius: '8px',
    textAlign: 'center' as const,
  } as React.CSSProperties,
  summaryBox: {
    backgroundColor: '#f9fafb',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '28px',
    textAlign: 'center' as const,
  } as React.CSSProperties,
  summaryLabel: {
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase' as const,
    color: '#9ca3af',
    marginBottom: '10px',
  },
  summaryText: {
    fontSize: '20px',
    fontWeight: 800,
    color: '#111827',
    lineHeight: '1.4',
  },
  restartBtn: {
    display: 'block',
    width: '100%',
    padding: '16px',
    borderRadius: '14px',
    border: 'none',
    backgroundColor: '#111827',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
    textAlign: 'center' as const,
  } as React.CSSProperties,
};

function ProgressBar({ current }: { current: number }) {
  return (
    <div style={s.progressBar}>
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          style={s.progressSegment(n === current, n < current)}
        />
      ))}
    </div>
  );
}

function OptionButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={{ ...s.optionBtn, ...(hovered ? s.optionBtnHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default function App() {
  const [step, setStep] = useState<Step>('INNER_BASE');
  const [outfit, setOutfit] = useState<Outfit>(INITIAL_OUTFIT);

  const currentStep = STEP_NUMBER[step];

  const buildSummary = (o: Outfit) => {
    const outer =
      o.outerType === 'None'
        ? 'no outer layer'
        : `a ${o.outerType}`;
    return `${o.innerColor} ${o.innerBase} T-Shirt with ${outer}`;
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <p style={s.stepLabel}>Step {currentStep} of 4</p>
        <h1 style={s.title}>Wardrobe Builder</h1>

        <ProgressBar current={currentStep} />

        {step === 'INNER_BASE' && (
          <div>
            <p style={s.subtitle}>Choose your fit:</p>
            {['Oversized', 'Regular Fit'].map((item) => (
              <OptionButton
                key={item}
                label={item}
                onClick={() => {
                  setOutfit((prev) => ({ ...prev, innerBase: item }));
                  setStep('INNER_COLOR');
                }}
              />
            ))}
          </div>
        )}

        {step === 'INNER_COLOR' && (
          <div>
            <p style={s.subtitle}>Pick a color:</p>
            {['White', 'Black', 'Grey'].map((color) => (
              <OptionButton
                key={color}
                label={color}
                onClick={() => {
                  setOutfit((prev) => ({ ...prev, innerColor: color }));
                  setStep('OUTER_TYPE');
                }}
              />
            ))}
            <button style={s.backBtn} onClick={() => setStep('INNER_BASE')}>
              ← Back
            </button>
          </div>
        )}

        {step === 'OUTER_TYPE' && (
          <div>
            <p style={s.subtitle}>Add an outer layer:</p>
            {['Jacket', 'Hoodie', 'None'].map((type) => (
              <OptionButton
                key={type}
                label={type}
                onClick={() => {
                  setOutfit((prev) => ({ ...prev, outerType: type }));
                  setStep('SUMMARY');
                }}
              />
            ))}
            <button style={s.backBtn} onClick={() => setStep('INNER_COLOR')}>
              ← Back
            </button>
          </div>
        )}

        {step === 'SUMMARY' && (
          <div>
            <div style={s.summaryBox}>
              <p style={s.summaryLabel}>Your Outfit</p>
              <p style={s.summaryText}>{buildSummary(outfit)}</p>
            </div>
            <button
              style={s.restartBtn}
              onClick={() => {
                setOutfit(INITIAL_OUTFIT);
                setStep('INNER_BASE');
              }}
            >
              Start Over
            </button>
            <button style={s.backBtn} onClick={() => setStep('OUTER_TYPE')}>
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
