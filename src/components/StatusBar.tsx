import { useEffect, useRef } from 'react';
import { workloads } from '../content';
import { useCluster, useNow } from '../lib/cluster';
import { scrollToId } from '../lib/scroll';

const WINDOWS = [
  { id: 'boot', label: 'apply' },
  { id: 'node', label: 'node' },
  ...workloads.map((w) => ({ id: w.id, label: w.id })),
  { id: 'contact', label: 'contact' },
];

export function StatusBar() {
  const { active } = useCluster();
  const list = useRef<HTMLOListElement>(null);

  // Keep the active window visible when the list overflows (phones).
  useEffect(() => {
    const el = list.current?.querySelector<HTMLElement>('.is-active');
    if (el && list.current) list.current.scrollLeft = el.offsetLeft - list.current.clientWidth / 2 + el.clientWidth / 2;
  }, [active]);
  const now = useNow(15_000);
  const time = new Date(now).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <nav className="status" aria-label="Sections">
      <span className="session">[jacob-kurry]</span>
      <ol className="windows" ref={list}>
        {WINDOWS.map((w, i) => (
          <li key={w.id} className={active === w.id ? 'is-active' : ''}>
            <button onClick={() => scrollToId(w.id)} aria-current={active === w.id ? 'true' : undefined}>
              {i}:{w.label}
              {active === w.id ? '*' : ''}
            </button>
          </li>
        ))}
      </ol>
      <span className="keys dim">
        <kbd>c</kbd> cv <kbd>e</kbd> mail <kbd>/</kbd> shell
      </span>
      <span className="clock">{time}</span>
    </nav>
  );
}
