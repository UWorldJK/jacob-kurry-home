import { useReducedMotion } from 'motion/react';

const CMD = 'M150 50 H670';
const TELEMETRY = 'M670 70 H150';

/** Mission control <-> Go adapter <-> lunar surface, with packets in flight once the pod is Running. */
export function LinkDiagram({ live }: { live: boolean }) {
  const reduced = useReducedMotion();
  const animate = live && !reduced;

  return (
    <figure className="diagram">
      <svg viewBox="0 0 820 120" role="img" aria-label="Command and telemetry flow from mission control through the Go network adapter to lunar surface systems">
        <path d={CMD} className="wire" />
        <path d={TELEMETRY} className="wire" />
        {animate &&
          [0, 0.6, 1.2].map((d) => (
            <g key={d}>
              <circle r="3.5" className="packet">
                <animateMotion dur="1.8s" begin={`${d}s`} repeatCount="indefinite" path={CMD} />
              </circle>
              <circle r="3.5" className="packet tele">
                <animateMotion dur="1.8s" begin={`${d + 0.3}s`} repeatCount="indefinite" path={TELEMETRY} />
              </circle>
            </g>
          ))}
        <text x="240" y="40" className="small wire-label">cmd</text>
        <text x="240" y="92" className="small wire-label">telemetry</text>
        <g className="node-box">
          <rect x="10" y="30" width="140" height="60" rx="4" />
          <text x="80" y="56">mission</text>
          <text x="80" y="74">control</text>
        </g>
        <g className="node-box accent">
          <rect x="330" y="22" width="160" height="76" rx="4" />
          <text x="410" y="56">go adapter</text>
          <text x="410" y="78" className="small">~10µs</text>
        </g>
        <g className="node-box">
          <rect x="670" y="30" width="140" height="60" rx="4" />
          <text x="740" y="56">lunar</text>
          <text x="740" y="74">surface</text>
        </g>
      </svg>
      <figcaption className="dim"># every command and telemetry frame between mission control and the Moon goes through this adapter</figcaption>
    </figure>
  );
}
