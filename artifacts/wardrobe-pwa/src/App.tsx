import { useState } from 'react';

type Step = 'INNER_BASE' | 'INNER_TYPE' | 'INNER_COLOR' | 'OUTER_START';

export default function App() {
  const [step, setStep] = useState<Step>('INNER_BASE');
  const [selections, setSelections] = useState({
    innerBase: '',
    innerType: '',
    innerColor: '',
  });

  const nextStep = (next: Step, update: Partial<typeof selections>) => {
    setSelections(prev => ({ ...prev, ...update }));
    setStep(next);
  };

  // Standard CSS styles to replace Tailwind
  const styles = {
    container: { minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'sans-serif' },
    card: { backgroundColor: 'white', width: '100%', maxWidth: '400px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '30px' },
    button: { width: '100%', textAlign: 'left' as const, padding: '15px', marginBottom: '10px', borderRadius: '12px', border: '2px solid #eee', backgroundColor: 'white', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' },
    title: { fontSize: '24px', fontWeight: '800', marginBottom: '20px' },
    label: { fontSize: '12px', color: '#999', fontWeight: 'bold', textTransform: 'uppercase' as const, letterSpacing: '1px' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ marginBottom: '20px' }}>
          <p style={styles.label}>Step {step === 'INNER_BASE' ? '1' : step === 'INNER_TYPE' ? '2' : '3'} of 3</p>
          <h1 style={styles.title}>Wardrobe Matrix</h1>
        </div>

        {step === 'INNER_BASE' && (
          <div>
            <h2 style={{ marginBottom: '15px' }}>Choose Inner Top:</h2>
            {['T-Shirt', 'Button Down', 'Tank Top'].map(item => (
              <button key={item} style={styles.button} onClick={() => nextStep('INNER_TYPE', { innerBase: item })}>
                {item}
              </button>
            ))}
          </div>
        )}

        {step === 'INNER_TYPE' && (
          <div>
            <h2 style={{ marginBottom: '15px' }}>Style of {selections.innerBase}:</h2>
            {['Oversized', 'Slim Fit', 'Regular'].map(type => (
              <button key={type} style={styles.button} onClick={() => nextStep('INNER_COLOR', { innerType: type })}>
                {type}
              </button>
            ))}
            <button onClick={() => setStep('INNER_BASE')} style={{ border: 'none', background: 'none', color: '#999', width: '100%', cursor: 'pointer' }}>Go Back</button>
          </div>
        )}

        {step === 'INNER_COLOR' && (
          <div>
            <h2 style={{ marginBottom: '15px' }}>Pick a Color:</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {['White', 'Black', 'Navy', 'Grey'].map(color => (
                <button key={color} style={styles.button} onClick={() => nextStep('OUTER_START', { innerColor: color })}>
                  {color}
                </button>
              ))}
            </div>
            <button onClick={() => setStep('INNER_TYPE')} style={{ border: 'none', background: 'none', color: '#999', width: '100%', marginTop: '10px', cursor: 'pointer' }}>Go Back</button>
          </div>
        )}

        {step === 'OUTER_START' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '15px', marginBottom: '20px' }}>
              <p style={styles.label}>Selection</p>
              <h3>{selections.innerColor} {selections.innerType} {selections.innerBase}</h3>
            </div>
            <button style={{ ...styles.button, backgroundColor: 'black', color: 'white', textAlign: 'center' }}>Next: Outer Top</button>
          </div>
        )}
      </div>
    </div>
  );
}