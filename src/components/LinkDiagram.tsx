import { useReducedMotion } from 'motion/react';

const MOON = { x: 720, y: 105 };

// Each ground antenna: where it sits, and where its wire leaves mission control.
const ANTENNAS = [
  { x: 440, y: 40, from: 93 },
  { x: 440, y: 105, from: 105 },
  { x: 440, y: 170, from: 117 },
].map((a) => {
  const wired = [`150 ${a.from}`, `${a.x - 22} ${a.y + 4}`];
  const rf = [`${a.x + 12} ${a.y - 12}`, `${MOON.x} ${MOON.y}`];
  return {
    ...a,
    // Wired hop to the dish, then the RF hop from its feed to the Moon; telemetry runs the same route back.
    cmd: `M${wired[0]} L${wired[1]} M${rf[0]} L${rf[1]}`,
    telemetry: `M${rf[1]} L${rf[0]} M${wired[1]} L${wired[0]}`,
  };
});

/** Mission control <-> ground antennas <-> Moon, with packets in flight once the pod is Running. */
export function LinkDiagram({ live }: { live: boolean }) {
  const reduced = useReducedMotion();
  const animate = live && !reduced;

  return (
    <figure className="diagram">
      <svg viewBox="0 8 820 216" role="img" aria-label="Command and telemetry flow between mission control and the Moon through several ground antennas">
        {ANTENNAS.map((a) => (
          <path key={a.y} d={a.cmd} className="wire" />
        ))}
        {animate &&
          ANTENNAS.map((a, i) => (
            <g key={a.y}>
              <circle r="3.5" className="packet">
                <animateMotion dur="2.4s" begin={`${i * 0.8}s`} repeatCount="indefinite" path={a.cmd} />
              </circle>
              <circle r="3.5" className="packet tele">
                <animateMotion dur="2.4s" begin={`${i * 0.8 + 1.2}s`} repeatCount="indefinite" path={a.telemetry} />
              </circle>
            </g>
          ))}
        <g className="node-box">
          <rect x="10" y="75" width="140" height="60" rx="4" />
          <text x="80" y="101">mission</text>
          <text x="80" y="119">control</text>
        </g>
        {ANTENNAS.map((a) => (
          <g key={a.y} className="icon" transform={`translate(${a.x} ${a.y}) scale(0.75)`}>
            {/* tripod, dish, feed */}
            <path d="M-14 17 L-24 37 M-14 17 L-2 37 M-32 37 H6" />
            <path d="M-18 -15 A24 24 0 0 0 18 15 Z" />
            <path d="M0 0 L13 -13" />
            <circle cx="15" cy="-15" r="2.5" />
          </g>
        ))}
        <text x="432" y="218" className="icon-label">ground antennas</text>
        <g className="icon" transform="translate(716 79) scale(2.2)">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </g>
        <text x="742" y="157" className="icon-label">moon</text>
        <circle cx="16" cy="196" r="3.5" className="packet" />
        <text x="26" y="200" className="small legend">cmd</text>
        <circle cx="16" cy="214" r="3.5" className="packet tele" />
        <text x="26" y="218" className="small legend">telemetry</text>
      </svg>
    </figure>
  );
}
