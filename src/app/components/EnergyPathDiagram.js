import { BatteryCharging, RefreshCw, Sun, Wind, Zap } from 'lucide-react';

const ENERGY_STEPS = [
  {
    number: '01',
    title: 'Wind capture',
    detail: '360° omnidirectional blades',
    Icon: Wind,
  },
  {
    number: '02',
    title: 'Rotor rotation',
    detail: 'Vertical shaft spins smoothly',
    Icon: RefreshCw,
  },
  {
    number: '03',
    title: 'Power generation',
    detail: 'Ground-level generator operation',
    Icon: Zap,
  },
  {
    number: '04',
    title: 'Storage / grid',
    detail: 'Energy storage or grid supply',
    Icon: BatteryCharging,
  },
];

export default function EnergyPathDiagram() {
  return (
    <div className="energy-system" aria-label="Four-stage energy path from wind capture to storage or grid supply">
      <div className="energy-path-line" aria-hidden="true">
        <svg viewBox="0 0 1000 78" preserveAspectRatio="none">
          <path className="energy-path-base" d="M20 39 H980" />
          <path className="energy-path-flow" d="M20 39 H980" />
        </svg>
      </div>

      <ol className="energy-steps">
        {ENERGY_STEPS.map(({ number, title, detail, Icon }) => (
          <li className="energy-step" key={number}>
            <div className="energy-node" aria-hidden="true">
              <Icon size={26} strokeWidth={1.6} />
            </div>
            <span className="energy-step-number">{number}</span>
            <h3>{title}</h3>
            <p>{detail}</p>
          </li>
        ))}
      </ol>

      <div className="hybrid-branch">
        <span className="hybrid-branch-line" aria-hidden="true" />
        <div className="hybrid-branch-content">
          <Sun size={22} strokeWidth={1.6} aria-hidden="true" />
          <span><strong>Solar input</strong> / Hybrid compatible</span>
        </div>
      </div>
    </div>
  );
}
