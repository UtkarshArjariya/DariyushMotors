export default function TurbineDiagram() {
  return (
    <figure className="turbine-figure" aria-labelledby="turbine-diagram-title">
      <figcaption className="diagram-heading">
        <span id="turbine-diagram-title">360° capture section</span>
        <span>VAWT / FIG. 01</span>
      </figcaption>

      <svg
        className="turbine-svg"
        viewBox="0 0 620 620"
        role="img"
        aria-label="Technical illustration of a vertical axis wind turbine receiving wind from every direction, with its generator at ground level"
      >
        <defs>
          <marker id="airflow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" className="diagram-fill-safety" />
          </marker>
          <marker id="callout-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="diagram-fill-carbon" />
          </marker>
        </defs>

        <circle cx="310" cy="292" r="228" className="diagram-orbit" />
        <circle cx="310" cy="292" r="178" className="diagram-orbit diagram-orbit-inner" />
        <line x1="310" y1="50" x2="310" y2="540" className="diagram-axis" />
        <line x1="67" y1="292" x2="553" y2="292" className="diagram-axis" />

        <g className="airflow airflow-north">
          <path d="M310 30 L310 124" markerEnd="url(#airflow-arrow)" />
          <text x="310" y="18" textAnchor="middle">N / WIND INPUT</text>
        </g>
        <g className="airflow airflow-east">
          <path d="M590 292 L496 292" markerEnd="url(#airflow-arrow)" />
          <text x="602" y="296" textAnchor="end" transform="rotate(-90 602 296)">E / WIND INPUT</text>
        </g>
        <g className="airflow airflow-south">
          <path d="M310 554 L310 460" markerEnd="url(#airflow-arrow)" />
          <text x="310" y="585" textAnchor="middle">S / WIND INPUT</text>
        </g>
        <g className="airflow airflow-west">
          <path d="M30 292 L124 292" markerEnd="url(#airflow-arrow)" />
          <text x="18" y="296" transform="rotate(90 18 296)">W / WIND INPUT</text>
        </g>

        <g className="airflow airflow-diagonal">
          <path d="M110 92 L171 153" markerEnd="url(#airflow-arrow)" />
          <path d="M510 92 L449 153" markerEnd="url(#airflow-arrow)" />
          <path d="M510 492 L449 431" markerEnd="url(#airflow-arrow)" />
          <path d="M110 492 L171 431" markerEnd="url(#airflow-arrow)" />
        </g>

        <g className="rotor-assembly">
          <ellipse cx="310" cy="176" rx="85" ry="20" className="diagram-rotor-top" />
          <path d="M310 176 C215 205 220 360 310 410 C270 335 270 247 310 176Z" className="diagram-blade diagram-blade-left" />
          <path d="M310 176 C405 205 400 360 310 410 C350 335 350 247 310 176Z" className="diagram-blade diagram-blade-right" />
          <ellipse cx="310" cy="410" rx="85" ry="20" className="diagram-rotor-bottom" />
          <line x1="310" y1="160" x2="310" y2="477" className="diagram-shaft" />
          <circle cx="310" cy="292" r="18" className="diagram-hub" />
        </g>

        <g className="rotation-indicator">
          <path d="M235 211 A110 110 0 0 1 395 218" markerEnd="url(#airflow-arrow)" />
          <text x="405" y="202">ROTOR MOTION</text>
        </g>

        <g className="generator-unit">
          <rect x="266" y="465" width="88" height="66" rx="3" />
          <line x1="278" y1="480" x2="342" y2="480" />
          <line x1="278" y1="492" x2="342" y2="492" />
          <circle cx="310" cy="512" r="8" />
        </g>
        <line x1="354" y1="497" x2="470" y2="497" className="diagram-callout" markerEnd="url(#callout-arrow)" />
        <g className="diagram-label" transform="translate(477 481)">
          <text>GROUND-LEVEL</text>
          <text y="17">GENERATOR</text>
        </g>

        <g className="diagram-label" transform="translate(64 540)">
          <text>NO YAW ALIGNMENT</text>
          <text y="17">REQUIRED</text>
        </g>
        <g className="diagram-label" transform="translate(448 540)">
          <text>VERTICAL</text>
          <text y="17">ROTOR AXIS</text>
        </g>
      </svg>

      <div className="diagram-legend" aria-hidden="true">
        <span><i className="legend-line legend-line-safety" /> Airflow</span>
        <span><i className="legend-line" /> Mechanical path</span>
        <span>Not to scale</span>
      </div>
    </figure>
  );
}
