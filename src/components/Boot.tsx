import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { profile } from '../content';
import { useWorkloadSection } from '../lib/cluster';

const COMMAND = 'kubectl apply -f jacob-kurry.yaml';
const OUTPUT = ['namespace/jacob-kurry created', 'node/boulder-co labeled', 'engineer.people.io/jacob-kurry created'];

export function Boot() {
  const ref = useRef<HTMLElement>(null);
  useWorkloadSection('boot', ref, null);
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(reduced ? COMMAND.length : 0);
  const [shown, setShown] = useState(reduced ? OUTPUT.length + 1 : 0);

  useEffect(() => {
    if (reduced) {
      setTyped(COMMAND.length);
      setShown(OUTPUT.length + 1);
      return;
    }
    let i = 0;
    const timers: number[] = [];
    const type = window.setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= COMMAND.length) {
        clearInterval(type);
        for (let n = 1; n <= OUTPUT.length + 1; n++) {
          timers.push(window.setTimeout(() => setShown(n), 200 + n * 160));
        }
      }
    }, 28);
    return () => {
      clearInterval(type);
      timers.forEach(clearTimeout);
    };
  }, [reduced]);

  const done = shown > OUTPUT.length;

  return (
    <section ref={ref} id="boot" className="boot" aria-label="Introduction">
      <p className="cmd">
        <span className="ps1">jacob@boulder-co</span> <span className="dim">~</span> <span className="prompt">$</span>{' '}
        <span>{COMMAND.slice(0, typed)}</span>
        {!done && <span className="cursor" aria-hidden />}
      </p>
      {OUTPUT.slice(0, shown).map((line) => (
        <p key={line} className="out">
          {line}
        </p>
      ))}

      <div className={`manifest ${done ? 'is-in' : ''}`} aria-hidden={!done}>
        <pre className="yaml">
          <span className="k">apiVersion</span>: people.io/v1{'\n'}
          <span className="k">kind</span>: Engineer{'\n'}
          <span className="k">metadata</span>:{'\n'}
          {'  '}<span className="k">name</span>:
        </pre>
        <h1 className="hero-name">
          jacob
          <br />
          kurry<span className="cursor big" aria-hidden />
        </h1>
        <pre className="yaml">
          {'  '}<span className="k">labels</span>:{'\n'}
          {'    '}<span className="k">focus</span>: infrastructure{'\n'}
          {'    '}<span className="k">home</span>: boulder-co{'\n'}
          {'    '}<span className="k">graduating</span>: may-2027{'\n'}
          <span className="k">spec</span>:{'\n'}
          {'  '}<span className="k">summary</span>: <span className="str">&gt;</span>
        </pre>
        <p className="summary">{profile.tagline}</p>
        <div className="actions">
          <a className="btn primary" href={profile.cv} target="_blank" rel="noreferrer">
            <span className="prompt">$</span> open cv.pdf
          </a>
          <a className="btn" href={`mailto:${profile.email}`}>
            <span className="prompt">$</span> mail {profile.email}
          </a>
        </div>
        <p className="hint dim"># scroll to schedule the workloads</p>
      </div>
    </section>
  );
}
