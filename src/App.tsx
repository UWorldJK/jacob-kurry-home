import { useEffect, useRef } from 'react';
import { profile, workloads } from './content';
import { ClusterProvider } from './lib/cluster';
import { scrollToId } from './lib/scroll';
import { Boot } from './components/Boot';
import { Node } from './components/Node';
import { WorkloadSection } from './components/WorkloadSection';
import { Contact } from './components/Contact';
import { WatchPane } from './components/WatchPane';
import { StatusBar } from './components/StatusBar';

export function App() {
  const shellRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.metaKey || e.ctrlKey || e.altKey || t.closest('input, textarea, [contenteditable]')) return;
      if (e.key === 'c') window.open(profile.cv, '_blank', 'noopener');
      else if (e.key === 'e') window.location.href = `mailto:${profile.email}`;
      else if (e.key === '/') {
        e.preventDefault();
        scrollToId('contact');
        shellRef.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <ClusterProvider>
      <a className="skip" href="#contact">
        Skip to contact
      </a>
      <div className="frame">
        <header className="titlebar">
          <span className="dots" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className="titlebar-text">jacob@boulder-co: ~/jacob-kurry (zsh)</span>
        </header>
        <div className="split">
          <main className="story">
            <Boot />
            <Node />
            {workloads.map((w) => (
              <WorkloadSection key={w.id} w={w} />
            ))}
            <Contact ref={shellRef} />
          </main>
          <WatchPane />
        </div>
      </div>
      <StatusBar />
    </ClusterProvider>
  );
}
