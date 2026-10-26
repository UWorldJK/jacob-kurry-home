import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { Workload } from '../content';
import { useWorkloadSection } from '../lib/cluster';
import { LinkDiagram } from './LinkDiagram';

const VERB: Record<Workload['kind'], string> = { pod: 'pod', job: 'job', cronjob: 'cronjob' };

export function WorkloadSection({ w }: { w: Workload }) {
  const ref = useRef<HTMLElement>(null);
  const state = useWorkloadSection(w.id, ref);
  const reduced = useReducedMotion();
  const phase = state?.phase ?? 'Pending';
  const up = phase === 'Running' || phase === 'Completed';

  return (
    <section ref={ref} id={w.id} className="block" aria-labelledby={`${w.id}-title`}>
      <p className="cmd">
        <span className="prompt">$</span> kubectl describe {VERB[w.kind]} {w.podName}
      </p>
      <h2 id={`${w.id}-title`} className="title">
        {w.title}
      </h2>
      <p className="role">{w.subtitle}</p>
      <dl className="describe">
        <dt>Status:</dt>
        <dd>
          <span className={`phase ${phase}`}>{state ? phase : 'Pending'}</span>
        </dd>
        <dt>Node:</dt>
        <dd>{w.where}</dd>
        <dt>Start Time:</dt>
        <dd>{w.when}</dd>
        <dt>Image:</dt>
        <dd>{w.image}</dd>
        <dt>Labels:</dt>
        <dd>
          {Object.entries(w.labels).map(([k, v]) => (
            <span key={k} className="label">
              {k}={v}
            </span>
          ))}
        </dd>
      </dl>

      {w.id === 'lunar-outpost' && <LinkDiagram live={up} />}

      <p className="subhead">Events:</p>
      <ol className="events">
        {w.events.map((e, i) => {
          const [reason, ...rest] = e.split(' ');
          return (
            <motion.li
              key={i}
              initial={reduced ? false : { opacity: 0 }}
              animate={up ? { opacity: 1 } : { opacity: reduced ? 1 : 0 }}
              transition={{ delay: reduced ? 0 : i * 0.09, duration: 0.18 }}
            >
              <span className="ev-type">Normal</span>
              <span className="ev-reason">{reason}</span>
              <span className="ev-msg">{rest.join(' ')}</span>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
