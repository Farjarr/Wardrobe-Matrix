import { useState } from 'react';
import {
  wardrobe,
  getPrioritizedColors,
  formatKey,
  type OutfitTypeKey,
  type InnerLayerKey,
  type OuterLayerKey,
  type BottomLayerKey,
  type FootwearKey,
} from './wardrobe-data';
import { checkCompatibility } from './compatibility';

type Step =
  | 'OUTFIT_TYPE'
  | 'INNER_FIT'
  | 'INNER_ITEM'
  | 'COLOR'
  | 'OUTER_CAT'
  | 'OUTER_ITEM'
  | 'BOTTOM_CAT'
  | 'BOTTOM_ITEM'
  | 'FOOTWEAR_CAT'
  | 'FOOTWEAR_ITEM'
  | 'SUMMARY';

interface Outfit {
  outfitType: string;
  innerFit: string;
  innerItem: string;
  color: string;
  outerCat: string;
  outerItem: string;
  bottomCat: string;
  bottomItem: string;
  footwearCat: string;
  footwearItem: string;
}

const INITIAL_OUTFIT: Outfit = {
  outfitType: '',
  innerFit: '',
  innerItem: '',
  color: '',
  outerCat: '',
  outerItem: '',
  bottomCat: '',
  bottomItem: '',
  footwearCat: '',
  footwearItem: '',
};

const OUTFIT_TYPE_OPTIONS: { key: OutfitTypeKey; label: string; desc: string }[] = [
  { key: 'minimal',      label: 'Minimal',      desc: 'Clean, neutral tones' },
  { key: 'smart_casual', label: 'Smart Casual',  desc: 'Elevated everyday looks' },
  { key: 'streetwear',   label: 'Streetwear',    desc: 'Bold & urban edge' },
  { key: 'casual',       label: 'Casual',         desc: 'Relaxed & everyday' },
  { key: 'summer',       label: 'Summer',         desc: 'Light pastels & breezy fits' },
];

const OUTER_NONE = 'none';

const ALL_STEPS: Step[] = [
  'OUTFIT_TYPE', 'INNER_FIT', 'INNER_ITEM', 'COLOR',
  'OUTER_CAT', 'OUTER_ITEM', 'BOTTOM_CAT', 'BOTTOM_ITEM',
  'FOOTWEAR_CAT', 'FOOTWEAR_ITEM', 'SUMMARY',
];

function getStepNumber(step: Step, outerCat: string): number {
  if (outerCat === OUTER_NONE) {
    const reduced: Step[] = [
      'OUTFIT_TYPE', 'INNER_FIT', 'INNER_ITEM', 'COLOR',
      'OUTER_CAT', 'BOTTOM_CAT', 'BOTTOM_ITEM',
      'FOOTWEAR_CAT', 'FOOTWEAR_ITEM', 'SUMMARY',
    ];
    const i = reduced.indexOf(step);
    return i === -1 ? ALL_STEPS.indexOf(step) + 1 : i + 1;
  }
  return ALL_STEPS.indexOf(step) + 1;
}

function getTotalSteps(outerCat: string): number {
  return outerCat === OUTER_NONE ? 10 : 11;
}

function getBackStep(step: Step, outfit: Outfit): Step {
  switch (step) {
    case 'INNER_FIT':    return 'OUTFIT_TYPE';
    case 'INNER_ITEM':   return 'INNER_FIT';
    case 'COLOR':        return 'INNER_ITEM';
    case 'OUTER_CAT':    return 'COLOR';
    case 'OUTER_ITEM':   return 'OUTER_CAT';
    case 'BOTTOM_CAT':   return outfit.outerCat === OUTER_NONE ? 'OUTER_CAT' : 'OUTER_ITEM';
    case 'BOTTOM_ITEM':  return 'BOTTOM_CAT';
    case 'FOOTWEAR_CAT': return 'BOTTOM_ITEM';
    case 'FOOTWEAR_ITEM':return 'FOOTWEAR_CAT';
    case 'SUMMARY':      return 'FOOTWEAR_ITEM';
    default:             return 'OUTFIT_TYPE';
  }
}

function buildPrompt(outfit: Outfit): string {
  const vibe = formatKey(outfit.outfitType);
  const inner = `${outfit.color} ${outfit.innerItem}`.toLowerCase();
  const outer = outfit.outerCat !== OUTER_NONE
    ? ` layered under a ${outfit.outerItem.toLowerCase()},`
    : ',';
  const bottom = outfit.bottomItem.toLowerCase();
  const shoe = outfit.footwearItem.toLowerCase();
  return `A ${vibe} look — ${inner}${outer} paired with ${bottom} and ${shoe}.`;
}

// ── Styles ──────────────────────────────────────────────────────────────────

const wizardPage: React.CSSProperties = {
  minHeight: '100vh',
  backgroundColor: '#f3f4f6',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  fontFamily: "'Inter', system-ui, sans-serif",
};

const wizardCard: React.CSSProperties = {
  backgroundColor: '#ffffff',
  width: '100%',
  maxWidth: '440px',
  borderRadius: '24px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
  padding: '36px 32px',
};

const stepLabelStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  color: '#9ca3af',
  marginBottom: '4px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 800,
  color: '#111827',
  marginBottom: '4px',
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#6b7280',
  marginBottom: '24px',
};

const progressBarWrap: React.CSSProperties = {
  display: 'flex',
  gap: '4px',
  marginBottom: '28px',
};

const optBtnBase: React.CSSProperties = {
  display: 'block',
  width: '100%',
  textAlign: 'left',
  padding: '14px 18px',
  marginBottom: '8px',
  borderRadius: '14px',
  border: '2px solid #e5e7eb',
  backgroundColor: '#ffffff',
  fontSize: '14px',
  fontWeight: 600,
  color: '#111827',
  cursor: 'pointer',
};

const backBtnStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  border: 'none',
  background: 'none',
  color: '#9ca3af',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  marginTop: '12px',
  padding: '8px',
  textAlign: 'center',
};

const colorDotStyle = (color: string): React.CSSProperties => ({
  width: '11px',
  height: '11px',
  borderRadius: '50%',
  backgroundColor: color.toLowerCase(),
  border: '1px solid rgba(0,0,0,.12)',
  display: 'inline-block',
  marginRight: '8px',
  verticalAlign: 'middle',
  flexShrink: 0,
});

// ── Sub-components ────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div style={progressBarWrap}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: '4px', borderRadius: '4px',
          backgroundColor: i + 1 < current ? '#111827' : i + 1 === current ? '#6b7280' : '#e5e7eb',
          transition: 'background-color 0.3s',
        }} />
      ))}
    </div>
  );
}

function OptionBtn({ label, desc, onClick }: { label: string; desc?: string; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      style={{ ...optBtnBase, borderColor: hov ? '#111827' : '#e5e7eb', backgroundColor: hov ? '#f9fafb' : '#fff' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
    >
      <span>{label}</span>
      {desc && <span style={{ display: 'block', fontSize: '12px', color: '#9ca3af', fontWeight: 400, marginTop: '2px' }}>{desc}</span>}
    </button>
  );
}

function ColorBtn({ color, onClick }: { color: string; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      style={{ ...optBtnBase, borderColor: hov ? '#111827' : '#e5e7eb', backgroundColor: hov ? '#f9fafb' : '#fff', display: 'flex', alignItems: 'center' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
    >
      <span style={colorDotStyle(color)} />
      {color}
    </button>
  );
}

function ScrollList({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxHeight: '340px', overflowY: 'auto', paddingRight: '4px' }}>
      {children}
    </div>
  );
}

// ── Summary (full-page) ───────────────────────────────────────────────────────

function SummaryPage({
  outfit,
  onRestart,
  onBack,
}: {
  outfit: Outfit;
  onRestart: () => void;
  onBack: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const prompt = buildPrompt(outfit);
i m  const checks = checkCompatibility(outfit);
  const hasOuter = outfit.outerCat !== OUTER_NONE;
  const hasWarnings = checks.some((c) => c.status === 'warn');

  const copy = () => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="wrap" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      <p className="page-title">Your Outfit</p>
      <p className="page-sub">{formatKey(outfit.outfitType)} · built with Wardrobe Builder</p>

      {/* Result card */}
      <div className="result-area">
        <span className="result-label">Outfit Breakdown</span>

        {/* Outfit tag row */}
        <div className="outfit-row">
          <span className="outfit-tag tag-inner">
            <span style={colorDotStyle(outfit.color)} />
            {outfit.color} {outfit.innerItem}
          </span>
          <span className="arrow">→</span>
          {hasOuter ? (
            <>
              <span className="outfit-tag tag-outer">{outfit.outerItem}</span>
              <span className="arrow">→</span>
            </>
          ) : (
            <>
              <span className="outfit-tag tag-other">No Outer Layer</span>
              <span className="arrow">→</span>
            </>
          )}
          <span className="outfit-tag tag-bottom">{outfit.bottomItem}</span>
          <span className="arrow">→</span>
          <span className="outfit-tag tag-shoe">{outfit.footwearItem}</span>
        </div>

        {/* Layer detail badges */}
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { label: 'Vibe',        value: formatKey(outfit.outfitType) },
            { label: 'Inner Fit',   value: formatKey(outfit.innerFit) },
            { label: 'Color',       value: outfit.color },
            { label: 'Outer Layer', value: hasOuter ? outfit.outerItem : 'None' },
            { label: 'Bottoms',     value: outfit.bottomItem },
            { label: 'Footwear',    value: outfit.footwearItem },
          ].map(({ label, value }) => (
            <div key={label} className="concept-row">
              <span className="concept-label">{label}</span>
              <span className="concept-badge">{value}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="divider" style={{ marginTop: '20px' }} />

        {/* Compatibility feedback */}
        <span className="result-label">Compatibility Check</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {checks.map((check, i) => (
            <p
              key={i}
              className={`balance-msg ${check.status === 'ok' ? 'balance-ok' : 'balance-warn'}`}
            >
              {check.status === 'ok' ? '✓ ' : '⚠ '}
              {check.message}
            </p>
          ))}
        </div>

        {hasWarnings && (
          <p style={{ fontSize: '11px', color: '#bbb', marginTop: '10px' }}>
            Warnings are suggestions — great outfits sometimes break the rules.
          </p>
        )}
      </div>

      {/* Prompt area */}
      <div className="prompt-area">
        <div className="prompt-header">
          <span className="result-label" style={{ marginBottom: 0 }}>Outfit Prompt</span>
          <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={copy}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <p className="prompt-text">{prompt}</p>
      </div>

      {/* Actions */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={onRestart}
          style={{
            flex: 1, padding: '13px', borderRadius: '12px', border: 'none',
            backgroundColor: '#1a1a1a', color: '#fff', fontSize: '14px',
            fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', system-ui, sans-serif",
          }}
        >
          Build Another
        </button>
        <button
          onClick={onBack}
          style={{
            padding: '13px 20px', borderRadius: '12px',
            border: '1px solid rgba(0,0,0,.14)', backgroundColor: '#f5f4f0',
            fontSize: '14px', fontWeight: 600, color: '#444', cursor: 'pointer',
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [step, setStep] = useState<Step>('OUTFIT_TYPE');
  const [outfit, setOutfit] = useState<Outfit>(INITIAL_OUTFIT);

  const save = (update: Partial<Outfit>) =>
    setOutfit((prev) => ({ ...prev, ...update }));

  const goBack = () => setStep(getBackStep(step, outfit));

  const restart = () => {
    setOutfit(INITIAL_OUTFIT);
    setStep('OUTFIT_TYPE');
  };

  // Full-page summary breaks out of the wizard card
  if (step === 'SUMMARY') {
    return (
      <SummaryPage
        outfit={outfit}
        onRestart={restart}
        onBack={goBack}
      />
    );
  }

  const currentNum = getStepNumber(step, outfit.outerCat);
  const totalNum = getTotalSteps(outfit.outerCat);

  const BackBtn = () => (
    <button style={backBtnStyle} onClick={goBack}>← Back</button>
  );

  return (
    <div style={wizardPage}>
      <div style={wizardCard}>
        <p style={stepLabelStyle}>Step {currentNum} of {totalNum}</p>
        <h1 style={titleStyle}>Wardrobe Builder</h1>
        <ProgressBar current={currentNum} total={totalNum} />

        {/* STEP 1: Outfit Type */}
        {step === 'OUTFIT_TYPE' && (
          <div>
            <p style={subtitleStyle}>What's the vibe?</p>
            {OUTFIT_TYPE_OPTIONS.map(({ key, label, desc }) => (
              <OptionBtn key={key} label={label} desc={desc}
                onClick={() => { save({ outfitType: key }); setStep('INNER_FIT'); }} />
            ))}
          </div>
        )}

        {/* STEP 2: Inner Fit Category */}
        {step === 'INNER_FIT' && (
          <div>
            <p style={subtitleStyle}>Choose your inner layer fit:</p>
            <ScrollList>
              {(Object.keys(wardrobe.inner_layer) as InnerLayerKey[]).map((fit) => (
                <OptionBtn key={fit} label={formatKey(fit)}
                  onClick={() => { save({ innerFit: fit, innerItem: '' }); setStep('INNER_ITEM'); }} />
              ))}
            </ScrollList>
            <BackBtn />
          </div>
        )}

        {/* STEP 3: Inner Item */}
        {step === 'INNER_ITEM' && (
          <div>
            <p style={subtitleStyle}>Pick a specific style:</p>
            <ScrollList>
              {wardrobe.inner_layer[outfit.innerFit as InnerLayerKey]?.map((item) => (
                <OptionBtn key={item} label={item}
                  onClick={() => { save({ innerItem: item }); setStep('COLOR'); }} />
              ))}
            </ScrollList>
            <BackBtn />
          </div>
        )}

        {/* STEP 4: Color */}
        {step === 'COLOR' && (
          <div>
            <p style={subtitleStyle}>
              Pick a color{' '}
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                (prioritized for {formatKey(outfit.outfitType)})
              </span>
            </p>
            <ScrollList>
              {getPrioritizedColors(outfit.outfitType as OutfitTypeKey).map((color) => (
                <ColorBtn key={color} color={color}
                  onClick={() => { save({ color }); setStep('OUTER_CAT'); }} />
              ))}
            </ScrollList>
            <BackBtn />
          </div>
        )}

        {/* STEP 5: Outer Layer Category */}
        {step === 'OUTER_CAT' && (
          <div>
            <p style={subtitleStyle}>Add an outer layer:</p>
            <ScrollList>
              {(Object.keys(wardrobe.outer_layer) as OuterLayerKey[]).map((cat) => (
                <OptionBtn key={cat} label={formatKey(cat)}
                  onClick={() => { save({ outerCat: cat, outerItem: '' }); setStep('OUTER_ITEM'); }} />
              ))}
              <OptionBtn label="No Outer Layer" desc="Go straight to bottoms"
                onClick={() => { save({ outerCat: OUTER_NONE, outerItem: '' }); setStep('BOTTOM_CAT'); }} />
            </ScrollList>
            <BackBtn />
          </div>
        )}

        {/* STEP 6: Outer Item */}
        {step === 'OUTER_ITEM' && (
          <div>
            <p style={subtitleStyle}>Choose a specific outer layer:</p>
            <ScrollList>
              {wardrobe.outer_layer[outfit.outerCat as OuterLayerKey]?.map((item) => (
                <OptionBtn key={item} label={item}
                  onClick={() => { save({ outerItem: item }); setStep('BOTTOM_CAT'); }} />
              ))}
            </ScrollList>
            <BackBtn />
          </div>
        )}

        {/* STEP 7: Bottom Category */}
        {step === 'BOTTOM_CAT' && (
          <div>
            <p style={subtitleStyle}>Choose your bottoms:</p>
            <ScrollList>
              {(Object.keys(wardrobe.bottom_layer) as BottomLayerKey[]).map((cat) => (
                <OptionBtn key={cat} label={formatKey(cat)}
                  onClick={() => { save({ bottomCat: cat, bottomItem: '' }); setStep('BOTTOM_ITEM'); }} />
              ))}
            </ScrollList>
            <BackBtn />
          </div>
        )}

        {/* STEP 8: Bottom Item */}
        {step === 'BOTTOM_ITEM' && (
          <div>
            <p style={subtitleStyle}>Choose a specific style:</p>
            <ScrollList>
              {wardrobe.bottom_layer[outfit.bottomCat as BottomLayerKey]?.map((item) => (
                <OptionBtn key={item} label={item}
                  onClick={() => { save({ bottomItem: item }); setStep('FOOTWEAR_CAT'); }} />
              ))}
            </ScrollList>
            <BackBtn />
          </div>
        )}

        {/* STEP 9: Footwear Category */}
        {step === 'FOOTWEAR_CAT' && (
          <div>
            <p style={subtitleStyle}>Choose your footwear type:</p>
            <ScrollList>
              {(Object.keys(wardrobe.footwear) as FootwearKey[]).map((cat) => (
                <OptionBtn key={cat} label={formatKey(cat)}
                  onClick={() => { save({ footwearCat: cat, footwearItem: '' }); setStep('FOOTWEAR_ITEM'); }} />
              ))}
            </ScrollList>
            <BackBtn />
          </div>
        )}

        {/* STEP 10: Footwear Item */}
        {step === 'FOOTWEAR_ITEM' && (
          <div>
            <p style={subtitleStyle}>Choose a specific pair:</p>
            <ScrollList>
              {wardrobe.footwear[outfit.footwearCat as FootwearKey]?.map((item) => (
                <OptionBtn key={item} label={item}
                  onClick={() => { save({ footwearItem: item }); setStep('SUMMARY'); }} />
              ))}
            </ScrollList>
            <BackBtn />
          </div>
        )}
      </div>
    </div>
  );
}
