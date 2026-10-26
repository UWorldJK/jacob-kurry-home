import { useRef } from 'react';
import { profile } from '../content';
import { useWorkloadSection } from '../lib/cluster';

export function Node() {
  const ref = useRef<HTMLElement>(null);
  useWorkloadSection('node', ref, null);
  const { education, skills } = profile;

  return (
    <section ref={ref} id="node" className="block" aria-labelledby="node-title">
      <p className="cmd">
        <span className="prompt">$</span> kubectl describe node boulder-co
      </p>
      <h2 id="node-title" className="title">The node</h2>
      <dl className="describe">
        <dt>Name:</dt>
        <dd>boulder-co</dd>
        <dt>Roles:</dt>
        <dd>student, engineer</dd>
        <dt>Conditions:</dt>
        <dd>
          <span className="ok">Ready</span> {education.degree}, {education.school}. GPA {education.gpa}, graduating {education.graduation}.
        </dd>
        <dt>Coursework:</dt>
        <dd>{education.coursework.join(', ')}</dd>
      </dl>
      <p className="subhead">Capacity:</p>
      <dl className="capacity">
        {Object.entries(skills).map(([group, items]) => (
          <div key={group} className="cap-row">
            <dt>{group}:</dt>
            <dd>
              {items.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
